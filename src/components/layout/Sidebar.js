import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Text,
  Flex,
  Link,
  List,
  Spacer,
  VStack,
  Heading,
  Divider,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";

import { GRAY_COLOR, SIDEBAR_LIST } from "../../data/constants";
import { AuthContext } from "../../context/auth";
import CustomButton from "../UI/CustomButton";
import { Icon } from "../UI/Icons";

const Sidebar = () => {
  const { logout, token } = useContext(AuthContext);
  const color = useColorModeValue(...GRAY_COLOR);

  const sidebarList =
    token.userName === "admin" ? SIDEBAR_LIST : [SIDEBAR_LIST[0]];

  return (
    <VStack as="nav" p={2} w="200px" align="start" borderRight="1px">
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
      <Spacer />
      <CustomButton
        w="full"
        name="Logout"
        alignSelf="center"
        onClick={logout}
        leftIcon={<Icon name="exit" />}
      />
    </VStack>
  );
};

export default Sidebar;
