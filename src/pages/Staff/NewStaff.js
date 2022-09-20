import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import { Container, useToast, VStack } from "@chakra-ui/react";

import {
  VALIDATE_FULLNAME,
  VALIDATE_USERNAME,
  VALIDATE_PASSWORD,
} from "../../lib/validations";
import { FAILED_TOAST, SUCCESS_TOAST } from "../../lib/config";
import RadioSelection from "../../components/Input/RadioSelection";
import { STAFF_URL } from "../../lib/urls";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import Selection from "../../components/Input/Selection";
import Card from "../../components/UI/Card";

const NewStaff = () => {
  const toast = useToast();
  const { data: staff } = useQueryData("staff");
  const [isLoading, setIsLoading] = useState(false);
  const { data: restaurants } = useQueryData("restaurants");

  const formSubmitHandler = async (values, action) => {
    try {
      setIsLoading(true);

      const config = {
        url: STAFF_URL,
        method: "post",
        data: values,
      };

      await axios(config);

      toast(SUCCESS_TOAST);
      action.resetForm();
    } catch (error) {
      toast(FAILED_TOAST);
    } finally {
      setIsLoading(false);
    }
  };

  const managersList = staff
    ?.filter((manager) => manager.jop === "admin")
    .map((admin) => {
      return {
        key: admin.id,
        value: admin.fullName,
      };
    });

  const initials = {
    jop: "",
    fullName: "",
    userName: "",
    password: "",
    managerId: "",
    restaurantId: "",
  };

  return (
    <Container>
      <CardHeader title="Add New Staff" />
      <Card maxH="70vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          <Form>
            <VStack align="start" spacing={4}>
              <CustomInput
                type="text"
                name="fullName"
                label="Full Name"
                placeholder="Mohamed Fawzy"
                validate={VALIDATE_FULLNAME}
              />
              <CustomInput
                type="text"
                name="userName"
                label="username"
                validate={VALIDATE_USERNAME}
                placeholder="Enter username"
              />
              <CustomInput
                type="password"
                name="password"
                label="password"
                validate={VALIDATE_PASSWORD}
                placeholder="Enter password"
              />
              <Selection
                name="restaurantId"
                options={restaurants?.map((res) => {
                  return { key: res.id, value: res.nameEn };
                })}
                label="Select a restauran"
                placeholder="select an option"
              />
              <Selection
                name="managerId"
                options={managersList}
                label="Select a manager"
                placeholder="select an option"
              />
              <RadioSelection
                name="jop"
                label="Role"
                options={["admin", "cashier"]}
                validate={(value) => (!value ? "Required" : "")}
              />
              <CustomButton
                type="submit"
                colorScheme="teal"
                isDisabled={isLoading}
                name={!isLoading && "Add Staff"}
              />
            </VStack>
          </Form>
        </Formik>
      </Card>
    </Container>
  );
};

export default NewStaff;
