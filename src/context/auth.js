import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "@chakra-ui/react";

export const AuthContext = createContext({
  token: {},
  isLoggedIn: null,
  isSidebarOpen: null,
  login: (user) => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const localToken = localStorage.getItem("token");
  const initialToken = JSON.parse(localToken);
  const [userToken, setUserToken] = useState(initialToken);
  const [isSidebarOpen, setIsSidebarOpen] = useBoolean(false);

  const userLoggedIn = !!userToken;

  const loginHandler = (user) => {
    // TODO: Can you make it persist for a certian amount of time ??
    setUserToken(user);
    localStorage.setItem("token", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setUserToken(null);
    setIsSidebarOpen.off();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const toggleSidebarHandler = () => {
    setIsSidebarOpen.toggle();
  };

  const authContext = {
    isSidebarOpen,
    token: userToken,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: userLoggedIn,
    toggleSidebar: toggleSidebarHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
