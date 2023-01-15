import React from 'react'

export const StartScreen = ({ gameStarted }) => {
  return (
    <div>
      <div class="start-page">
        <h2 className="title">Quizzical</h2>
        <button onClick={gameStarted} className="start-btn ">Start Game</button>
      </div>
    </div>
  )
}
