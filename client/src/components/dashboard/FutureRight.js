import React, { Fragment } from "react";
import moment from "moment";
import PropTypes from "prop-types";

const FutureRight = ({ anchor: { from, to } }) => {
  return (
    <Fragment>
      <p className="normal text-bold text-center text-gray1">
        {moment(from).format("YYYY/MM/DD")}
      </p>
      <hr className="dateHr" />
      <p className="normal text-bold text-center text-gray1">
        {moment(to).format("YYYY/MM/DD")}
      </p>
    </Fragment>
  );
};

FutureRight.propTypes = {
  anchor: PropTypes.object.isRequired,
};

export default FutureRight;
