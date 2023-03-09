import React from "react";
import PropTypes from "prop-types";
import CalHeatmap from "cal-heatmap";

const Anchor = ({ anchor: { title, color, from, to, records } }) => {
  const { date, rate, text } = records;

  const cal = new CalHeatmap();
  cal.paint({
    data: { source: records, x: "date", y: "rate" },
    range: 1,
    domain: { type: "month", padding: [10, 10, 10, 10] },
    subDomain: { type: "xDay", width: 15, height: 10, radius: 2, label: "D" },
    date: {
      highlight: [
        new Date("2020-01-15"),
        new Date(), // Highlight today
      ],
    },
    scale: {
      opacity: {
        baseColor: color,
        type: "linear",
        domain: [0, 5],
      },
    },
  });

  return (
    <div id="">
      <div id="cal-heatmap"></div>
    </div>
  );
};

Anchor.propTypes = {};

export default Anchor;
