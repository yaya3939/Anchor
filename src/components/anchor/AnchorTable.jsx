import React, { useState } from "react";
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

  //--------------------- anchorItem store-------------------------------
  const todayStart = moment(new Date()).startOf("day")._d;
  const [anchorItem, setAnchorItem] = useState({
    title: "",
    color: { r: "255", g: "255", b: "255" },
    range: { from: todayStart, to: addDays(todayStart, 0) },
    days: "time",
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

  //-------------------------- anchorItems store --------------------------
  const [anchorItems, setAnchorItems] = useState([]);
  function addAnchor() {
    if (
      anchorItem.title !== "" &&
      JSON.stringify(anchorItem.color) !==
        JSON.stringify({ r: "255", g: "255", b: "255" })
    ) {
      setAnchorItems((prevItem) => {
        return [...prevItem, anchorItem];
      });
      setAnchorItem({
        title: "",
        color: { r: "255", g: "255", b: "255" },
        range: { from: todayStart, to: addDays(todayStart, 0) },
        days: "time",
      });
    } else {
      alert("Your anchor is not finished! Please check the title and color.");
    }
  }

  return (
    <div>
      {anchorItems.map((item) => {
        return (
          <AnchorItem
            backgroundColor={{
              backgroundColor: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
            }}
            ratingcolor={{
              "& .MuiRating-iconFilled": {
                color: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
              },
            }}
            title={item.title}
            days={item.days}
          />
        );
      })}

      {/*  ------------------------input part--------------------------*/}
      {clicked && (
        <div className="anchorTable">
          <input
            className="anchorTitleInput"
            placeholder="Anchor Title"
            value={anchorItem.title}
            onChange={handleTitle}
            required
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
            changedDay={anchorItem.days}
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
