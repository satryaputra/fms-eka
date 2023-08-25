import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const NavigationComponent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ backgroundColor: "#5a667c" }}
    >
      <Link to="/" className="navbar-brand ms-5">
        <strong>
          <em>F M S</em>
        </strong>
        <span className="ms-2">E k a</span>
      </Link>

      <ul className="navbar-nav ms-auto me-5 gap-2 my-2 z-4">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <p className="pt-2 mb-0 me-3">
                <span className="text-light me-1">Welcome, </span>
                <span className="text-warning fs-4 fw-semibold">{user.displayName}</span>
              </p>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="btn btn-primary">
                <i className="ti ti-layout-dashboard me-1"></i>
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-secondary">
                <i className="ti ti-login me-1"></i>
                Login
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/register" className="btn btn-success">
                <i className="ti ti-user-plus me-1"></i>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationComponent;
