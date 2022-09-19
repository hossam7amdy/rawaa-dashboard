import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { Container, useToast, VStack } from "@chakra-ui/react";

import {
  ARABIC_WORD,
  ENGLISH_WORD,
  VALIDATE_USERNAME,
  VALIDATE_PASSWORD,
} from "../../lib/validations";
import { RESTAURANT_URL, STAFF_URL } from "../../lib/urls";
import { SUCCESS_TOAST } from "../../lib/config";
import RadioSelection from "../../components/Input/RadioSelection";
import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import Selection from "../../components/Input/Selection";
import useFetch from "../../hooks/use-fetch";
import Card from "../../components/UI/Card";

const NewStaff = () => {
  const toast = useToast();
  const [restaurans, setRestaurans] = useState([]);
  const [managersList, setManagersList] = useState([]);
  const { isLoading, error, fetchRequest } = useFetch();

  useEffect(() => {
    const applyRestaurans = (data) => {
      setRestaurans(data);
    };
    fetchRequest({ url: `${RESTAURANT_URL}/all` }, applyRestaurans);
    fetchRequest({ url: `${STAFF_URL}/all` }, setManagersList);
  }, [fetchRequest]);

  const formSubmitHandler = async ({ active, ...values }, action) => {
    const formData = {
      active: active === "Active",
      ...values,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    };

    await fetchRequest({ url: STAFF_URL, requestOptions });

    if (error) {
      toast({
        title: "Failed",
        description: error || "Error Occurred. Try again!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    if (!isLoading && !error) {
      toast(SUCCESS_TOAST);
      action.resetForm();
    }
  };

  const adminsList = managersList
    .filter((manager) => manager.jop === "admin")
    .map((admin) => {
      return {
        key: admin.id,
        value: admin.fullName,
      };
    });

  const initials = {
    jop: "",
    active: "",
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
                validate={(value) =>
                  ARABIC_WORD(value) && ENGLISH_WORD(value)
                    ? "Invalid Name"
                    : ""
                }
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
                options={restaurans.map((res) => {
                  return { key: res.id, value: res.nameEn };
                })}
                label="Select a restauran"
                placeholder="select an option"
              />
              <Selection
                name="managerId"
                options={adminsList}
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
