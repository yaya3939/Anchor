import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser } from "../../reducers/auth";
import { setAlert } from "../../reducers/alert";

export const Register = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = userInfo;

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const alerting = (msg, alertType) => dispatch(setAlert(msg, alertType));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      alerting("Please confirm your password again", "error");
    } else {
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();
        await dispatch(loadUser());
      } catch (error) {
        const errors = error.errors;
        errors.forEach((error) => {
          alerting(error.msg, "error");
        });
      }
    }
  };

  const { authenticated } = useSelector((state) => state.auth);
  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="centerBlock cloudedGlass">
      <h1 className="large text-primary">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
