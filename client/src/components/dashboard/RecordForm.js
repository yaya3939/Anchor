import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Progress from "../utils/Progress";
import { AddBox } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { addRecord } from "../../reducers/anchors";
import { setAlert } from "../../reducers/alert";

const RecordForm = ({ color, anchorId }) => {
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
    try {
      await dispatch(addRecord({ record, anchorId })).unwrap();
    } catch (err) {
      const errors = err.errors;
      errors.map((error) => alerting(error.msg, "error"));
    }
  };

  return (
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
        <button className="transparent pointer" onClick={handleSubmit}>
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

RecordForm.propTypes = {
  color: PropTypes.string.isRequired,
  anchorId: PropTypes.string.isRequired,
};

export default RecordForm;
