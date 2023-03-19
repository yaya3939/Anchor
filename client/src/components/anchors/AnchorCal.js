import React from "react";
import PropTypes from "prop-types";
import startOfDay from "date-fns/startOfDay";
import CalHeatmap from "cal-heatmap";

function getDatesInRange(startDate, endDate) {
  const date = startOfDay(new Date(startDate));
  const dates = [];
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

const AnchorCal = ({ anchor: { title, color, from, to, records } }) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const datesMonth = getDatesInRange(firstDay, lastDay);

  const dataset = datesMonth.map((d) => {
    const correcord = records.find(
      (record) => new Date(record.date).getDate() === new Date(d).getDate()
    );
    if (correcord) {
      return { ...correcord, date: new Date(correcord.date) };
    } else {
      return { date: new Date(d.setHours(8)), rate: 0 };
    }
  });

  const cal = new CalHeatmap();
  cal.paint({
    itemSelector: `#Cal${title.split(" ").join("")}`,
    range: 1,
    date: {
      start: new Date(),
      highlight: [new Date(from), new Date(to), new Date()],
      locale: { weekStart: 1 },
      timezone: "Asia/Hong_Kong", //not work
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
    subDomain: {
      type: "xDay",
      radius: 2,
      width: 18,
      height: 15,
      label: "D",
    },
    data: {
      source: dataset,
      x: "date",
      y: "rate",
    },
  });

  return <div></div>;
};

AnchorCal.propTypes = {
  anchor: PropTypes.object.isRequired,
};

export default AnchorCal;
