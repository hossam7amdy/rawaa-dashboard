import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Text,
  Flex,
  Link,
  List,
  Spacer,
  Divider,
  Heading,
  ListItem,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { GRAY_COLOR, SIDEBAR_LIST } from "../../utils/config";
import { getIconByName } from "../../utils/IconsFactory";
import { AuthContext } from "../../context/auth";
import CustomButton from "../UI/CustomButton";

const Sidebar = () => {
  const color = useColorModeValue(...GRAY_COLOR);
  const { logout } = useContext(AuthContext);

  return (
    <VStack
      p={2}
      as="nav"
      w="full"
      h="full"
      align="start"
      borderRight="1px"
      maxW={{ base: 40, "2xl": 72 }}
    >
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
          {getIconByName("dashboard")}
          <Text> Dashboard </Text>
        </Flex>
      </Link>
      <Divider />
      <Heading size="xs" textTransform="uppercase" color={color}>
        Lists
      </Heading>
      <List spacing={3}>
        {SIDEBAR_LIST.map((link, idx) => (
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
                {getIconByName(link.toLowerCase())}
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
        leftIcon={getIconByName("exit")}
      />
    </VStack>
  );
};

export default Sidebar;
