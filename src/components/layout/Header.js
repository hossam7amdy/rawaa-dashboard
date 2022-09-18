import { useContext } from "react";

import {
  Flex,
  Menu,
  Badge,
  Input,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  InputGroup,
  IconButton,
  MenuButton,
  MenuDivider,
  FormControl,
  useColorMode,
  InputLeftElement,
} from "@chakra-ui/react";

import { getIconByName } from "../../lib/IconsFactory";
import { AuthContext } from "../../store/auth";

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  const { isLoggedIn, toggleSidebar, logout } = useContext(AuthContext);

  const iconName = colorMode === "light" ? "moon" : "sun";
  const darkModeIcon = getIconByName(iconName);

  return (
    <Flex
      w="100%"
      p="10px"
      align="center"
      justify="space-between"
      borderBottom="1px"
      gap="10px"
    >
      {isLoggedIn && (
        // FIXME: justify
        <Flex w={20} gap="10px">
          <IconButton
            onClick={toggleSidebar}
            icon={getIconByName("hamburgerMenu")}
          />
          <form>
            <FormControl>
              <InputGroup>
                <InputLeftElement children={getIconByName("search")} />
                <Input name="search" type="search" placeholder="search" />
              </InputGroup>
            </FormControl>
          </form>
        </Flex>
      )}

      {getIconByName("logo")}

      <Flex gap="10px">
        <IconButton onClick={toggleColorMode} icon={darkModeIcon} />
        {isLoggedIn && (
          <Menu>
            <MenuButton
              as={Button}
              p={3}
              align="center"
              justify="center"
              pos="relative"
            >
              {getIconByName("notification", {
                display: "flex",
              })}
              <Badge
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="15px"
                w="15px"
                bg="red"
                rounded="50%"
                pos="absolute"
                color="white"
                top="-1"
                right="-1"
              >
                1
              </Badge>
            </MenuButton>
            <MenuList>
              <MenuItem>new product was added</MenuItem>
            </MenuList>
          </Menu>
        )}
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
              <MenuItem>Setting</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
