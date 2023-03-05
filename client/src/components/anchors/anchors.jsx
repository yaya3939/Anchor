import React from "react";
import moment from "moment/moment";
import CalendarHeatmap from "react-calendar-heatmap";
// import ReactTooltip from "react-tooltip";

import "react-calendar-heatmap/dist/styles.css";

const item2 = {
  id: "2",
  title: "programming",
  color: { r: "78", g: "244", b: "59" },
  records: [
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
  ],
};

const item1 = {
  id: "2",
  title: "buddhism",
  color: { r: "244", g: "78", b: "59" },
  records: [
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
  ],
};

const items = [item1, item2];

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
      count: getRandomInt(0, 5),
    };
  });

  return (
    <div>
      {items.map((item) => {
        return (
          <div className="anchorRecordTable">
            <div className="anchorTitle">
              <h1
                style={{
                  backgroundColor: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
                }}
              >
                {item.title}
              </h1>
              <p>/ {item.records.length} Days</p>
            </div>

            <div className="monthHeatmap">
              <CalendarHeatmap
                startDate={startDay}
                endDate={endDay}
                values={randomValues}
                horizontal={false}
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
                  <svg height={element["props"].height - 2}>
                    <g>
                      {element}
                      <text
                        x={element["props"].x + 1}
                        y={element["props"].y + 5}
                        style={{
                          fontSize: "0.35em",
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomAlpha() {
  const arrayAlpha = [0, 0.2, 0.4, 0.6, 0.8, 1];
  return arrayAlpha[Math.floor(Math.random() * arrayAlpha.length)];
}
