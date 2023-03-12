import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import AnchorItem from "../dashboard/AnchorItem";
import AnchorCal from "./AnchorCal";

import { useSelector } from "react-redux";

export const Anchors = () => {
  const { nowAnchors, pastAnchors } = useSelector((state) => state.anchors);

  const dateFormat = (date) => moment(date).format("YY/MM/DD");

  return (
    <Grid container spacing={1}>
      <Grid item sm={6} md={7}>
        <div>
          {nowAnchors.map((anchor) => (
            <AnchorItem
              key={anchor._id}
              className="cloudedGlass"
              anchor={anchor}
              children={(anchor) => {}}
            />
          ))}
        </div>
      </Grid>
      <Grid item sm={6} md={5}>
        <div className="todoBlock text-gray1 mg-center">
          <h2 className="lead text-bold">Past Anchors</h2>
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
      </Grid>
    </Grid>
  );
};
