import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "@chakra-ui/react";

export const AuthContext = createContext({
  loggedIn: null,
  isSidebarOpen: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useBoolean(false);
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(token);

  const loginHandler = () => {
    // TODO: Can you make it persist for a certian amount of time ??
    localStorage.setItem("token", "yes");
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    navigate("/", { replace: true });
    localStorage.removeItem("token");
    setLoggedIn(false);
    setIsSidebarOpen.off();
  };

  const toggleSidebarHandler = () => {
    setIsSidebarOpen.toggle();
  };

  const authContext = {
    loggedIn,
    isSidebarOpen,
    login: loginHandler,
    logout: logoutHandler,
    toggleSidebar: toggleSidebarHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
