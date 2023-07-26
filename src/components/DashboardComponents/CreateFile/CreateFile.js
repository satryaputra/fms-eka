import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Alert } from "../../AlertComponent/AlertComponent";

import { createFile } from "../../../redux/actionCreators/fileFolderActionCreator";

const CreateFile = ({ setIsCreateFileModalOpen }) => {
  const [fileName, setFileName] = useState("");
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
        setFileName("");
        setSuccess(false);
        setIsCreateFileModalOpen(false)
    }
  }, [success])
  

  const dispatch = useDispatch();

  const checkFileAlreadyPresent = (fileName, extension) => {
    if (!extension) {
        fileName = fileName + ".txt";
    }
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
    if (fileName) {
      if (fileName.length > 2) {
        // Check file extension
        let fileExtension = false;
        if (fileName.split(".").length > 1) {
            fileExtension = true;
        }

        if (!checkFileAlreadyPresent(fileName, fileExtension)) {
          const data = {
            name: fileExtension ? fileName : `${fileName}.txt`,
            extension: fileExtension ? fileName.split(".")[1] : "txt",
            data: "",
            url: null,
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
          dispatch(createFile(data, setSuccess, setLoading));
        } else {
          Alert("Warning", "File alredy present!", "warning");
        }
      } else {
        Alert(
          "Warning",
          "File name must be at least 3 charachters",
          "warning"
        );
      }
    } else {
      Alert("Warning", "File name cannot be empty!", "warning");
    }
  };

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Create File</h4>
            <button
              className="btn btn-close"
              aria-label="Close"
              onClick={() => setIsCreateFileModalOpen(false)}
            ></button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fileName"
                  placeholder="data.txt, index.html, main.py"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
                disabled={loading}
              >
                Create File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFile;
