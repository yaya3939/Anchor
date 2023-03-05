import React from "react";
import Progress from "../utils/Progress";
import InputArea from "../utils/InputArea";

export default function AnchorItem(props) {
  return (
    <table className="anchorItem">
      <tbody>
        <tr>
          <td className="anchorTitle">
            <h1 style={props.backgroundColor}>{props.title}</h1>
            <hr />
            <p>{props.days}</p>
          </td>
          <td className="anchorDetail">
            <Progress ratingcolor={props.ratingcolor} />
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
