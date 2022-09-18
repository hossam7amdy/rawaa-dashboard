import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "@chakra-ui/react";

export const AuthContext = createContext({
  isLoggedIn: null,
  isSidebarOpen: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token);
  const [isSidebarOpen, setIsSidebarOpen] = useBoolean(false);

  const loginHandler = () => {
    // TODO: Can you make it persist for a certian amount of time ??
    setIsLoggedIn(true);
    localStorage.setItem("token", "yes");
  };

  const logoutHandler = () => {
    setIsSidebarOpen.off();
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const toggleSidebarHandler = () => {
    setIsSidebarOpen.toggle();
  };

  const authContext = {
    isLoggedIn,
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
