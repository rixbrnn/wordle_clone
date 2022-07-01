import React, { useContext } from "react";
import { GameContext } from "../App";

function Key({ keyVal, isLargeKey, unmatched }) {
  const { onPressEnter, onPressDelete, onPressLetter } = useContext(GameContext);

  const onSelectLetter = () => {
    if (keyVal === "ENTER") {
      onPressEnter();
    } else if (keyVal === "DELETE") {
      onPressDelete();
    } else {
      onPressLetter(keyVal);
    }
  };

  return (
    <div
      className="key"
      id={isLargeKey ? "large" : unmatched ? "unmatched" : ""}
      onClick={onSelectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
