import React from "react";
import moment from "moment/moment";
import CalHeatmap from "cal-heatmap";

// import CalendarHeatmap from "react-calendar-heatmap";
// import { Tooltip } from "react-tooltip";
// import "react-calendar-heatmap/dist/styles.css";
const item2 = {
  id: "2",
  title: "test2",
  color: { r: "78", g: "244", b: "59" },
  records: [
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
  ],
};
export default function Anchors() {
  //needed days
  const today = new Date();
  const firstDay = moment(today).startOf("month")._d;
  const startDay = firstDay.getTime() - 24 * 60 * 60 * 1000;
  const endDay = moment(today).endOf("month")._d;

  //everyday of the month
  const monthNum = endDay.getDate();
  let monthDays = [];
  for (let i = 1; i <= monthNum; i++) {
    let day = new Date(firstDay.setDate(i));
    monthDays.push(day);
  }
  console.log(monthDays);

  //fake data
  const randomValues = monthDays.map((monthDay) => {
    return {
      date: monthDay,
      count: getRandomInt(0, 4),
    };
  });

  return (
    <table className="anchorItem">
      <tbody>
        <tr>
          <td className="anchorTitle">
            <h1
              style={{
                backgroundColor: `rgb(${item2.color.r}, ${item2.color.g}, ${item2.color.b})`,
              }}
            >
              {item2.title}
            </h1>
            <hr />
            <p>{item2.records.length} Days</p>
          </td>
          <td className="anchorDetail"></td>
        </tr>
      </tbody>
    </table>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DVTable() {
  // //needed days
  // const today = new Date();
  // const firstDay = moment(today).startOf("month")._d;
  // const startDay = firstDay.getTime() - 24 * 60 * 60 * 1000;
  // const endDay = moment(today).endOf("month")._d;
  // //everyday of the month
  // const monthNum = endDay.getDate();
  // let monthDays = [];
  // for (let i = 1; i <= monthNum; i++) {
  //   let day = new Date(firstDay.setDate(i));
  //   monthDays.push(day);
  // }
  // console.log(monthDays);
  // //fake data
  // const randomValues = monthDays.map((monthDay) => {
  //   return {
  //     date: monthDay,
  //     count: getRandomInt(0, 4),
  //   };
  // });
}
