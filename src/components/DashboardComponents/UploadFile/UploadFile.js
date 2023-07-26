import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Alert } from "../../AlertComponent/AlertComponent";
import { uploadFile } from "../../../redux/actionCreators/fileFolderActionCreator";

// import { createFile } from "../../../redux/actionCreators/fileFolderActionCreator";

const UploadFile = ({ setIsFileUploadModalOpen }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.fileFolder.userFiles,
      user: state.auth.user,
      currentFolder: state.fileFolder.currentFolder,
      currentFolderData: state.fileFolder.userFolders.find(
        (file) => file.docId === state.fileFolder.currentFolder
      ),
    }),
    shallowEqual
  );

  useEffect(() => {
    if(success) {
        // setFileName("");
        setSuccess(false);
        setIsFileUploadModalOpen(false)
    }
  }, [success])
  

  const dispatch = useDispatch();

  const checkFileAlreadyPresent = (fileName) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((file) => file.data.name === fileName);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
        if (!checkFileAlreadyPresent(file.name)) {
          const data = {
            name: file.name,
            extension: file.name.split(".")[1],
            data: null,
            url: "null",
            userId: user.uid,
            createdBy: user.displayName,
            parent: currentFolder,
            path:
              currentFolder === "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            lastAccessed: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          dispatch(uploadFile(file, data, setSuccess, setLoading));
        } else {
          Alert("Warning", "File alredy present!", "warning");
        }
      } else {
        Alert(
          "Warning",
          "File cannot be empty!",
          "warning"
        );
      }
    }

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Upload File</h4>
            <button
              className="btn btn-close"
              aria-label="Close"
              onClick={() => setIsFileUploadModalOpen(false)}
            ></button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
                disabled={loading}
              >
                Upload File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
