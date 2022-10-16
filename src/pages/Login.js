import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import {
  Text,
  VStack,
  Heading,
  Container,
  InputLeftElement,
} from "@chakra-ui/react";

import { VALIDATE_PASSWORD, VALIDATE_USERNAME } from "../utils/validations";
import { Icon } from "../components/UI/Icons";
import { AuthContext } from "../context/auth";
import CustomButton from "../components/UI/CustomButton";
import { request } from "../utils/axios-utils";
import CustomInput from "../components/Input/CustomInput";
import { PATH } from "../data/constants";

const Login = () => {
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(null);

  const formSubmitHandler = (enteredValues) => {
    setIsLoading(true);
    const config = {
      url: `${PATH.STAFF}/login`,
      method: "post",
      data: enteredValues,
    };
    request(config)
      .then((res) => login(res.data))
      .catch((_) => setError("Invalid uername or password"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Container my={28}>
      <Heading textAlign="center">Login</Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={formSubmitHandler}
      >
        <Form onChange={() => setError(null)}>
          <VStack spacing={4}>
            <CustomInput
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your username"
              validate={VALIDATE_USERNAME}
              leftElement={
                <InputLeftElement mr={5} children={<Icon name="person" />} />
              }
            />
            <CustomInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              validate={VALIDATE_PASSWORD}
              leftElement={
                <InputLeftElement children={<Icon name="password" />} />
              }
            />
            {error && <Text color="red.500">{error}</Text>}
            <CustomButton
              name="Login"
              type="submit"
              variant="outline"
              isLoading={isLoading}
              loadingText="Loading"
              spinnerPlacement="end"
            />
          </VStack>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
