import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Progress from "../utils/Progress";
import { AddBox } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { addRecord } from "../../reducers/anchors";
import { setAlert } from "../../reducers/alert";

const NowRight = ({ anchor: { color, _id }, isDone }) => {
  const [record, setRecord] = useState({ rate: 0, text: "" });
  const { rate, text } = record;

  const handleChange = (event) => {
    const value = event.target.value;
    setRecord((prevVa) => {
      return { ...prevVa, text: value };
    });
  };

  const handleRate = (event, newValue) => {
    setRecord((prevVa) => {
      return { ...prevVa, rate: newValue };
    });
  };

  const dispatch = useDispatch();
  const alerting = (msg, alertType) => {
    dispatch(setAlert(msg, alertType));
  };

  const handleSubmit = async () => {
    const anchorId = String(_id);
    try {
      await dispatch(addRecord({ record, anchorId })).unwrap();
    } catch (err) {
      const errors = err.errors;
      errors.map((error) => alerting(error.msg, "error"));
    }
  };

  return isDone ? (
    <p className="normal text-bold text-center text-gray1 done">DONE it! ^^</p>
  ) : (
    <Fragment>
      <div className="progress">
        <Progress
          ratingcolor={{
            "& .MuiRating-iconFilled": {
              color: `${color}`,
            },
          }}
          rate={rate}
          handleRate={handleRate}
        />
        <button
          className="transparent text-gray1 pointer"
          onClick={handleSubmit}
        >
          <AddBox />
        </button>
      </div>
      <textarea
        className="recordInput"
        placeholder="How's your day"
        cols={15}
        rows={4}
        value={text}
        onChange={handleChange}
      />
    </Fragment>
  );
};

NowRight.defaultProps = {
  isDone: false,
};

NowRight.propTypes = {
  anchor: PropTypes.object.isRequired,
};

export default NowRight;
