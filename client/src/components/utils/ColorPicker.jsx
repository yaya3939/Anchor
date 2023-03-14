import React from "react";
import { CompactPicker } from "react-color";

export default function ColorPicker(props) {
  return (
    <div className="blocks">
      <button
        className="colorButton"
        style={props.style}
        onClick={props.onDisplay}
      ></button>
      {props.colorDisplay && (
        <div className="pickers" style={{ zIndex: "99" }}>
          <CompactPicker
            color={props.color}
            onChangeComplete={props.colorChange}
          />
        </div>
      )}
    </div>
  );
}
