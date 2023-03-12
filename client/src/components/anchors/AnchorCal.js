import React from "react";
import PropTypes from "prop-types";
import CalHeatmap from "cal-heatmap";
import Legend from "cal-heatmap/plugins/Legend";
import Tooltip from "cal-heatmap/plugins/Tooltip";

const AnchorCal = ({ anchor: { title, color, from, to, records } }) => {
  const { date, rate, text } = records;

  const cal = new CalHeatmap();
  cal.paint(
    {
      itemSelector: `#Cal${title.split(" ").join("")}`,
      range: 1,
      date: {
        start: new Date(),
        highlight: [new Date(from), new Date(to)],
        locale: { weekStart: 1 },
      },
      scale: {
        opacity: {
          baseColor: color,
          domain: [0, 5],
        },
      },
      domain: {
        type: "month",
        padding: [10, 10, 10, 10],
        label: { text: null },
      },
      subDomain: { type: "xDay", radius: 2, width: 15, height: 15, label: "D" },
      data: {
        source: records,
        x: (datum) => datum["date"],
        y: (datum) => datum["rate"],
      },
    },
    [
      [
        Tooltip,
        {
          text: function (date, value, dayjsDate) {
            return value + " on " + dayjsDate.format("LL");
          },
        },
      ],
    ]
  );

  return <div></div>;
};

AnchorCal.propTypes = {};

export default AnchorCal;
