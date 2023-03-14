import React from "react";
import moment from "moment";
import startOfDay from "date-fns/startOfDay";
import AnchorItem from "./AnchorItem";
import AnchorForm from "./AnchorForm";
import FutureRight from "./FutureRight";
import NowRight from "./NowRight";
import Spinner from "../layout/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { createAnchor } from "../../reducers/anchors";
import { setAlert } from "../../reducers/alert";

function AnchorList() {
  const { futureAnchors, nowAnchors, loading } = useSelector(
    (state) => state.anchors
  );

  const doneAnchors = nowAnchors.filter((anchor) => {
    let done = anchor.records.some(
      ({ date }) =>
        date &&
        moment(date).format("YY/M/D") === moment(new Date()).format("YY/M/D")
    );
    return done;
  });
  const todoAnchor = nowAnchors.filter(
    (anchor) => !doneAnchors.includes(anchor)
  );

  const dispatch = useDispatch();
  const alerting = (msg, alertType) => {
    dispatch(setAlert(msg, alertType));
  };
  const handleSubmit = async (anchorInfo) => {
    try {
      await dispatch(createAnchor(anchorInfo)).unwrap();
    } catch (err) {
      const errors = err.errors;
      errors.forEach((error) => {
        alerting(error.msg, "error");
      });
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="anchorList">
      {/*  ------------------------create new anchor--------------------------*/}
      <AnchorForm
        Ptitle=""
        Pcolor="#fff"
        Pfrom={startOfDay(new Date())}
        handleSubmit={handleSubmit}
      />

      {/*------------------------- anchors list -------------------------------*/}
      {todoAnchor.map((anchor) => (
        <AnchorItem
          key={anchor._id}
          anchor={anchor}
          className="cloudedGlass"
          children={(anchor) => <NowRight anchor={anchor} />}
        />
      ))}
      {doneAnchors.map((anchor) => (
        <AnchorItem
          key={anchor._id}
          anchor={anchor}
          className="cloudedGlass"
          children={(anchor) => <NowRight anchor={anchor} isDone={true} />}
        />
      ))}
      {futureAnchors.map((anchor) => (
        <AnchorItem
          key={anchor._id}
          anchor={anchor}
          isNow={false}
          isDone={false}
          children={(anchor) => <FutureRight anchor={anchor} />}
        />
      ))}
    </div>
  );
}

export default AnchorList;
