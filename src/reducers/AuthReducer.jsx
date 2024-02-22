import { useReducer } from "react";

const initialState = {
  userLogged: false,
  userData: {},
  userToken: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userLogged: true,
        userData: action.payload.user,
        userToken: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        userLogged: false,
        userData: {},
        userToken: "",
      };

    default:
      return state;
  }
};

export const AuthReducer = () => {
  return useReducer(reducer, initialState);
};
