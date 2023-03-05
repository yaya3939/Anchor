import React from "react";
import AnchorTable from "./AnchorTable";
import ItemTable from "./ItemTable";
import { Grid } from "@mui/material";

export default function Dashboard() {
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
