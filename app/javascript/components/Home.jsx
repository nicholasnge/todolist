import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Hi Nicholas</h1>
        <p className="lead">
          You have {props.impt} important todos and {props.meh} meh todos.
        </p>
        <hr className="my-4" />
        <Link
          to="/todos"
          className="btn btn-lg custom-button"
          role="button"
        >
          Ah shit
        </Link>
      </div>
    </div>
  </div>
);
