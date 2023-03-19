import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getDays } from "../utils/DatePicker";

import { useDispatch } from "react-redux";
import { deleteAnchor } from "../../reducers/anchors";

export default function AnchorItem({ anchor, isNow, className, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { from, to, title, color, _id } = anchor;

  //[today,to]
  const daysCount = getDays(new Date(), new Date(to));
  //[from,to]
  const daysAll = getDays(new Date(from), new Date(to));

  const handleDelete = async () => {
    try {
      await dispatch(deleteAnchor(_id)).unwrap();
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
              style={{ backgroundColor: `${color}` }}
              onClick={() => navigate(`/anchors/${_id}`)}
            >
              {title}
            </h1>
            <hr />
            <p className="mg-center">
              {isNow
                ? isNaN(daysCount) || to === null
                  ? "Everyday"
                  : daysCount
                : isNaN(daysAll)
                ? "Everyday"
                : daysAll}
            </p>
          </td>
          <td className="anchorRight" id={`Cal${title.split(" ").join("")}`}>
            {children(anchor)}
          </td>
          {!isNow && (
            <td>
              <button
                className="transparent text-gray1 pointer"
                onClick={handleDelete}
              >
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
