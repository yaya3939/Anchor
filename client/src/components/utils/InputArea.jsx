import React, { useState } from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  return (
    <input
      className={props.className}
      type="text"
      placeholder={props.placeholder}
      value={inputText}
      onChange={handleChange}
      onKeyDown={(event) => {
        props.keyDown(event, inputText);
        if (event.code === "Enter") {
          setInputText("");
        }
      }}
    />
  );
}

export default InputArea;
