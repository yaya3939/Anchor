import React, { useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import moment from "moment";
import Spinner from "../layout/Spinner";
import { getDays } from "../utils/DatePicker";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecord,
  getAnchorById,
  deleteAnchor,
} from "../../reducers/anchors";

const Anchor = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const anchorId = useParams().id;
  useEffect(() => {
    dispatch(getAnchorById(anchorId));
  }, [dispatch, anchorId]);

  const { anchor, loading } = useSelector((state) => state.anchors);

  let daysAll = "";
  if (anchor !== null) {
    new Date(anchor.to).getTime() < new Date().getTime()
      ? (daysAll = getDays(anchor.from, anchor.to))
      : (daysAll = getDays(anchor.from, new Date()));
  }

  return loading || anchor === null ? (
    <Spinner />
  ) : (
    <div className="mg-center text-gray1">
      <h1 className="text-center">
        <span style={{ color: `${anchor.color}` }}>{anchor.title}</span>
        <span className="normal"> / {daysAll}</span>
        <span className="normal"> / {anchor.records.length}</span>
      </h1>
      <div className="centerBlock">cal of records</div>
      <div className="cloudedGlass recordsBlock mg-center">
        {anchor.records.length > 0 &&
          anchor.records.map((record) => (
            <div key={record._id} className="recordBlock">
              <div className="layout">
                <div
                  className="recordDot"
                  style={{ backgroundColor: `${anchor.color}` }}
                ></div>
                <div
                  className="line"
                  style={{ backgroundColor: `${anchor.color}` }}
                ></div>
              </div>
              <div className="pd-horizon text-left">
                <p className="mg-center normal">{record.text}</p>
                <span className="text-gray3">
                  {moment(record.date).format("M/D")}
                </span>
                {moment(record.date).format("MM/DD") ===
                  moment(new Date()).format("MM/DD") && (
                  <button
                    className="deleteRecord pointer text-gray3 pd-horizon"
                    onClick={async () => {
                      try {
                        await dispatch(
                          deleteRecord({
                            anchorId: anchor._id,
                            recordId: record._id,
                          })
                        ).unwrap();
                      } catch (err) {
                        console.log(err.errors);
                      }
                    }}
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      <button
        className="transparent pointer mg-center block"
        onClick={async () => {
          try {
            await dispatch(deleteAnchor(anchor._id)).unwrap();
            navigate("/");
          } catch (err) {
            console.log(err.errors);
          }
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Anchor;
