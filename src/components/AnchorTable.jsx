import React, { useState } from "react";
import InputArea from "./InputArea";
import Progress from "./Progress";
import { AddBox } from "@mui/icons-material";

function AnchorTable() {
  const [clicked, setClicked] = useState(false);
  function addInput() {
    setClicked(true);
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
            <InputArea className="anchorInput" placeholder="How's your day" />
          </td>
        </tr>
      </table>
      <button id="addButton" onClick={addInput}>
        <AddBox />
      </button>
    </div>
  );
}

export default AnchorTable;
