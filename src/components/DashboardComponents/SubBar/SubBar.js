import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { changeFolder, deleteFolder } from "../../../redux/actionCreators/fileFolderActionCreator";
import Swal from "sweetalert2";

const SubBar = (props) => {
  const { setIsCreateFolderModalOpen, setIsCreateFileModalOpen, setIsFileUploadModalOpen } = props;

  const [deleteFolderButton, setDeleteFolderButton] = useState(false);
  const [successDeleteFolder, setSuccessDeleteFolder] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { currenFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currenFolder: state.fileFolder.currenFolder,
      currentFolderData: state.fileFolder.userFolders.find(
        (folder) => folder.docId === state.fileFolder.currentFolder
      ),
      userFolders: state.fileFolder.userFolders,
    }),
    shallowEqual
  );

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  const reload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {
    if (pathname.includes("/folder/")) {
      setDeleteFolderButton(true);
    } else {
      setDeleteFolderButton(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (successDeleteFolder) {
      navigate("/dashboard");
      reload();
    }
    setSuccessDeleteFolder(false);
  }, [successDeleteFolder, reload]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb d-flex align-items-center">
          {currenFolder !== "root" ? (
            <>
              <button
                onClick={() => handleNavigate("/dashboard", "root")}
                className="breadcrumb-item btn btn-link text-decoration-none me-2 p-0"
              >
                Root
              </button>
              {currentFolderData?.data.path.map((folder, index) => (
                <button
                  key={index}
                  className="breadcrumb-item btn btn-link me-2 p-0 text-decoration-none"
                  onClick={() =>
                    handleNavigate(
                      `/dashboard/folder/${
                        userFolders.find((fldr) => folder === fldr.docId).docId
                      }`,
                      userFolders.find((fldr) => folder === fldr.docId).docId
                    )
                  }
                >
                  {userFolders.find((fldr) => folder === fldr.docId).data.name}
                </button>
              ))}
              <li className="breadcrumb-item active me-2 p-0">
                {currentFolderData?.data.name}
              </li>
              {deleteFolderButton && (
                <button className="btn btn-danger btn-sm"
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
                        deleteFolder(currentFolderData?.docId, setSuccessDeleteFolder);
                      }
                    })
                  }}
                >
                  <i className="ti ti-trash me-1"></i>
                  Delete
                </button>
              )}
            </>
          ) : (
            <>
              <li className="breadcrumb-item active">Root</li>
            </>
          )}
        </ol>
      </nav>

      <ul className="navbar-nav gap-2 ms-auto me-1">
        <li className="nav-item">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsFileUploadModalOpen(true)}
          >
            <i className="ti ti-file-upload me-1 fs-4"></i>
            Upload File
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsCreateFileModalOpen(true)}
          >
            <i className="ti ti-file-plus me-1 fs-4"></i>
            Create File
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <i className="ti ti-folder-plus me-1 fs-4"></i>
            Create Folder
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
