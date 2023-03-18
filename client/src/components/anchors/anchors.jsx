import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import AnchorItem from "../dashboard/AnchorItem";
import AnchorCal from "./AnchorCal";

import { useSelector } from "react-redux";

export const Anchors = () => {
  const { nowAnchors, pastAnchors } = useSelector((state) => state.anchors);

  const dateFormat = (date) => moment(date).format("YY/MM/DD");

  return (
    <div className="gridBoard">
      <div className="todoBlock text-gray1 mg-center">
        <h2 className="text-primary">Past Anchors</h2>
        <ol className="pastAnchors">
          {pastAnchors.map((anchor) => (
            <li key={anchor._id}>
              <Link
                to={`/anchors/${anchor._id}`}
                className="lead text-bold pastAnchorLink"
              >
                {anchor.title}
              </Link>
              {"  "}/{"  "}
              <p className="blocks">
                {dateFormat(anchor.from)} - {dateFormat(anchor.to)}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="anchorList">
        {nowAnchors.map((anchor) => (
          <AnchorItem
            key={anchor._id}
            className="cloudedGlass"
            anchor={anchor}
            children={(anchor) => <AnchorCal anchor={anchor} />}
          />
        ))}
      </div>
    </div>
  );
};
