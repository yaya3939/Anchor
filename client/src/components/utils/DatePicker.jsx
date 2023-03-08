import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";

export function getDays(from, to) {
  const diffDays = Math.round(
    Math.abs(
      (new Date(to).getTime() - new Date(from).getTime()) /
        (24 * 60 * 60 * 1000)
    )
  );
  const anchorDays = diffDays + 1;
  return anchorDays;
}

export default function Daypicker(props) {
  const [dateDisplayed, setDateDisplayed] = useState(false);
  function dateDisplay() {
    setDateDisplayed(!dateDisplayed);
  }

  return (
    <div className="blocks">
      <div className="mg-center pointer" onClick={dateDisplay}>
        {props.changedDay}
      </div>
      {dateDisplayed && (
        <DayPicker
          captionLayout="dropdown" /* 没用 不知道为啥 */
          styles={{
            root: {
              backgroundColor: "gray",
              position: "absolute",
              zIndex: "99",
            },
          }}
          mode="range"
          defaultMonth={props.today}
          selected={props.range}
          onSelect={props.setRange}
        />
      )}
    </div>
  );
}
