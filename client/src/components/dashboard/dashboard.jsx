import React from "react";
import { Grid } from "@mui/material";

import AnchorTable from "./AnchorTable";
import ItemTable from "./ItemTable";

import { useSelector } from "react-redux";

export default function Dashboard() {
  const { authenticated, loading } = useSelector((state) => state.auth);

  return (
    <Grid container spacing={1}>
      <Grid item sm={6} md={7}>
        <AnchorTable />
      </Grid>
      <Grid item sm={6} md={5}>
        <ItemTable />
      </Grid>
    </Grid>
  );
}
