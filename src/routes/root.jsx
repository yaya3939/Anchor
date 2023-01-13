import React from "react";
import NaviBar from "../components/NaviBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="mycontainer">
      <NaviBar />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
