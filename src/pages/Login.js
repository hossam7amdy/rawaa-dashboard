import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import { VStack, Heading, InputLeftElement, Container } from "@chakra-ui/react";

import { VALIDATE_PASSWORD, VALIDATE_USERNAME } from "../utils/validations";
import CustomInput from "../components/Input/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import { AuthContext } from "../context/auth";
import { getIconByName } from "../utils/IconsFactory";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(null);

  const formSubmitHandler = (enteredValues) => {
    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container my={28}>
      <Heading textAlign="center">Login</Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <VStack spacing={4}>
            <CustomInput
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your username"
              validate={VALIDATE_USERNAME}
              leftElement={
                <InputLeftElement mr={5} children={getIconByName("person")} />
              }
            />
            <CustomInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              validate={VALIDATE_PASSWORD}
              leftElement={
                <InputLeftElement children={getIconByName("password")} />
              }
            />
            <CustomButton
              type="submit"
              variant="outline"
              isDisabled={isLoading}
              name={!isLoading && "Login"}
            />
          </VStack>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
