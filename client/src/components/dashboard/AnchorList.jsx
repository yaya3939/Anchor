import React, { useEffect } from "react";
import moment from "moment";
import AnchorItem from "./AnchorItem";
import AnchorForm from "./AnchorForm";
import Spinner from "../layout/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getAnchors } from "../../reducers/anchors";

function AnchorList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnchors());
  }, [dispatch]);

  const { futureAnchors, nowAnchors, loading } = useSelector(
    (state) => state.anchors
  );

  const doneAnchors = nowAnchors.filter((anchor) => {
    let done = anchor.records.some(
      ({ date }) =>
        date &&
        moment(date).format("YYYY/MM/DD") ===
          moment(new Date()).format("YYYY/MM/DD")
    );
    return done;
  });

  const todoAnchor = nowAnchors.filter(
    (anchor) => !doneAnchors.includes(anchor)
  );

  return loading ? (
    <Spinner />
  ) : (
    <div className="anchorList">
      {/*  ------------------------create new anchor--------------------------*/}
      <AnchorForm />

      {/*------------------------- anchors list -------------------------------*/}
      {todoAnchor.map((anchor) => (
        <AnchorItem key={anchor._id} anchor={anchor} className="cloudedGlass" />
      ))}
      {doneAnchors.map((anchor) => (
        <AnchorItem
          key={anchor._id}
          anchor={anchor}
          className="cloudedGlass"
          undone={false}
        />
      ))}
      {futureAnchors.map((anchor) => (
        <AnchorItem key={anchor._id} anchor={anchor} isNow={false} />
      ))}
    </div>
  );
}

export default AnchorList;
