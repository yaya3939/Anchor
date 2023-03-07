import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import AnchorTable from "./AnchorTable";
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
    <Grid container spacing={1}>
      <Grid item sm={6} md={7}>
        <AnchorTable />
      </Grid>
      <Grid item sm={6} md={5}>
        <TodoList />
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
