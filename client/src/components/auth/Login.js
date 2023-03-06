import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUser } from "../../reducers/auth";
import { setAlert } from "../../reducers/alert";

export const Login = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const alerting = (msg, alertType) => dispatch(setAlert(msg, alertType));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      dispatch(loadUser());
    } catch (error) {
      const errors = error.errors;
      errors.forEach((error) => {
        alerting(error.msg, "error");
      });
    }
  };

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="centerBlock cloudedGlass">
      <h1 className="large text-primary">Sign In</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};
