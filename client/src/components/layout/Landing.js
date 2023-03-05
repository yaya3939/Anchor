import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="centerBlock">
      <p>
        Please <Link to="/register">register</Link> or{" "}
        <Link to="/login">login</Link> to start your
        <br /> Anchor Life.
      </p>
    </div>
  );
};
