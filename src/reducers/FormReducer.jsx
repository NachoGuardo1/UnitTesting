import { useReducer } from "react";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    gender: "",
  },
  loading: false,
  error: "" || false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const FormReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "SET_USER",
      payload: {
        ...state.user,
        [name]: value,
      },
    });
  };

  return { state, dispatch, handleChange };
};
