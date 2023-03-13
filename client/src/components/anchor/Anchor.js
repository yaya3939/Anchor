import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Spinner from "../layout/Spinner";
import AnchorForm from "../dashboard/AnchorForm";
import { getDays } from "../utils/DatePicker";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../reducers/alert";
import {
  getAnchorById,
  deleteAnchor,
  updateAnchor,
  deleteRecord,
} from "../../reducers/anchors";

const Anchor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const anchorId = useParams().id;
  useEffect(() => {
    dispatch(getAnchorById(anchorId));
  }, [dispatch, anchorId]);

  const { anchor, loading } = useSelector((state) => state.anchors);

  const [displayForm, setDisplayForm] = useState(false);
  // const [displayInput, setDisplayInput] = useState(false);

  let daysAll = "";
  if (anchor !== null) {
    new Date(anchor.to).getTime() < new Date().getTime()
      ? (daysAll = getDays(anchor.from, anchor.to))
      : (daysAll = getDays(anchor.from, new Date()));
  }

  const deleteR = async (record) => {
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
  };

  const alerting = (msg, alertType) => {
    dispatch(setAlert(msg, alertType));
  };
  const handleSubmit = async (anchorInfo) => {
    try {
      await dispatch(
        updateAnchor({ anchorInfo, anchorId: anchor._id })
      ).unwrap();
      alerting("Update successfully!", "success");
      setDisplayForm(false);
    } catch (err) {
      const errors = err.errors;
      errors.forEach((error) => {
        alerting(error.msg, "error");
      });
    }
  };

  return loading || anchor === null ? (
    <Spinner />
  ) : (
    <div className="mg-center text-gray1">
      <h1 className="text-center">
        <span style={{ color: `${anchor.color}` }}>{anchor.title}</span>
        <span className="normal"> / {daysAll}</span>
        <span className="normal"> / {anchor.records.length}</span>
      </h1>
      <p className="text-gray2 text-center">
        <span className="small">{moment(anchor.from).format("YY/M/D")}</span>
        <span className="pd-horizon">--</span>
        <span className="small">
          {anchor.to ? moment(anchor.to).format("YY/M/D") : "everyday"}
        </span>
      </p>
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
                {/* <button
                  className="textBtn text-gray3 pd-horizon pointer"
                  onClick={() => setDisplayInput(!displayInput)}
                >
                  edit
                </button> */}
                {moment(record.date).format("MM/DD") ===
                  moment(new Date()).format("MM/DD") && (
                  <button
                    className="textBtn pointer text-gray3 pd-horizon"
                    onClick={() => deleteR(record)}
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="block text-center">
        <button
          className="transparent pointer"
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
        <span className="lead pd-horizon">/</span>
        <button
          className="transparent pointer"
          onClick={() => {
            setDisplayForm(!displayForm);
          }}
        >
          <EditIcon />
        </button>
      </div>
      <div className="text-center">
        {displayForm && (
          <AnchorForm
            Ptitle={anchor.title}
            Pcolor={anchor.color}
            Pfrom={anchor.from}
            Pto={anchor.to}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Anchor;
