import React from "react";
import InputArea from "./InputArea";

function AnchorTable() {
  return (
    <table className="anchorTable">
      <tr>
        <td className="anchorTitle">
          <h1>title</h1>
          <hr />
          <p>time</p>
        </td>
        <td>
          <button className="anchorProgress"></button>
          <InputArea className="anchorInput" placeholder="How's your day" />
        </td>
      </tr>
    </table>
  );
}

export default AnchorTable;
