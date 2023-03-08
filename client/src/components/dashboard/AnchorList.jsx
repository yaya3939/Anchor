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

  const { anchors, loading } = useSelector((state) => state.anchors);
  const today = new Date();
  let pastAnchors = [];
  let futureAnchors = [];
  let nowAnchors = [];

  if (anchors.length > 0) {
    pastAnchors = anchors.filter(
      (anchor) => anchor.to && new Date(anchor.to).getTime() < today.getTime()
    );
    futureAnchors = anchors.filter(
      (anchor) => new Date(anchor.from).getTime() > today.getTime()
    );
    nowAnchors = anchors.filter(
      (anchor) =>
        !pastAnchors.includes(anchor) && !futureAnchors.includes(anchor)
    );
  }

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

  console.log(doneAnchors, todoAnchor);

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
