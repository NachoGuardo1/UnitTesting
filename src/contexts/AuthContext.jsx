import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthReducer } from "../reducers/AuthReducer";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = AuthReducer();
  const navigate = useNavigate();

  const checkLocalStorage = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    if (storedUserData) {
      dispatch({
        type: "LOGIN",
        payload: { user: storedUserData.user, token: storedUserData.token },
      });
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const onLogin = (user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
    localStorage.setItem("user", JSON.stringify({ user, token }));
    navigate("/");
  };

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("favs");
  };

  return (
    <authContext.Provider
      value={{
        onLogin,
        onLogout,
        ...state,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
