import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";
import { deleteFile } from "../../../redux/actionCreators/fileFolderActionCreator";
import Swal from "sweetalert2";

const FileComponent = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");
  const [successDeleteFile, setSuccessDeleteFile] = useState(false);
  const navigate = useNavigate();

  const { currentFile, isAuthenticated } = useSelector(
    (state) => ({
      currentFile: state.fileFolder.userFiles.find(
        (file) => file.docId === fileId
      ),
      isAuthenticated: state.auth.isAuthenticated,
    }),
    shallowEqual
  );


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, []);

  const reload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {
    if (successDeleteFile) {
      navigate(-1);
      reload();
    }
  }, [successDeleteFile]);
  

  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile?.data?.data);
      setPrevFileData(currentFile?.data?.data);
    }
  }, [currentFile, currentFile?.data?.data]);
  

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", currentFile?.data?.url);
    element.setAttribute("download", currentFile?.data?.name);

    element.setAttribute("target", "_blank");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  if (isAuthenticated)

  return (
    <div>
      {isAuthenticated && fileData !== null ? (
        <>
          <Header
            fileName={currentFile?.data?.name}
            fileData={fileData}
            prevFileData={prevFileData}
            fileId={fileId}
          />
          <CodeEditor
            fileName={currentFile?.data?.name}
            data={fileData}
            setData={setFileData}
          />
        </>
      ) : (
        <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
          {/* Sub Bar Menu */}
          <div className="d-flex px-5 py-4 justify-content-between align-items-center">
            <p title={currentFile?.data?.name} className="fs-4 my-0 py-0">
              {currentFile?.data?.name.length > 40
                ? currentFile?.data?.name.slice(0, 40) +
                  "... ." +
                  currentFile?.data?.extension
                : currentFile?.data?.name}
            </p>
            <div>
              <button
                className="btn btn-danger me-2"
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteFile(currentFile?.docId, setSuccessDeleteFile);
                    }
                  })
                }}
              >
                <i className="ti ti-trash me-1"></i>
                Delete
              </button>
              <button
                className="btn btn-primary me-2"
                onClick={() => downloadFile()}
              >
                <i className="ti ti-download me-1"></i>
                Download
              </button>
              <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate(-1)}
              >
                <i className="ti ti-arrow-left me-1"></i>
                Go Back
              </button>
            </div>
          </div>
          <div className="container w-100 mt-4 d-flex justify-content-center" style={{height: "500px"}}>
            {
              currentFile?.data?.extension.includes("png") || 
              currentFile?.data?.extension.includes("jpg") ||
              currentFile?.data?.extension.includes("jpeg") ||
              currentFile?.data?.extension.includes("gif") ? (
                <div className="h-100">
                  <img src={currentFile?.data?.url} alt={currentFile?.data?.name} className="h-100" />
                </div>
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <p className="text-center">
                    File type not supported. Please download the file to view it.
                  </p>
                </div>
              )
            }
          </div>
        </div>
      )}
    </div>
  );

  return <div>Login First</div>
};

export default FileComponent;
