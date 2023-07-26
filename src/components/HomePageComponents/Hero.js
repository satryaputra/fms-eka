import React from "react";
import heroPoster from "../../assets/images/hero1.svg";

const Hero = () => {
  return (
    <div className="container position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col d-flex justify-content-center ps-5">
            <div>
              <h2>Welcome to</h2>
              <h1>File Management System</h1>
              <p className="fs-5"> 
                This is a Web Application using ReactJS Technology and Google Firebase, that designed for File Management System,
                allowing users to efficiently organize, access, and manage their
                files.
              </p>
              <p> By
                <a href="https://ekasatrya-porto.web.app" className="ms-1 mb-0" target="_blank">
                  Eka Satrya
                </a>
              </p>
              
            </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <img src={heroPoster} alt="" height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
