import * as React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import AnchorIcon from "@mui/icons-material/Anchor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useSelector } from "react-redux";
import { Fragment } from "react";

function NaviBar() {
  const { authenticated, loading } = useSelector((state) => state.auth);

  const date = new Date();
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "narrow",
  };
  const today = date.toLocaleDateString("ja-JP", options);

  return (
    <div className="navBar">
      <Breadcrumbs>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navHome active" : "navHome unactive"
          }
        >
          {today}
        </NavLink>
        {authenticated && !loading && (
          <NavLink
            to="/anchors"
            className={({ isActive }) => (isActive ? "active" : "unactive")}
          >
            <AnchorIcon />
          </NavLink>
        )}
        {authenticated && !loading && (
          <NavLink
            to="/calender"
            className={({ isActive }) => (isActive ? "active" : "unactive")}
          >
            <CalendarMonthIcon />
          </NavLink>
        )}
      </Breadcrumbs>
    </div>
  );
}

export default NaviBar;
