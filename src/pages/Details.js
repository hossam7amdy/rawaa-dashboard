import {
  Box,
  Flex,
  List,
  Text,
  HStack,
  ListItem,
  Container,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import CustomButton from "../components/Button/CustomButton";
import PreviewImage from "../components/UI/PreviewImage";
import useQueryById from "../hooks/useQueryById";
import CardHeader from "../components/UI/CardHeader";
import { PATH } from "../data/constants";
import Card from "../components/UI/Card";

const Details = ({ from }) => {
  const { id } = useParams();
  let { state } = useLocation();
  const navigate = useNavigate();
  const { isLoading, data } = useQueryById({ key: from, id });

  if (!state) {
    state = data;
  }

  let image;
  let content = [];

  for (const key in state) {
    if (key === "password") continue;
    if (key === "image") {
      image = (
        <PreviewImage
          boxSize="200px"
          rounded="lg"
          image={PATH.FILE + state[key]}
        />
      );
      continue;
    }
    content.push(
      <ListItem key={key}>
        <Flex gap={2}>
          <Text as="b">{key}: </Text>
          <Text as="kbd">{String(state[key])}</Text>
        </Flex>
      </ListItem>
    );
  }

  if (!state && isLoading) {
    return (
      <HStack h="50vh">
        <LoadingSpinner />
      </HStack>
    );
  }

  return (
    <Container minW="container.md">
      <CardHeader title={`${from} Details`} />
      <Card>
        <Flex justify="space-between">
          <List>{content}</List>
          <Box>{image}</Box>
        </Flex>
        <CustomButton
          mt={2}
          size="sm"
          name="Edit"
          variant="outline"
          colorScheme="yellow"
          isDisabled={state.userName === "admin"}
          onClick={() => navigate(`/${from}/edit/${id}`, { state })}
        />
      </Card>
    </Container>
  );
};

export default Details;
