import { decodeHtml } from '../utlis';

export const SingleQuestion = ({
    text,
    answers,
    userAnswer,
    selectAnswer,
    correctAnswer,
    isGameOver
}) => {


    return (
        <div className="question-container">
            <div className='questio-text-conainer'>
                <h2 className='question-text'>{decodeHtml(text)}</h2>
            </div>
            <div className='answers-container'>
                {answers.map((answer, index) =>
                    <button
                        className={`
                            ${"answer-btn"}
                            ${answer === userAnswer ? 'selected' : ''}
                            ${isGameOver && answer === correctAnswer ? 'correct' : ''}
                            ${isGameOver && answer === userAnswer && answer !== correctAnswer ? 'wrong' : ''}
                            ${isGameOver && answer !== userAnswer && answer !== correctAnswer ? 'other-answers' : ''}
                        `}
                        key={index}
                        onClick={() => selectAnswer(text, answer)}
                        disabled={isGameOver ? true : false}
                    >
                        {decodeHtml(answer)}
                    </button>
                )}
            </div>
            <hr></hr>
        </div >
    )
}
