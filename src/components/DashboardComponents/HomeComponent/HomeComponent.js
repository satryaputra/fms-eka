import React from "react";
import ShowItems from "../ShowItems/ShowItems";
import { shallowEqual, useSelector } from "react-redux";
import loadingImg from "../../../assets/images/loading1.svg";

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.fileFolder.isLoading,
      userFolders: state.fileFolder.userFolders.filter(
        (folder) => folder.data.parent === "root"
      ),
      userFiles: state.fileFolder.userFiles.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  return (
    <div className="col-md-12 w-100 px-5">
      {isLoading ? (
        <div
          className="d-flex justify-content-center flex-column"
          style={{ marginTop: "5rem" }}
        >
          <img src={loadingImg} alt="" width={200} className="mx-auto mb-4" />
          <p className="text-center fs-8">Loading...</p>
        </div>
      ) : (
        <>
          <ShowItems
            title={"Created Folder"}
            type={"folder"}
            items={userFolders}
          />
          <ShowItems
            title={"Created Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.url === null)}
          />
          <ShowItems
            title={"Uploaded Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.data === null)}
          />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
