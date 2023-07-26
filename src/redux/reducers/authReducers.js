import * as types from "../actionsTypes/authActionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;
