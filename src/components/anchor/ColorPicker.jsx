import React, { useState } from "react";
import { CompactPicker } from "react-color";

export default function ColorPicker(props) {
  const [colorDisplayed, setColorDisplayed] = useState(false);
  function colorDisplay() {
    setColorDisplayed(!colorDisplayed);
  }

  return (
    <div className="blocks">
      <button
        className="colorButton"
        style={props.backgroundColor}
        onClick={colorDisplay}
      ></button>
      {colorDisplayed && (
        <div className="pickers" onClick={colorDisplay}>
          <CompactPicker
            color={props.color}
            onChangeComplete={props.colorChange}
          />
        </div>
      )}
    </div>
  );
}
