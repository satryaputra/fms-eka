import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logInUserAction } from "../../redux/actionCreators/authActionCreator";
import { useDispatch } from "react-redux";
import { Alert, Toast } from "../AlertComponent/AlertComponent";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Alert("Warning", "Please fill in all fields", "warning");
      return;
    }

    dispatch(logInUserAction(email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/dashboard");
      Toast("success", "Login Successfully");
    }
  }, [success]);

  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/update-password">Forgot Password</Link>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Register</Link>
      </div>
    </>
  );
};

export default LoginForm;
