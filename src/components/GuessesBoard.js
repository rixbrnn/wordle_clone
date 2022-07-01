import React from "react";
import BoardLetter from "./BoardLetter";

function GuessesBoard() {
  const rows = new Array(6).fill("");
  const letters = new Array(5).fill("");
  return (
    <div className="board">
      {rows.map((_rowData, rowIndex) => {
        return <div className="row">
          {letters.map((_letterData, letterIndex) => {
            return <BoardLetter letterPosition={letterIndex} attemptValue={rowIndex} />
          })}
          </div>
      })}
    </div>
  );
}

export default GuessesBoard;
