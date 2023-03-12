import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getDays } from "../utils/DatePicker";

import { useDispatch } from "react-redux";
import { deleteAnchor } from "../../reducers/anchors";

export default function AnchorItem({ anchor, isNow, className, children }) {
  const navigate = useNavigate();
  const today = new Date();
  const daysCount = getDays(today, anchor.to);
  const daysAll = getDays(anchor.from, anchor.to);

  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deleteAnchor(anchor._id)).unwrap();
    } catch (err) {
      console.log(err.errors);
    }
  };

  return (
    <table className={`anchorItem ${className}`}>
      <tbody>
        <tr>
          <td className="anchorLeft">
            <h1
              className="lead anchorTitle pointer"
              style={{ backgroundColor: `${anchor.color}` }}
              onClick={() => navigate(`/anchors/${anchor._id}`)}
            >
              {anchor.title}
            </h1>
            <hr />
            <p className="mg-center">
              {isNow
                ? isNaN(daysCount)
                  ? "Everyday"
                  : daysCount
                : isNaN(daysAll)
                ? "Everyday"
                : daysAll}
            </p>
          </td>
          <td
            className="anchorRight"
            id={`Cal${anchor.title.split(" ").join("")}`}
          >
            {children(anchor)}
          </td>
          {!isNow && (
            <td>
              <button className="transparent pointer" onClick={handleDelete}>
                <DeleteIcon />
              </button>
            </td>
          )}
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
  children: PropTypes.func.isRequired,
};
