import {
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Card from "../../components//UI/Card";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import { GRAY_COLOR } from "../../lib/config";

const NewRestaurant = () => {
  const color = useColorModeValue(...GRAY_COLOR);
  const initials = {
    name: "", // required max 100 chars
    nameEn: "", // required max 100 chars
    phone: "", // max 13
    state: 1, // 1,2,3,4
    governorate: "", // max 50
    city: "", // max 50
    street: "", // max 60
  };

  const formSubmitHandler = (values, action) => {
    console.log(values);
  };

  return (
    <VStack spacing={6} mt={6} w="90%">
      <Heading size="md">Adding new Restaurant</Heading>
      <Card maxH="80vh" w="100%">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          <Form>
            <VStack spacing={4}>
              <Flex gap={5} w="100%">
                <VStack spacing={4} w="50%">
                  <Text
                    textTransform="uppercase"
                    fontWeight="bold"
                    color={color}
                  >
                    Contact Info
                  </Text>
                  <CustomInput
                    name="name"
                    type="text"
                    placeholder="e.g. روعـــة"
                    label="Restaurant in Arabic"
                  />
                  <CustomInput
                    name="nameEn"
                    type="text"
                    placeholder="e.g. Rawaa"
                    label="Restaurant in English"
                  />
                  <CustomInput
                    name="phone"
                    type="tel"
                    placeholder="e.g. +02XXXXXXXXXX"
                    label="Restaurant Phone"
                  />
                </VStack>
                <Center height="200px">
                  <Divider orientation="vertical" />
                </Center>
                <VStack spacing={4} w="50%">
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
              <FormControl>
                <FormLabel>Resturant Current State</FormLabel>
                <RadioGroup defaultValue={1}>
                  <HStack spacing="24px">
                    <Radio value={1}>Opened</Radio>
                    <Radio value={2}>Closed</Radio>
                    <Radio value={3}>Maintenance</Radio>
                    <Radio value={4}>Soon</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <CustomButton name="Submit" type="submit" />
            </VStack>
          </Form>
        </Formik>
      </Card>
    </VStack>
  );
};

export default NewRestaurant;
