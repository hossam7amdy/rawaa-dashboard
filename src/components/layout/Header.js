import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Menu,
  Button,
  HStack,
  Avatar,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
  MenuDivider,
  useColorMode,
} from "@chakra-ui/react";

import { getIconByName } from "../../utils/IconsFactory";
import { AuthContext } from "../../context/auth";

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  const { isLoggedIn, toggleSidebar, logout } = useContext(AuthContext);

  const iconName = colorMode === "light" ? "moon" : "sun";
  const darkModeIcon = getIconByName(iconName);

  return (
    <Flex
      pl={4}
      h="60px"
      w="full"
      as="header"
      align="center"
      borderBottom="1px"
      justify="space-between"
    >
      <HStack>
        {isLoggedIn && (
          <IconButton
            aria-label="sidebar menu"
            onClick={toggleSidebar}
            icon={getIconByName("hamburgerMenu")}
          />
        )}
        <IconButton
          aria-label="toggle colorMode"
          onClick={toggleColorMode}
          icon={darkModeIcon}
        />
      </HStack>
      <HStack>
        {isLoggedIn && (
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Avatar name="Hossam Hamdy" src="" size="sm" />}
              rightIcon={getIconByName("dropdownMenu")}
            >
              Hi,Hossam
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
        <Link to={"/"}>{getIconByName("logo")}</Link>
      </HStack>
    </Flex>
  );
};

export default Header;
