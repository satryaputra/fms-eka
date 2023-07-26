import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Alert } from "../../AlertComponent/AlertComponent";
import { createFolder } from "../../../redux/actionCreators/fileFolderActionCreator";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userFolders, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFolders: state.fileFolder.userFolders,
      user: state.auth.user,
      currentFolder: state.fileFolder.currentFolder,
      currentFolderData: state.fileFolder.userFolders.find(
        (folder) => folder.docId === state.fileFolder.currentFolder
      ),
    }),
    shallowEqual
  );

  useEffect(() => {
    if(success) {
        setFolderName("");
        setSuccess(false);
        setIsCreateFolderModalOpen(false)
    }
  }, [success])

  const dispatch = useDispatch();

  const checkFolderAlreadyPresent = (folderName) => {
    const folderPresent = userFolders
      .filter((folder) => folder.data.parent === currentFolder)
      .find((folder) => folder.data.name === folderName);
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 2) {
        if (!checkFolderAlreadyPresent(folderName)) {
          const data = {
            name: folderName,
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

          dispatch(createFolder(data, setSuccess, setLoading));
        } else {
          Alert("Warning", "Folder alredy present!", "warning");
        }
      } else {
        Alert(
          "Warning",
          "Folder name must be at least 3 charachters",
          "warning"
        );
      }
    } else {
      Alert("Warning", "Folder name cannot be empty!", "warning");
    }
  };
  
  console.log(loading);

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Create Folder</h4>
            <button
              className="btn btn-close"
              aria-label="Close"
              onClick={() => setIsCreateFolderModalOpen(false)}
            ></button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="folderName"
                  placeholder="Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
                disabled={loading}
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
