import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateEmailUserAction } from "../../redux/actionCreators/authActionCreator";
import { Alert } from "../AlertComponent/AlertComponent";

const UpdateEmailForm = () => {
    const { email } = useSelector((state) => ({
        email: state.auth.user.email
    }), shallowEqual);
  const [emailUpdate, setEmailUpdate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailUpdate || !password) {
      Alert("Warning", "Please fill in all fields", "warning");
      return;
    }

    dispatch(updateEmailUserAction(email, password, emailUpdate, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      Alert("Success", "Update Email is Success", "success");
      navigate("/dashboard");
    }
  }, [success]);


  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Update Email</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="emailUpdate" className="form-label">
                Email Update
              </label>
              <input
                type="emailUpdate"
                className="form-control"
                id="emailUpdate"
                value={emailUpdate}
                onChange={(e) => setEmailUpdate(e.target.value)}
              />
            </div>
            <hr />
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
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center">
        <Link to="/dashboard">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateEmailForm;
