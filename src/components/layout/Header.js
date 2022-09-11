import { useContext } from "react";

import {
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  IconButton,
  Button,
  FormControl,
  useColorMode,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { getIconByName } from "../../lib/IconStore";
import { AuthContext } from "../../contexts/auth-context";

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  const { loggedIn, logout, toggleSidebar } = useContext(AuthContext);

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
      {loggedIn && (
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
                <Input w="auto" id="search" type="text" placeholder="search" />
              </InputGroup>
            </FormControl>
          </form>
        </Flex>
      )}

      {getIconByName("logo")}

      <Flex gap="10px">
        <IconButton onClick={toggleColorMode} icon={darkModeIcon} />
        {loggedIn && (
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
                borderRadius="50%"
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
        {/* {loggedIn && (
          <Menu>
            <MenuButton as={Button} p={3} pos="relative">
              {getIconByName("orders", {
                display: "flex",
              })}
              <Badge
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="15px"
                w="15px"
                bg="red"
                borderRadius="50%"
                pos="absolute"
                color="white"
                top="-1"
                right="-1"
              >
                5
              </Badge>
            </MenuButton>
            <MenuList>
              <MenuItem>product1</MenuItem>
              <MenuItem>product2</MenuItem>
              <MenuItem>product3</MenuItem>
              <MenuItem>product4</MenuItem>
              <MenuItem>product5</MenuItem>
            </MenuList>
          </Menu>
        )} */}
        {loggedIn && (
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
