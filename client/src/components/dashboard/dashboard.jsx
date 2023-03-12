import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import AnchorList from "./AnchorList";
import TodoList from "./TodoList";
import Spinner from "../layout/Spinner";

import { useSelector } from "react-redux";

export default function Dashboard() {
  const { authenticated, loading } = useSelector((state) => state.auth);

  const landing = (
    <div className="centerBlock cloudedGlass">
      <p className="lead">
        Please <Link to="/register">register</Link> or{" "}
        <Link to="/login">login</Link> to start your
        <br /> Anchor Life.
      </p>
    </div>
  );

  const dashboard = (
    <Grid container spacing={5}>
      <Grid item sm={6} md={4}>
        <TodoList />
      </Grid>
      <Grid item sm={6} md={7}>
        <AnchorList />
      </Grid>
    </Grid>
  );

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>{authenticated ? dashboard : landing}</Fragment>
      )}
    </Fragment>
  );
}
