import React from "react";
import NaviBar from "./components/layout/NaviBar";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function App() {
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
