import {
  Text,
  Flex,
  Center,
  VStack,
  Divider,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ARABIC_TEXT,
  ENGLISH_TEXT,
  PHONE_NUMBER,
} from "../../utils/validations";
import { GRAY_COLOR, PATH } from "../../data/constants";
import RadioSelection from "../../components/Input/RadioSelection";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import Card from "../../components/UI/Card";

const New = () => {
  const navigate = useNavigate();
  const { state: prevState } = useLocation();
  const color = useColorModeValue(...GRAY_COLOR);
  const { isLoading, mutate } = useMutateData("restaurants");
  const options = ["Open", "Closed", "Maintenance", "Soon"];

  const editRestaurantHandler = (values) => {
    const config = {
      url: `${PATH.RESTAURANT}/${prevState.id}`,
      method: "put",
      data: values,
    };
    mutate(config, {
      onSuccess: navigate(-2),
    });
  };

  const formSubmitHandler = ({ state: choosenState, ...values }, actions) => {
    const state = options.findIndex((item) => item === choosenState) + 1;
    if (prevState) {
      editRestaurantHandler({ state, ...values });
    } else {
      mutate({ method: "post", data: { state, ...values } });
    }
    actions.resetForm();
  };

  const initials = {
    city: prevState?.city || "",
    phone: prevState?.phone || "",
    state: prevState?.state || "",
    street: prevState?.street || "",
    nameAr: prevState?.nameAr || "",
    nameEn: prevState?.nameEn || "",
    governorate: prevState?.governorate || "",
  };
  return (
    <Container minW="container.lg">
      <CardHeader
        title={prevState ? "Edit Restaurant" : "Add new restaurant"}
      />
      <Card maxH="75vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          <Form>
            <VStack spacing={4} align="start">
              <Flex gap={5} w="full">
                <VStack spacing={4} w="full">
                  <Text
                    textTransform="uppercase"
                    fontWeight="bold"
                    color={color}
                  >
                    Contact Info
                  </Text>
                  <CustomInput
                    name="nameAr"
                    type="text"
                    placeholder="e.g. روعـــة"
                    label="Restaurant in Arabic"
                    validate={ARABIC_TEXT}
                  />
                  <CustomInput
                    name="nameEn"
                    type="text"
                    placeholder="e.g. Rawaa"
                    label="Restaurant in English"
                    validate={ENGLISH_TEXT}
                  />
                  <CustomInput
                    name="phone"
                    type="tel"
                    placeholder="e.g. +02XXXXXXXXXX"
                    label="Restaurant Phone"
                    validate={PHONE_NUMBER}
                  />
                </VStack>
                <Center height="200px">
                  <Divider orientation="vertical" />
                </Center>
                <VStack spacing={4} w="full">
                  <Text
                    textTransform="uppercase"
                    fontWeight="bold"
                    color={color}
                  >
                    Location Info
                  </Text>
                  <CustomInput
                    name="street"
                    placeholder="e.g. Talaat Harb Street"
                    label="Street name"
                  />
                  <CustomInput
                    name="city"
                    placeholder="e.g. El Nozha, New Cairo City"
                    label="City/Area"
                  />
                  <CustomInput
                    name="governorate"
                    placeholder="e.g. New Cairo"
                    label="Governorate"
                  />
                </VStack>
              </Flex>
              <RadioSelection
                name="state"
                label="Resturant State"
                options={options}
              />
              <CustomButton
                type="submit"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText="Submitting"
                name={prevState ? "Edit Restaurant" : "Add Restaurant"}
              />
            </VStack>
          </Form>
        </Formik>
      </Card>
    </Container>
  );
};

export default New;
