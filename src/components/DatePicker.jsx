import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";

const today = new Date();

export default function Daypicker() {
  const defaultSelected = {
    from: today,
    to: addDays(today, 0),
  };
  const [range, setRange] = useState(defaultSelected);

  return (
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
  );
}
