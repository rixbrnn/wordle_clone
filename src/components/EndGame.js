import React, { useContext } from "react";
import { GameContext } from "../App";

function EndGame() {
  const { endGame, currentAttempt, secretWord } = useContext(GameContext);

  return (
    <div className="endGame">
      <h3>
        {endGame.guessedWord
          ? "Congratulations, you won!"
          : "Try again! You failed."}{" "}
      </h3>
      <h3> right word: {secretWord}</h3>
      {endGame.guessedWord && (
        <h3> You got it right after {currentAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default EndGame;
