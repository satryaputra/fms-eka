import React from "react";
import UpdateEmailForm from "../../../components/AuthComponents/UpdateEmailForm";

const UpdateEmail = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>

        <UpdateEmailForm />

      </div>
    </div>
  )
};

export default UpdateEmail;
