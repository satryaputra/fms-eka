import { useEffect, useState } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../../components/DashboardComponents/Navbar/Navbar";
import SubBar from "../../components/DashboardComponents/SubBar/SubBar";
import HomeComponent from "../../components/DashboardComponents/HomeComponent/HomeComponent";
import FolderComponent from "../../components/DashboardComponents/FolderComponent/FolderComponent";
import FileComponent from "../../components/DashboardComponents/FileComponent/FileComponent";

import CreateFolder from "../../components/DashboardComponents/CreateFolder/CreateFolder";
import CreateFile from "../../components/DashboardComponents/CreateFile/CreateFile";
import UploadFile from "../../components/DashboardComponents/UploadFile/UploadFile";
import { shallowEqual, useDispatch } from "react-redux";
import {
  getFiles,
  getFolders,
} from "../../redux/actionCreators/fileFolderActionCreator";

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();

  const { isAuthenticated, isLoading, userId } = useSelector(
    (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.fileFolder.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch]);

  useEffect(() => {
    if (pathname.includes("/file/")) {
      setShowSubBar(false);
    } else {
      setShowSubBar(true);
    }
  }, [pathname]);

  return (
    <div className="overflow-hidden">
      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}
      {isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} />
      )}
      <Navbar />
      {showSubBar && (
        <SubBar
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          setIsCreateFileModalOpen={setIsCreateFileModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
        />
      )}
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/folder/:folderId" element={<FolderComponent />} />
        <Route path="/file/:fileId" element={<FileComponent />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
