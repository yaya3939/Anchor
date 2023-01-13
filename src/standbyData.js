const item1 = {
  id: "1",
  name: "test1",
  color: { r: "244", g: "78", b: "59" },
  records: [
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 3, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 2, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 2, comment: "" },
    { date: "", rate: 2, comment: "" },
    { date: "", rate: 2, comment: "" },
    { date: "", rate: 2, comment: "" },
    { date: "", rate: 3, comment: "" },
    { date: "", rate: 3, comment: "" },
    { date: "", rate: 3, comment: "" },
    { date: "", rate: 3, comment: "" },
    { date: "", rate: 3, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 4, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 0, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 2, comment: "" },
    { date: "", rate: 3, comment: "" },
  ],
};
const item2 = {
  id: "2",
  name: "test2",
  color: { r: "78", g: "244", b: "59" },
  records: [
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
    { date: "", rate: 1, comment: "" },
  ],
};

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
  //react tooltip 版本更新导致的失效，加上transformDayElement后，第一个有，其他的都没有，但是时间格式是date，很奇怪
  // tooltipDataAttrs={(value) => {
  //   return {
  //     id: `heatmapTooltip`,
  //     "data-tooltip-content": `${value.date.toLocaleDateString()} has count: ${
  //       value.count
  //     }`,
  //   };
  // }}
  showWeekdayLabels={true}
  onClick={(value) => alert(`Clicked on value with count: ${value.count}`)}
  transformDayElement={(element, value, index) => (
    <svg height={element["props"].height - 4}>
      <g>
        {element}
        <text
          x={element["props"].x + 1}
          y={element["props"].y + 5}
          style={{
            fontSize: "0.3em",
            fill: "#555",
          }}
        >
          {value.date.getDate()}
        </text>
      </g>
    </svg>
  )}
/>;
{
  /* <Tooltip anchorId="heatmapTooltip" /> */
}
