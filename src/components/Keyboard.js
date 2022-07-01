import React, { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../App";
import Key from "./Key";

function Keyboard() {
  const { onPressEnter, onPressDelete, onPressLetter, unmatchedLetters } = useContext(GameContext);
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onPressEnter();
    } else if (event.key === "Backspace") {
      onPressDelete();
    } else {
      const allKeys = [...firstRow, ...secondRow, ...thirdRow];
      allKeys.forEach((key) => {
        if (event.key.toUpperCase() === key.toUpperCase()) {
          onPressLetter(key.toUpperCase());
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {firstRow.map((key) => {
          return <Key keyVal={key} unmatched={unmatchedLetters.includes(key)} />;
        })}
      </div>
      <div className="secondRow">
        {secondRow.map((key) => {
          return <Key keyVal={key} unmatched={unmatchedLetters.includes(key)} />;
        })}
      </div>
      <div className="thirdRow">
        <Key keyVal={"ENTER"} isLargeKey />
        {thirdRow.map((key) => {
          return <Key keyVal={key} unmatched={unmatchedLetters.includes(key)} />;
        })}
        <Key keyVal={"DELETE"} isLargeKey />
      </div>
    </div>
  );
}

export default Keyboard;
