import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";

export default function Daypicker(props) {
  const [dateDisplayed, setDateDisplayed] = useState(false);
  function dateDisplay() {
    setDateDisplayed(!dateDisplayed);
  }

  return (
    <div className="blocks">
      <div className="mg-center" onClick={dateDisplay}>
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
