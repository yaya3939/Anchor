import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";

const today = new Date();

export default function Daypicker() {
  const [dateDisplayed, setDateDisplayed] = useState(false);
  function dateDisplay() {
    setDateDisplayed(!dateDisplayed);
  }

  const [range, setRange] = useState({
    from: today,
    to: addDays(today, 0),
  });

  const diffDays = Math.round(
    Math.abs((range.to - range.from) / (24 * 60 * 60 * 1000))
  );
  const anchorDays = diffDays + 2;

  console.log(range, diffDays);

  return (
    <div className="blocks">
      <div className="dateBar" onClick={dateDisplay}>
        {diffDays !== 0 ? anchorDays + " Days" : "Everyday"}
      </div>
      {dateDisplayed && (
        <DayPicker
          captionLayout="dropdown" /* 没用 不知道为啥 */
          styles={{
            root: { backgroundColor: "gray", position: "absolute" },
            day_range_start: { color: "black" },
          }}
          mode="range"
          defaultMonth={today}
          selected={range}
          onSelect={setRange}
        />
      )}
    </div>
  );
}
