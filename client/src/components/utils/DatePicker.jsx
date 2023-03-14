import React from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export function getDays(from, to) {
  //[from,to]
  const days = differenceInCalendarDays(to, from) + 1;
  return days;
}

export default function Daypicker(props) {
  return (
    <div className="blocks">
      <div className="mg-center pointer" onClick={props.onDisplay}>
        {props.changedDay}
      </div>
      {props.dateDisplay && (
        <DayPicker
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
