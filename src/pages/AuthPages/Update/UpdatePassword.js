import React from "react";
import UpdatePasswordForm from "../../../components/AuthComponents/UpdatePasswordForm";

const UpdatePassword = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>

        <UpdatePasswordForm />

      </div>
    </div>
  )
};

export default UpdatePassword;
