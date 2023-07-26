import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAction } from "../../redux/actionCreators/authActionCreator";

import { Alert } from "../AlertComponent/AlertComponent";

const RegisterForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      Alert("Warning", "Please fill in all fields", "warning");
      return;
    }
    if (password !== confirmPassword) {
      Alert("Warning", "Passwords do not match", "warning");
      return;
    }

    dispatch(registerUserAction(name, email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/login");
      Alert(
        "Success",
        "Your account is successfully created, lets Log In",
        "success"
      );
    }
  }, [success]);

  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-3">
              <label htmlFor="passwordConfirmation" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirmation"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default RegisterForm;
