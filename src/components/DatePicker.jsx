import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";

// const today = new Date();

export default function Daypicker(props) {
  const [dateDisplayed, setDateDisplayed] = useState(false);
  function dateDisplay() {
    setDateDisplayed(!dateDisplayed);
  }

  // const [range, setRange] = useState({
  //   from: today,
  //   to: addDays(today, 0),
  // });

  // const diffDays = Math.round(
  //   Math.abs((range.to - range.from) / (24 * 60 * 60 * 1000))
  // );
  // const anchorDays = diffDays + 2;
  // 这个地方有点bug，因为这里面是包含具体时间的
  // 所以从from到to是从前到后的情况下，后的时间和前的一致，最后得到的天数是正确的
  // from到to是从后到前的情况下，from及后的日期里包含的时间回事00：00，可能会导致天数多一天或少一天（后者暂时没有出现）

  return (
    <div className="blocks">
      <div className="dateBar" onClick={dateDisplay}>
        {/* {diffDays !== 0 ? anchorDays + " Days" : "Everyday"} */}
        {props.changedDay}
      </div>
      {dateDisplayed && (
        <DayPicker
          captionLayout="dropdown" /* 没用 不知道为啥 */
          styles={{
            root: { backgroundColor: "gray", position: "absolute" },
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
