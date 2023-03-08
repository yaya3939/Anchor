import React, { useState } from "react";
import moment from "moment/moment";
import { AddBox } from "@mui/icons-material";
import ColorPicker from "../utils/ColorPicker";
import Daypicker from "../utils/DatePicker";
import { getDays } from "../utils/DatePicker";

import { useDispatch } from "react-redux";
import { createAnchor } from "../../reducers/anchors";
import { setAlert } from "../../reducers/alert";

export default function AnchorForm() {
  const dispatch = useDispatch();

  const today = moment(new Date()).startOf("day")._d; //make time 00:00
  const [anchorInfo, setAnchorInfo] = useState({
    title: "",
    color: "#fff",
    from: today,
    to: Date,
  });
  const { title, color, from, to } = anchorInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnchorInfo((prevVa) => {
      return { ...prevVa, [name]: value };
    });
  };
  const handleColor = (color) => {
    setAnchorInfo((prevVa) => {
      return { ...prevVa, color: color.hex };
    });
  };
  const handleRange = (range) => {
    range && //如果点到同一天，range会变成undefine然后页面崩溃
      setAnchorInfo((prevVa) => {
        return { ...prevVa, from: range.from, to: range.to };
      });
  };

  let days = getDays(from, to);
  if (isNaN(days)) {
    days = "Everyday";
  }

  const alerting = (msg, alertType) => {
    dispatch(setAlert(msg, alertType));
  };
  const handleSubmit = async () => {
    try {
      await dispatch(createAnchor(anchorInfo)).unwrap();
    } catch (err) {
      const errors = err.errors;
      errors.forEach((error) => {
        alerting(error.msg, "error");
      });
    }
  };

  return (
    <table className="anchorItem cloudedGlass">
      <tbody>
        <tr>
          <td className="anchorLeft">
            <input
              className="inputBlock titleInput text-center lead"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <Daypicker
              changedDay={days}
              today={today}
              range={{ from, to }}
              setRange={handleRange}
            />
          </td>
          <td>
            <ColorPicker
              style={{
                backgroundColor: `${color}`,
              }}
              color={color}
              colorChange={handleColor}
            />
          </td>
          <td>
            <button
              className="addBox addAnchor"
              onClick={() => {
                handleSubmit();
                setAnchorInfo({
                  title: "",
                  color: "#fff",
                  from: today,
                  to: Date,
                });
              }}
            >
              <AddBox />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
