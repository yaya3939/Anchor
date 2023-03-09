import React, { useEffect } from "react";
import Anchor from "./Anchor";

import { useDispatch, useSelector } from "react-redux";
import { getAnchors } from "../../reducers/anchors";

export const Anchors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnchors());
  }, [dispatch]);

  const { nowAnchors, pastAnchors } = useSelector((state) => state.anchors);

  return (
    <div>
      {nowAnchors.map((anchor) => (
        <Anchor key={anchor._id} anchor={anchor} />
      ))}
    </div>
  );
};
