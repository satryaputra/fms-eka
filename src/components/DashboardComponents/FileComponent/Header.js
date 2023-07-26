import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actionCreators/fileFolderActionCreator";
import { deleteFile } from "../../../redux/actionCreators/fileFolderActionCreator";
import Swal from "sweetalert2";

const Header = ({ fileName, fileData, prevFileData, fileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successSaveFile, setSuccessSaveFile] = useState(false);
  const [successDeleteFile, setSuccessDeleteFile] = useState(false);

  const { currentFile } = useSelector(
    (state) => ({
      currentFile: state.fileFolder.userFiles.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );

  const reload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {
    if (successSaveFile) {
      navigate(-1);
    }
  }, [successSaveFile]);

  useEffect(() => {
    if (successDeleteFile) {
      navigate(-1);
      reload();
    }
  }, [successDeleteFile]);

  return (
    <nav className="navbar navbar-expand-lg mt-2 py-0 navbar-light bg-white shadow-sm">
      <p className="navbar-brand fw-semibold ms-5 mt-1 pb-0 pt-1">{fileName}</p>
      {fileData !== prevFileData && (
        <p className="m-0 fw-bold pb-2">*[modified]</p>
      )}

      <ul className="navbar-nav ms-auto me-5 pb-1">
        <li className="nav-item mx-2">
          <button
            className="btn btn-success"
            disabled={fileData === prevFileData}
            onClick={() => {
              dispatch(updateFileData(fileId, fileData, setSuccessSaveFile));
            }}
          >
            <i className="ti ti-device-floppy me-1"></i>
            Save
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-danger me-2"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteFile(currentFile?.docId, setSuccessDeleteFile);
                }
              });
            }}
          >
            <i className="ti ti-trash me-1"></i>
            Delete
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
            <i className="ti ti-arrow-left me-1"></i>
            Go Back
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
