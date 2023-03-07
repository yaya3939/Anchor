import React, { Fragment, useEffect, useState } from "react";
import AnchorItem from "./AnchorItem";
import AnchorInput from "./AnchorInput";
import Spinner from "../layout/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getAnchors } from "../../reducers/anchors";

function AnchorTable() {
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

  //-------------------------- anchorItems store --------------------------
  const [anchorItems, setAnchorItems] = useState([
    {
      title: "Example",
      color: { r: "244", g: "78", b: "59" },
      range: {},
      days: "TIME",
    }, //后期有数据库以后要改成根据items里是否有item显示或不显示
  ]);
  function addAnchor(event, anchorItem) {
    //make sure all input are required
    if (
      anchorItem.title !== "" &&
      JSON.stringify(anchorItem.color) !==
        JSON.stringify({ r: "255", g: "255", b: "255" })
    ) {
      setAnchorItems((prevItem) => {
        return [...prevItem, anchorItem];
      });
    } else {
      alert("Your anchor is not finished! Please check the title and color.");
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {/*  ------------------------input part--------------------------*/}
      <AnchorInput addAnchor={addAnchor} />

      {/*------------------------- anchorItem list -------------------------------*/}
      {nowAnchors.map((anchor) => (
        <AnchorItem key={anchor._id} anchor={anchor} className="cloudedGlass" />
      ))}
      {futureAnchors.map((anchor) => (
        <AnchorItem key={anchor._id} anchor={anchor} isNow={false} />
      ))}
    </Fragment>
  );
}

export default AnchorTable;
