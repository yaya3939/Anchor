import React, { useState } from "react";
import ColorPicker from "../utils/ColorPicker";
import Daypicker from "../utils/DatePicker";
import moment from "moment/moment";
import { addDays } from "date-fns";
import { AddBox } from "@mui/icons-material";

export default function AnchorInput(props) {
  //--------------------- anchorItem store-------------------------------
  const todayStart = moment(new Date()).startOf("day")._d;
  const [anchorItem, setAnchorItem] = useState({
    title: "",
    color: { r: "255", g: "255", b: "255" },
    range: { from: todayStart, to: addDays(todayStart, 0) },
    days: "Everyday",
  });

  function handleTitle(event) {
    const newValue = event.target.value;
    setAnchorItem((prevVa) => {
      return { ...prevVa, title: newValue };
    });
  }
  function handleColor(color) {
    setAnchorItem((prevVa) => {
      return { ...prevVa, color: color.rgb };
    });
  }
  function handleRange(newRange) {
    setAnchorItem((prevVa) => {
      return { ...prevVa, range: newRange };
    });
    const diffDays = Math.round(
      Math.abs((newRange.to - newRange.from) / (24 * 60 * 60 * 1000))
    );
    const anchorDays = diffDays + 1;
    if (diffDays !== 0) {
      setAnchorItem((prevVa) => {
        return { ...prevVa, days: anchorDays + " Days" };
      });
    } else {
      setAnchorItem((prevVa) => {
        return { ...prevVa, days: "Everyday" };
      });
    }
  }

  return (
    <table className="anchorItem">
      <tbody>
        <tr>
          <td className="anchorTitle">
            <input
              className="anchorTitleInput"
              placeholder="Title"
              value={anchorItem.title}
              onChange={handleTitle}
            />
            <hr />
            <Daypicker
              changedDay={anchorItem.days}
              today={todayStart}
              range={anchorItem.range}
              setRange={handleRange}
            />
          </td>
          <td>
            <ColorPicker
              backgroundColor={{
                backgroundColor: `rgb(${anchorItem.color.r}, ${anchorItem.color.g}, ${anchorItem.color.b})`,
              }}
              color={anchorItem.color}
              colorChange={handleColor}
            />
          </td>
          <td>
            <button
              id="addAnchor"
              onClick={(event) => {
                props.addAnchor(event, anchorItem);
                setAnchorItem({
                  title: "",
                  color: { r: "255", g: "255", b: "255" },
                  range: { from: todayStart, to: addDays(todayStart, 0) },
                  days: "time",
                });
              }}
            >
              <AddBox />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
