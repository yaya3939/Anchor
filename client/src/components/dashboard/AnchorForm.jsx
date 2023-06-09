import React, { useState } from "react";
import PropTypes from "prop-types";
import startOfDay from "date-fns/startOfDay";
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
  const [anchorInfo, setAnchorInfo] = useState({
    title: Ptitle,
    color: Pcolor,
    from: new Date(Pfrom),
    to: new Date(Pto),
  });
  const { title, color, from, to } = anchorInfo;

  const now = new Date();

  let past = false;
  if (startOfDay(new Date(Pto)).getTime() < startOfDay(now).getTime()) {
    past = true;
  }

  //[from,to]
  let days = getDays(from, to);
  if (isNaN(days)) {
    days = "Everyday";
  }

  const [displayDate, setDisplayDate] = useState(false);
  const [displayColor, setDisplayColor] = useState(false);

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
    range && //avoid crash caused by range=undefine when from=to
      setAnchorInfo((prevVa) => {
        return { ...prevVa, from: range.from, to: range.to };
      });
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
            {!past && (
              <Daypicker
                changedDay={days}
                today={now}
                range={{ from, to }}
                setRange={handleRange}
                dateDisplay={displayDate}
                onDisplay={() => {
                  setDisplayDate(!displayDate);
                  setDisplayColor(false);
                }}
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
              colorDisplay={displayColor}
              onDisplay={() => {
                setDisplayColor(!displayColor);
                setDisplayDate(false);
              }}
            />
          </td>
          <td
            onClick={() => {
              setDisplayColor(false);
              setDisplayDate(false);
            }}
          >
            <button
              className="transparent text-gray1 addAnchor"
              onClick={() => {
                handleSubmit(anchorInfo);
                setAnchorInfo({
                  title: "",
                  color: "#fff",
                  from: now,
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
