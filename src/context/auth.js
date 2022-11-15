import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: {},
  isLoggedIn: null,
  login: (user) => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const localToken = localStorage.getItem("token");
  const initialToken = JSON.parse(localToken);
  const [userToken, setUserToken] = useState(initialToken);

  const userLoggedIn = !!userToken;

  const loginHandler = (user) => {
    // TODO: Can you make it persist for a certian amount of time ??
    setUserToken(user);
    localStorage.setItem("token", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setUserToken(null);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const authContext = {
    token: userToken,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: userLoggedIn,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
