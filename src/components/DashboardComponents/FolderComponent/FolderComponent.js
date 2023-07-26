import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import emptyImg from "../../../assets/images/empty.svg";
import ShowItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
  const { folderId } = useParams();

  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.fileFolder.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.fileFolder.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles: state.fileFolder.userFiles.filter(
        (file) => file.data.parent === folderId
      ),
    }),
    shallowEqual
  );

  const createdFiles = childFiles && childFiles.filter((file) => file.data.url === null);
  const uploadedFiles = childFiles && childFiles.filter((file) => file.data.data === null);

  return (
    <div className="col-md-12 w-100 px-5">
      {childFolders.length > 0 || childFiles.length > 0 ? (
        <p>
          <>
            {childFolders.length > 0 && (
              <ShowItems
                title={"Created Folder"}
                type={"folder"}
                items={childFolders}
              />
            )}
            {createdFiles.length > 0 && (
              <ShowItems
                title={"Created Files"}
                type={"file"}
                items={createdFiles}
              />
            )}
            {uploadedFiles.length > 0 && (
              <ShowItems
                title={"Uploaded Files"}
                type={"file"}
                items={uploadedFiles}
              />
            )}
          </>
        </p>
      ) : (
        <div
          className="d-flex justify-content-center flex-column"
          style={{ marginTop: "5rem" }}
        >
          <img src={emptyImg} alt="" width={200} className="mx-auto mb-4" />
          <p className="text-center fs-6">Folder Empty</p>
        </div>
      )}
    </div>
  );
};

export default FolderComponent;
