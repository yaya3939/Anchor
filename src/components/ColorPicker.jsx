import React, { useState } from "react";
import { CompactPicker } from "react-color";

export default function ColorPicker() {
  const [colorDisplayed, setColorDisplayed] = useState(false);
  function colorDisplay() {
    setColorDisplayed(!colorDisplayed);
  }
  const [color, setColor] = useState({
    r: "255",
    g: "255",
    b: "255",
  });
  function handleColor(color) {
    setColor(color.rgb);
  }

  return (
    <div className="blocks">
      <button
        className="colorButton"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}
        onClick={colorDisplay}
      ></button>
      {colorDisplayed && (
        <div className="pickers">
          <CompactPicker color={color} onChangeComplete={handleColor} />
        </div>
      )}
    </div>
  );
}
