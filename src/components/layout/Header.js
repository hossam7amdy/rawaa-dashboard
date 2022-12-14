import {
  Flex,
  Menu,
  Avatar,
  Button,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
  MenuDivider,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Icon } from "../UI/Icons";
import { AuthContext } from "../../context/auth";
import Sidebar from "./Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { toggleColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoggedIn, logout, token } = useContext(AuthContext);

  const iconName = colorMode === "light" ? "moon" : "sun";
  const darkModeIcon = <Icon name={iconName} />;

  return (
    <>
      <Sidebar onClose={onClose} isOpen={isOpen} />
      <Flex
        pl={4}
        h="60px"
        w="full"
        as="header"
        align="center"
        borderBottom="1px"
        justify="space-between"
      >
        <Flex gap={2}>
          {isLoggedIn && (
            <IconButton
              onClick={onOpen}
              aria-label="sidebar menu"
              icon={<Icon name="hamburgerMenu" />}
            />
          )}
          <IconButton
            aria-label="toggle colorMode"
            onClick={toggleColorMode}
            icon={darkModeIcon}
          />
          {isLoggedIn && (
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<Avatar name={token.fullName} src="" size="sm" />}
                rightIcon={<Icon name="dropdownMenu" />}
              >
                Hi,{token.fullName.split(" ")[0]}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => navigate(`${token.id}`, { state: token })}
                >
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        <Link aria-label="logo" to={"/"}>
          {<Icon name="logo" boxSize={28} />}
        </Link>
      </Flex>
    </>
  );
};

export default Header;
