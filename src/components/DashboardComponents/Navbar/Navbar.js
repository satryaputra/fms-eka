import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logOutUserAction } from "../../../redux/actionCreators/authActionCreator";
import { Toast } from "../../AlertComponent/AlertComponent";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      style={{ backgroundColor: "#5a667c" }}
    >
      <Link to="/dashboard" className="navbar-brand ms-5">
        Dashboard
      </Link>

      <ul className="navbar-nav ms-auto me-5 gap-2 my-2 z-4">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/" className="btn btn-primary">
                <i className="ti ti-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="btn btn-warning dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="javascript:void(0)"
                id="drop2"
              > 
                <i class="ti ti-user me-1"></i>
                {user.displayName}
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up mt-2 p-0 shadow-sm border" aria-labelledby="drop2">
              <div class="message-body">
                <p class="d-flex align-items-center gap-2 dropdown-item justify-content-center m-0 py-2 fs-4 fw-bold">{user.displayName}
                </p>
                <hr className="m-0 p-0" />
                <a href="/update-email" class="d-flex align-items-center gap-2 dropdown-item">
                  <i class="ti ti-mail fs-6"></i>
                  <p class="mb-0 fs-3">Change Email</p>
                </a>
                <a href="/update-password" class="d-flex align-items-center gap-2 dropdown-item">
                  <i class="ti ti-lock fs-6"></i>
                  <p class="mb-0 fs-3">Change Password</p>
                </a>
              </div>
            </div>
            </li>
            <li className="nav-item ">
              <button
                className="btn btn-outline-danger"
                onClick={ () => {
                  dispatch(logOutUserAction());
                  navigate("/");
                  Toast("info", "Logout Successfully")
                }}
              >
                <i className="ti ti-logout me-1"></i>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-seco">
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

export default Navbar;
