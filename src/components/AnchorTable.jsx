import React, { useState } from "react";
import InputArea from "./InputArea";
import Progress from "./Progress";
import ColorPicker from "./ColorPicker";
import Daypicker from "./DatePicker";
import { AddBox } from "@mui/icons-material";

function AnchorTable() {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  const [anchorItem, setAnchorItem] = useState({
    title: "",
    color: "",
    days: "",
  });
  function addAnchor() {}

  return (
    <div>
      <table className="anchorTable">
        <tr>
          <td className="anchorTitle">
            <h1>{anchorItem.title}</h1>
            <hr />
            <p>{anchorItem.days}</p>
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
      {/*  ------------------------input part--------------------------*/}
      {clicked && (
        <div className="anchorTable">
          <InputArea className="anchorTitleInput" placeholder="Anchor Title" />
          {/* ------------colorPicker------------------------------- */}
          <ColorPicker />
          {/*------------------------------- DateRangePicker --------------------------------*/}
          <Daypicker />
          <button id="addAnchor" onClick={addAnchor}>
            <AddBox />
          </button>
        </div>
      )}
      <button id="addButton" onClick={handleClick}>
        <AddBox />
      </button>
    </div>
  );
}

export default AnchorTable;
