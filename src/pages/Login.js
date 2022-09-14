import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import { VStack, Heading, InputLeftElement } from "@chakra-ui/react";

import CustomInput from "../components/Input/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import { AuthContext } from "../contexts/auth-context";
import { getIconByName } from "../lib/IconStore";

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

  const initials = {
    username: "",
    password: "",
  };
  const validationSchema = (values) => {
    let errors = {};

    const username = values.username.trim();
    if (username.length === 0) {
      errors.username = "invalid input";
    } else if (username.length < 5) {
      errors.username = "title must be at leas 5 letters.";
    }

    const password = values.password.trim();
    if (password.length === 0) {
      errors.password = "invalid input";
    } else if (password.length < 5) {
      errors.password = "title must be at least 5 letters.";
    }

    return errors;
  };

  return (
    <VStack h="75vh" justifyContent="center" spacing={4}>
      <Heading>Login</Heading>
      <Formik
        initialValues={initials}
        validate={validationSchema}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <VStack w="md">
            <CustomInput
              name="username"
              placeholder="Enter your username"
              type="text"
              leftElement={
                <InputLeftElement children={getIconByName("person")} />
              }
            />
            <CustomInput
              name="password"
              placeholder="Enter your password"
              type="password"
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
    </VStack>
  );
};

export default Login;
