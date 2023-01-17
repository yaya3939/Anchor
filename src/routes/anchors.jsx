import React from "react";
import moment from "moment/moment";
import CalendarHeatmap from "react-calendar-heatmap";
// import ReactTooltip from "react-tooltip";

import "react-calendar-heatmap/dist/styles.css";

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
          <td className="anchorDetail">
            <CalendarHeatmap
              startDate={startDay}
              endDate={endDay}
              values={randomValues}
              horizontal={false}
              // gutterSize={3}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-github-${value.count}`;
              }}
              //react tooltip 版本更新导致的失效
              //加上transformDayElement后，第一个有，其他的都没有，但是时间格式是date，很奇怪
              //把version改成3.8.4，会导致webpack5的error
              // tooltipDataAttrs={(value) => {
              //   return {
              //     id: `heatmapTooltip`,
              //     "data-tooltip-content": `${value.date.toLocaleDateString()} has count: ${
              //       value.count
              //     }`,
              //   };
              // }}
              showWeekdayLabels={true}
              onClick={(value) =>
                alert(`Clicked on value with count: ${value.count}`)
              }
              transformDayElement={(element, value, index) => (
                <svg height={element["props"].height - 3}>
                  <g>
                    {element}
                    <text
                      x={element["props"].x + 1}
                      y={element["props"].y + 5}
                      style={{
                        fontSize: "0.3em",
                        fill: "#666",
                      }}
                    >
                      {value.date.getDate()}
                    </text>
                  </g>
                </svg>
              )}
            />
            {/* <ReactTooltip /> */}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
