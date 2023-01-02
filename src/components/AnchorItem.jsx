import React from "react";
import Progress from "./Progress";
import InputArea from "./InputArea";

export default function AnchorItem(props) {
  return (
    <table className="anchorTable">
      <tbody>
        <tr>
          <td className="anchorTitle">
            <h1>{props.title}</h1>
            <hr />
            <p>{props.days}</p>
          </td>
          <td className="anchorDetail">
            <Progress />
            <InputArea
              className="anchorDetailInput"
              placeholder="How's your day"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
