import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Text,
  Flex,
  Link,
  List,
  Stack,
  Heading,
  Divider,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";

import { GRAY_COLOR, SIDEBAR_LIST } from "../../data/constants";
import { AuthContext } from "../../context/auth";
import CustomButton from "../Button/CustomButton";
import { Drawer } from "../Drawer/Drawer";
import { Icon } from "../UI/Icons";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, token } = useContext(AuthContext);
  const color = useColorModeValue(...GRAY_COLOR);

  const sidebarList =
    token?.userName === "admin" ? SIDEBAR_LIST : [SIDEBAR_LIST[0]];

  const bodyContent = (
    <Stack as="nav">
      <Heading size="xs" textTransform="uppercase" color={color}>
        Main
      </Heading>
      <Link
        as={(props) => (
          <NavLink
            {...props}
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "normal" };
            }}
          />
        )}
        to="/"
      >
        <Flex align="center" gap={1}>
          {<Icon name="dashboard" />}
          <Text> Dashboard </Text>
        </Flex>
      </Link>
      <Divider />
      <Heading size="xs" textTransform="uppercase" color={color}>
        Lists
      </Heading>
      <List spacing={3}>
        {sidebarList.map((link, idx) => (
          <ListItem key={idx}>
            <Link
              as={(props) => (
                <NavLink
                  {...props}
                  style={({ isActive }) => {
                    return { fontWeight: isActive ? "bold" : "normal" };
                  }}
                />
              )}
              to={link.toLowerCase()}
            >
              <Flex align="center" gap={1}>
                {<Icon name={link.toLowerCase()} />}
                {link}
              </Flex>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Stack>
  );

  const footerContent = (
    <CustomButton
      w="full"
      name="Logout"
      alignSelf="center"
      onClick={() => {
        logout();
        onClose();
      }}
      leftIcon={<Icon name="exit" />}
    />
  );

  return (
    <Drawer
      bodyContent={bodyContent}
      footerContent={footerContent}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default Sidebar;
