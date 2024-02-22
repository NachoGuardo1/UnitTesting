import { useReducer } from "react";

const initialState = { loading: true, data: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        data: [],
      };

    default:
      return state;
  }
};

export const FetchReducer = () => {
  return useReducer(reducer, initialState);
};
