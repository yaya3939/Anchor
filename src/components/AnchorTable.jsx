import React, { useState } from "react";
import InputArea from "./InputArea";
import Progress from "./Progress";
import { CompactPicker } from "react-color";
import Daypicker from "./DatePicker";
import { AddBox } from "@mui/icons-material";

function AnchorTable() {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  const [colorDisplayed, setColorDisplayed] = useState(false);
  function colorDisplay() {
    setColorDisplayed(!colorDisplayed);
  }
  const [dateDisplayed, setDateDisplayed] = useState(false);
  function dateDisplay() {
    setDateDisplayed(!dateDisplayed);
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
    <div>
      <table className="anchorTable">
        <tr>
          <td className="anchorTitle">
            <h1>title</h1>
            <hr />
            <p>time</p>
          </td>
          <td className="anchorDetail">
            <Progress />
            <InputArea
              className="anchorDetailInput"
              placeholder="How's your day"
            />
          </td>
        </tr>
      </table>
      {/* {clicked && ()} ------------------------input part--------------------------*/}
      <div className="anchorTable">
        <InputArea className="anchorTitleInput" placeholder="Anchor Title" />
        {/* ------------colorPicker------------------------------- */}
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
        {/*------------------------------- DateRangePicker --------------------------------*/}
        <div className="blocks">
          <div className="dateBar" onClick={dateDisplay}>
            Everyday
          </div>
          {dateDisplayed && <Daypicker />}
        </div>
      </div>
      <button
        id="addButton"
        onClick={() => {
          handleClick();
          setClicked(false);
        }}
      >
        <AddBox />
      </button>
    </div>
  );
}

export default AnchorTable;
