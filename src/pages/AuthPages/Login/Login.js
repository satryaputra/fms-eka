import React from "react";
import LoginForm from "../../../components/AuthComponents/LoginForm";

const Login = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>

        <LoginForm />

      </div>
    </div>
  )
};

export default Login;
