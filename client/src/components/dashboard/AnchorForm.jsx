import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { AddBox } from "@mui/icons-material";
import ColorPicker from "../utils/ColorPicker";
import Daypicker from "../utils/DatePicker";
import { getDays } from "../utils/DatePicker";

export default function AnchorForm({
  Ptitle,
  Pcolor,
  Pfrom,
  Pto,
  handleSubmit,
}) {
  const today = moment(new Date()).startOf("day")._d; //make time 00:00
  const [anchorInfo, setAnchorInfo] = useState({
    title: Ptitle,
    color: Pcolor,
    from: new Date(Pfrom),
    to: new Date(Pto),
  });
  const { title, color, from, to } = anchorInfo;

  let past = false;
  if (new Date(Pto).getTime() < new Date().getTime()) {
    past = true;
  }

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
            {!past && (
              <Daypicker
                changedDay={days}
                today={today}
                range={{ from, to }}
                setRange={handleRange}
              />
            )}
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
              className="transparent addAnchor"
              onClick={() => {
                handleSubmit(anchorInfo);
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

AnchorForm.propTypes = {
  Ptitle: PropTypes.string.isRequired,
  Pcolor: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
