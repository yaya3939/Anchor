import React, { useState } from "react";
import InputArea from "./InputArea";
import AnchorItem from "./AnchorItem";
import ColorPicker from "./ColorPicker";
import Daypicker from "./DatePicker";
import moment from "moment/moment";
import { addDays } from "date-fns";
import { AddBox } from "@mui/icons-material";

function AnchorTable() {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }

  const todayStart = moment(new Date()).startOf("day")._d;
  const [anchorItem, setAnchorItem] = useState({
    title: "",
    color: { r: "255", g: "255", b: "255" },
    range: { from: todayStart, to: addDays(todayStart, 0) },
  });

  function handleEnter(event, inputText) {
    const enter = event.code;
    if (enter === "Enter") {
      setAnchorItem((prevVa) => {
        return { ...prevVa, title: inputText };
      });
    }
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
  }
  const diffDays = Math.round(
    Math.abs(
      (anchorItem.range.to - anchorItem.range.from) / (24 * 60 * 60 * 1000)
    )
  );
  const anchorDays = diffDays + 1;

  function addAnchor() {
    console.log(anchorItem, todayStart._d);
  }

  return (
    <div>
      <AnchorItem title={anchorItem.title} days={anchorItem.days} />
      {/*  ------------------------input part--------------------------*/}
      {clicked && (
        <div className="anchorTable">
          <InputArea
            className="anchorTitleInput"
            placeholder="Anchor Title"
            keyDown={handleEnter}
          />
          {/* ------------colorPicker------------------------------- */}
          <ColorPicker
            backgroundColor={{
              backgroundColor: `rgb(${anchorItem.color.r}, ${anchorItem.color.g}, ${anchorItem.color.b})`,
            }}
            color={anchorItem.color}
            colorChange={handleColor}
          />
          {/*------------------------------- DateRangePicker --------------------------------*/}
          <Daypicker
            changedDay={diffDays !== 0 ? anchorDays + " Days" : "Everyday"}
            today={todayStart}
            range={anchorItem.range}
            setRange={handleRange}
          />
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
