import * as React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import AnchorIcon from "@mui/icons-material/Anchor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

function NaviBar() {
  const date = new Date();
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "narrow",
  };
  const today = date.toLocaleDateString("ja-JP", options);

  let unactiveStyle = { textDecoration: "none", color: "grey" };
  let activeStyle = { textDecoration: "none", color: "white" };

  return (
    <div className="navBar">
      <Breadcrumbs>
        <NavLink
          to="/"
          className="NavHome"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          {today}
        </NavLink>
        <NavLink
          to="/anchors"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <AnchorIcon />
        </NavLink>
        <NavLink
          to="/calender"
          style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
        >
          <CalendarMonthIcon />
        </NavLink>
        {/* <NavLink to="/settings">
        <MoreVertIcon />
      </NavLink> */}
      </Breadcrumbs>
    </div>
  );
}

export default NaviBar;
