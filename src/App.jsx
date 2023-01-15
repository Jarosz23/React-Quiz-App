import { useState } from 'react'
import { StartScreen } from './components/StartScreen'
import { Quiz } from './components/Quiz'



function App() {
  const [gameStarted, setGameStarted] = useState(false);


  const startGame = () => {
    setGameStarted(true);
  }


  return (
    <div className="container">
      <img src="./assets/top.png" className={!gameStarted ? 'top-img' : 'top-img-quiz'} />
      <img src="./assets/bottom.png" className={!gameStarted ? 'bottom-img' : 'bottom-img-quiz'} />
      {!gameStarted ?
        <StartScreen
          gameStarted={startGame}
        /> :
        <Quiz />}
    </div>
  )
}

export default App
