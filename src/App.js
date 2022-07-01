import "./App.css";
import GuessesBoard from "./components/GuessesBoard";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import validEnglishWords from "an-array-of-english-words";
import EndGame from "./components/EndGame";

export const GameContext = createContext();

const WORD_LETTERS = 5;

const _fiveLetterEnglishWordsArray = validEnglishWords.filter(
  (w) => w.length === WORD_LETTERS
);

const _secretWord =
  _fiveLetterEnglishWordsArray[
    Math.floor(Math.random() * _fiveLetterEnglishWordsArray.length)
  ].toUpperCase();

const _gameModel = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

console.log(_secretWord);

function App() {
  const [secretWord, setSecretWord] = useState(_secretWord);
  const [fiveLetterEnglishWordsSet, setFiveLetterEnglishWordsSet] = useState(
    new Set(_fiveLetterEnglishWordsArray)
  );
  const [board, setBoard] = useState(_gameModel);
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPosition: 0 });
  const [unmatchedLetters, setUnmatchedLetters] = useState([]);
  const [endGame, setEndGame] = useState({
    endGame: false,
    guessedWord: false,
  });

  const onPressLetter = (keyVal) => {
    if (currentAttempt.letterPosition > 4) {
      return;
    }
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition + 1 });
  };

  const onPressDelete = () => {
    if (currentAttempt.letterPosition === 0) {
      return;
    }
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 });
  };

  const onPressEnter = () => {
    if (currentAttempt.letterPosition !== 5) {
      return;
    }
    let currentWord = "";

    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }
    if (fiveLetterEnglishWordsSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 });
    } else {
      alert(
        "Word does not found, please insert another valid 5-letter english word! "
      );
    }

    if (currentWord === secretWord) {
      setEndGame({ endGame: true, guessedWord: true });
    }

    if (currentWord !== secretWord && currentAttempt.attempt === 5) {
      setEndGame({ endGame: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className="game">
        <GameContext.Provider
          value={{
            board,
            setBoard,
            currentAttempt,
            setCurrentAttempt,
            onPressLetter,
            onPressDelete,
            onPressEnter,
            secretWord,
            unmatchedLetters,
            setUnmatchedLetters,
            endGame,
            setEndGame,
          }}
        >
          <GuessesBoard />
          {endGame.endGame ? <EndGame /> : <Keyboard />}
        </GameContext.Provider>
      </div>
    </div>
  );
}

export default App;
