import * as types from "../actionsTypes/fileFolderActionTypes";
import fire from "../../config/firebase";

import { Alert } from "../../components/AlertComponent/AlertComponent";

// actions

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// files
const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload
})

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload
})

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload
})

// Action creators folders

export const createFolder = (data, setSuccess, setLoading) => (dispatch) => {
  setLoading(true);
  fire.firestore().collection("folders").add(data).then( async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
      Alert("Success", "Folder created successfully", "success");
      setSuccess(true)
      setLoading(false);
    }).catch(() => {
      setSuccess(false);
    });
};

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const folderData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(setLoading(false));
      dispatch(addFolders(folderData));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

export const deleteFolder = (folderId, setSuccessDeleteFolder) => {
  fire.firestore().collection("folders").doc(folderId).delete().then(() => {
      setSuccessDeleteFolder(true);
      Alert('Deleted!', 'Your folder has been deleted.', 'success');
    }).catch(() => {
    Alert("Error", "Failed to delete folder!", "error");
    setSuccessDeleteFolder(false);
  })
}

// Action creators files
export const getFiles = (userId) => (dispatch) => {
  fire.firestore().collection("files").where("userId", "==", userId).get().then( async (files) => {
      const filesData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      dispatch(addFiles(filesData));
    });
};

export const createFile = (data, setSuccess, setLoading) => (dispatch) => {
  setLoading(true);
  fire.firestore().collection("files").add(data).then( async (file) => {
    const fileData = await (await file.get()).data();
    const fileId = file.id;
    dispatch(addFile({ data: fileData, docId: fileId}));
    Alert("Success", "File created successfully", "success");
    setSuccess(true);
    setLoading(false);
  }).catch(() => {
    setSuccess(false);
  });
};

export const updateFileData = (fileId, data, setSuccessSaveFile) => (dispatch) => {
  fire.firestore().collection("files").doc(fileId).update({ data }).then(() => {
    dispatch(setFileData({ fileId, data }));
    Alert("Success", "Filed saved successfully", "success");
    setSuccessSaveFile(true);
  }).catch(() => {
    Alert("Warning", "Something went wrong", "warning");
  });
};

export const uploadFile = (file, data, setSuccess, setLoading) => (dispatch) => {
  setLoading(true);
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

  uploadFileRef.put(file).on("state_changed", (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    console.log("uploading " + progress + "%");
  },
  (error) => {
    console.log(error);
  },
  async () => {
    const fileUrl = await uploadFileRef.getDownloadURL();
    const fullData = { ...data, url: fileUrl };

    fire.firestore().collection("files").add(fullData).then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      dispatch(addFile({ data: fileData, docId: fileId }));

      Alert("Success", "File uploaded successfully!", "success");
      setSuccess(true);
      setLoading(false);
    }).catch(() => {
      setSuccess(false);
    })
    }
  );
};

export const deleteFile = (fileId, setSuccessDeleteFile) => {
  fire.firestore().collection("files").doc(fileId).delete().then(() => {
      setSuccessDeleteFile(true);
      Alert('Deleted!', 'Your file has been deleted.', 'success');
      window.location.reload();
    }).catch(() => {
    Alert("Error", "Failed to delete file!", "error");
    setSuccessDeleteFile(false);
  })
}
