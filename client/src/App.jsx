import React, { Fragment, useEffect } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Alert } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NaviBar from "./components/layout/NaviBar";
import Footer from "./components/layout/Footer";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { loader as todoLoader } from "./components/dashboard/TodoList";
import Anchors from "./components/anchors/anchors";

import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./reducers/auth";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function SetAlert() {
  const alerts = useSelector((state) => state.alerts);

  const html =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id}>
        <Alert severity={`${alert.alertType}`}>{alert.msg}</Alert>
      </div>
    ));

  return html;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NaviBar />
        <div className="content-container">
          <SetAlert />
          <Outlet />
        </div>
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
}

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard />, loader: todoLoader },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/anchors", element: <Anchors /> },
    ],
  },
]);
