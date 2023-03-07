import React, { Fragment } from "react";
import Progress from "../utils/Progress";
import InputArea from "../utils/InputArea";
import PropTypes from "prop-types";
import moment from "moment";

function getDays(from, to) {
  const diffDays = Math.round(
    Math.abs(
      (new Date(to).getTime() - new Date(from).getTime()) /
        (24 * 60 * 60 * 1000)
    )
  );
  const anchorDays = diffDays + 1;
  return anchorDays;
}

export default function AnchorItem({
  anchor: { title, color, from, to },
  isNow,
  className,
}) {
  const today = new Date();
  const days = getDays(today, to);
  return (
    <table className={`anchorItem ${className}`}>
      <tbody>
        <tr>
          <td className="anchorLeft">
            <h1
              className="lead anchorTitle"
              style={{ backgroundColor: `${color}` }}
            >
              {title}
            </h1>
            <hr />
            <p className="mg-center">{isNaN(days) ? "Everyday" : days}</p>
          </td>
          <td>
            {isNow ? (
              <Fragment>
                {" "}
                <Progress
                  ratingcolor={{
                    "& .MuiRating-iconFilled": {
                      color: `${color}`,
                    },
                  }}
                />
                <InputArea
                  className="inputBlock recordInput"
                  placeholder="How's your day"
                />
              </Fragment>
            ) : (
              <Fragment>
                <p className="normal text-bold text-center text-gray1">
                  {moment(from).format("YYYY/MM/DD")}
                </p>
                <hr className="dateHr" />
                <p className="normal text-bold text-center text-gray1">
                  {" "}
                  {moment(to).format("YYYY/MM/DD")}
                </p>
              </Fragment>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

AnchorItem.defaultProps = {
  isNow: true,
};

AnchorItem.propTypes = {
  anchor: PropTypes.object.isRequired,
};
