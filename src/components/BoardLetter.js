import React, { useContext, useEffect } from "react";
import { GameContext } from "../App";

function BoardLetter({ letterPosition, attemptValue }) {
  const {
    board,
    secretWord,
    currentAttempt,
    setUnmatchedLetters,
  } = useContext(GameContext);
  const letter = board[attemptValue][letterPosition];

  let partial, right, letterState;
  if (currentAttempt.attempt > attemptValue) {
    right = secretWord[letterPosition] === letter;

    partial = !right && letter !== "" && secretWord.includes(letter);

    letterState = right ? "right" : partial ? "partial" : "wrong";
  }

  useEffect(() => {
    if (letter !== "" && !right && !partial) {
      setUnmatchedLetters((previousObject) => [...previousObject, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default BoardLetter;
