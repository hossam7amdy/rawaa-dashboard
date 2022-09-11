import { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  Heading,
  VStack,
  Button,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";

import { AuthContext } from "../contexts/auth-context";
import { getIconByName } from "../lib/IconStore";
import CustomInput from "../components/Input/CustomInput";

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
    <VStack h="75vh" justifyContent="center" spacing={4}>
      <Heading>Login</Heading>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .trim()
            .min(6, "username must be greater than 5 letters long")
            .required("Invalid username"),
          password: Yup.string()
            .trim()
            .min(6, "password must be greater than 5 letters long")
            .required("Invalid password"),
        })}
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
            <Button type="submit" variant="outline">
              {!isLoading && "Login"}
              {isLoading && <Spinner />}
            </Button>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  );
};

export default Login;
