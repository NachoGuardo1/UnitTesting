import axios from "axios";

export const AuthService = {
  Login: (data) => {
    return axios.post(process.env.REACT_APP_API_URL + "auth/login", data);
  },
  Register: (data) => {
    return axios.post(process.env.REACT_APP_API_URL + "usuarios", data);
  },
};
