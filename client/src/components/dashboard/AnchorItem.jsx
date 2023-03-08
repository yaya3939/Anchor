import React, { Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import RecordForm from "./RecordForm";
import { getDays } from "../utils/DatePicker";

export default function AnchorItem({
  anchor: { title, color, from, to, _id, records },
  isNow,
  undone,
  className,
}) {
  const today = new Date();
  const daysForNow = getDays(today, to);
  const daysForFuture = getDays(from, to);

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
            <p className="mg-center">
              {isNow
                ? isNaN(daysForNow)
                  ? "Everyday"
                  : daysForNow
                : isNaN(daysForFuture)
                ? "Everyday"
                : daysForFuture}
            </p>
          </td>
          <td className="anchorRight">
            {isNow ? (
              undone ? (
                <RecordForm color={color} anchorId={_id} />
              ) : (
                <p className="normal text-bold text-center text-gray1 done">
                  DONE it! ^^
                </p>
              )
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
  undone: true,
};

AnchorItem.propTypes = {
  anchor: PropTypes.object.isRequired,
};
