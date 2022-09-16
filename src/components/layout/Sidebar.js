import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Text,
  Stack,
  Divider,
  Button,
  Spacer,
  Flex,
  Link,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";

import { AuthContext } from "../../contexts/auth-context";
import { getIconByName } from "../../lib/IconsFactory";
import { SIDEBAR_LIST } from "../../lib/helpers";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack w="100%" borderRight="1px" p={2} spacing={2}>
      <Heading fontSize={12} textTransform="uppercase" color="gray.300">
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
      <Heading fontSize={12} textTransform="uppercase" color="gray.300">
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
      <Button mx={1} my={3} onClick={logout} leftIcon={getIconByName("exit")}>
        Logout
      </Button>
    </Stack>
  );
};

export default Sidebar;
