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

  if (anchor !== null) {
    var { title, color, from, to, records, _id } = anchor;
  }
  const fromD = new Date(from);
  const toD = new Date(to);

  const [displayForm, setDisplayForm] = useState(false);

  let daysAll = "";
  if (anchor !== null) {
    toD.getTime() > new Date().getTime() || !to
      ? (daysAll = getDays(fromD, new Date()) - 1) //nowAnchor [from,today)
      : (daysAll = getDays(fromD, toD)); //pastAnchor [from,to]
  }

  const formatD = (date) => moment(date).format("YY/M/D");

  const deleteR = async (record) => {
    try {
      await dispatch(
        deleteRecord({
          anchorId: _id,
          recordId: record._id,
        })
      ).unwrap();
    } catch (err) {
      console.log(err.errors);
    }
  };

  const deleteA = async () => {
    if (
      window.confirm("You're deleting this anchor! This can NOT be undone!")
    ) {
      try {
        await dispatch(deleteAnchor(_id)).unwrap();
        navigate("/");
      } catch (err) {
        console.log(err.errors);
      }
    }
  };

  const handleSubmit = async (anchorInfo) => {
    try {
      await dispatch(updateAnchor({ anchorInfo, anchorId: _id })).unwrap();
      alerting("Update successfully!", "success");
      setDisplayForm(false);
    } catch (err) {
      const errors = err.errors;
      errors.forEach((error) => {
        alerting(error.msg, "error");
      });
    }
  };
  function alerting(msg, alertType) {
    dispatch(setAlert(msg, alertType));
  }

  function opacity(rate) {
    let value = 0;
    switch (rate) {
      case 1:
        value = 0.2;
        break;
      case 2:
        value = 0.4;
        break;
      case 3:
        value = 0.6;
        break;
      case 4:
        value = 0.8;
        break;
      case 5:
        value = 1;
        break;
      default:
        value = 0;
        break;
    }
    return value;
  }

  return loading || anchor === null ? (
    <Spinner />
  ) : (
    <div className="mg-center text-gray1">
      <h1 className="text-center">
        <span style={{ color: `${color}` }}>{title}</span>
        <span className="normal"> / {daysAll}</span>
        <span className="normal"> / {records.length}</span>
      </h1>
      <p className="text-gray2 text-center">
        <span className="small">{formatD(from)}</span>
        <span className="pd-horizon">--</span>
        <span className="small">{to ? formatD(to) : "everyday"}</span>
      </p>
      {/* <div className="centerBlock">cal of records</div> */}
      <div className="cloudedGlass recordsBlock mg-center">
        {records.length > 0 &&
          records.map((record) => (
            <div key={record._id} className="recordBlock">
              <div
                className="recordDot"
                style={{
                  backgroundColor: `${color}`,
                  opacity: opacity(record.rate),
                }}
              ></div>
              <div className="text-left recordText">
                <p className="mg-center normal">{record.text}</p>
                <span className="text-gray3">
                  {moment(record.date).format("M/D")}
                </span>
                {formatD(record.date) === formatD(new Date()) && (
                  <button
                    className="transparent pointer text-gray3 pd-horizon"
                    onClick={() => deleteR(record)}
                  >
                    delete
                  </button>
                )}
              </div>
              <div
                className="line"
                style={{ backgroundColor: `${color}` }}
              ></div>
            </div>
          ))}
      </div>
      <div className="block text-center">
        <button className="transparent text-gray1 pointer" onClick={deleteA}>
          <DeleteIcon />
        </button>
        <span className="lead pd-horizon">/</span>
        <button
          className="transparent text-gray1 pointer"
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
            Ptitle={title}
            Pcolor={color}
            Pfrom={from}
            Pto={to}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Anchor;
