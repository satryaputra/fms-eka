import * as types from "../actionsTypes/authActionTypes";
import fire from "../../config/firebase";

import { Alert } from "../../components/AlertComponent/AlertComponent";

const logInUser = (payload) => {
  return {
    type: types.LOGIN,
    payload,
  };
};

const logOutUser = () => {
  return {
    type: types.LOGOUT,
  };
};

//  action creator
export const logInUserAction = (email, password, setSuccess) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        logInUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
      setSuccess(true);
    })
    .catch((error) => {
      Alert("Warning", "invalid email or password", "warning");
    });
};

export const registerUserAction =
  (name, email, password, setSuccess) => (dispatch) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        fire
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            const currentUser = fire.auth().currentUser;
            dispatch(
              logInUser({
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
              })
            );
            setSuccess(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert("Warning", "Email already in use!", "warning");
        } else if (error.code === "auth/invalid-email") {
          Alert("Warning", "Invalid email!", "warning");
        } else if (error.code === "auth/weak-password") {
          Alert("Warning", "Weak password, minimal 6 characters.", "warning");
        }
      });
  };

export const updateEmailUserAction =
  (email, password, emailUpdate, setSuccess) => (dispatch) => {
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        fire.auth().currentUser.updateEmail(emailUpdate)
          .then(() => {
            const currentUser = fire.auth().currentUser;
            dispatch(
              logInUser({
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
              })
            );
            setSuccess(true);
            Alert("Success", "Email has Changed", "success");
          }).catch((error) => {
            console.log(error);
          });
      }).catch(error => {
        if (error.code === "auth/wrong-password") {
            Alert("Warning", "The password is invalid!", "warning");
        } else {
            alert(error)
        }
      });
  };

export const resetPassword = (email, setSuccess) => {
  fire.auth().sendPasswordResetEmail(email);
  setSuccess(true);
}


export const logOutUserAction = () => (dispatch) => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(logOutUser());
    });
};

export const checkIsLoggedIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        logInUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};
