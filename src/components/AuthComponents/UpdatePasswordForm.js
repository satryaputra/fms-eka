import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../redux/actionCreators/authActionCreator';
import { Alert } from "../AlertComponent/AlertComponent";

const UpdatePasswordForm = () => {

    const [email, setEmail] = useState();
    const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
          Alert("Warning", "Please fill in all fields", "warning");
          return;
        }

        resetPassword(email, setSuccess);
      };
    
      React.useEffect(() => {
        if (success) {
          Alert("Success", "Password reset link has been sent to your email", "success");
          navigate("/");
        }
      }, [success]);

  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                placeholder='Email'
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Register</Link>
      </div>
    </>
  )
}

export default UpdatePasswordForm;