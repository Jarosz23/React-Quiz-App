import { useState, useEffect } from 'react'
import { SingleQuestion } from './SingleQuestion'

export const Quiz = () => {

    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false)
    const [isGameOver, setIsGameOver] = useState(true)

    const questionLength = questions.length


    const fetchQuiz = async () => {
        const res = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await res.json();
        const questions = data.results.map((question, index) => (
            {
                ...question,
                id: index,
                answers: shuffle([...question.incorrect_answers, question.correct_answer]),
                userAnswer: ""
            }
        ))
        setQuestions(questions)
        setIsGameOver(false)
    }

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        setShowResults(false)
        setScore(0)
        fetchQuiz();
    }, [])


    const selectAnswer = (question, answer) => {
        setQuestions(prevQuestions => prevQuestions.map(newQuestion => {
            return newQuestion.question === question ?
                { ...newQuestion, userAnswer: answer } :
                newQuestion
        }))
    }

    const checkAnswer = () => {
        const checkAllAnswersIsSelected = questions.every(question => question.userAnswer !== "");
        if (checkAllAnswersIsSelected) {
            let points = 0;
            questions.map(question => {
                question.answers.map(answer => {
                    answer === question.correct_answer && answer === question.userAnswer ?
                        points++ :
                        points
                })
            })
            setScore(points)
            setShowResults(true)
            setIsGameOver(true)
        }
        else {
            alert("Please answer all questions")
        }
    }


    return (
        <div className='quiz-container'>
            {questions.map(question => (
                <SingleQuestion
                    key={question.id}
                    text={question.question}
                    answers={question.answers}
                    correctAnswer={question.correct_answer}
                    userAnswer={question.userAnswer}
                    selectAnswer={selectAnswer}
                    isGameOver={isGameOver}
                />
            ))}
            <div className='end-game-btns'>
                {!isGameOver && <button onClick={checkAnswer} className="check-btn">Check answers</button>}
                {showResults && isGameOver && <button onClick={fetchQuiz} className="play-again-btn">Play again</button>}
                {showResults && isGameOver && <h3 className="score-board">You scored {score}/{questionLength} correct answers</h3>}
            </div>
        </div>
    )
}
