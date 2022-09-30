import { useContext } from "react";
import { Formik, Form } from "formik";
import { Container, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  VALIDATE_TEXT,
  VALIDATE_USERNAME,
  VALIDATE_PASSWORD,
} from "../../utils/validations";
import { AuthContext } from "../../context/auth";
import RadioSelection from "../../components/Input/RadioSelection";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import Selection from "../../components/Input/Selection";
import { PATH } from "../../utils/config";
import Card from "../../components/UI/Card";

const NewStaff = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { isLoading, mutate } = useMutateData("staff");
  const { state: prevState } = useLocation();
  const { data: staff } = useQueryData("staff");
  const { data: restaurant } = useQueryData("restaurants");

  const isEditing = !!prevState;
  const isAuthorized = token.userName === "admin";

  const editStaffHandler = (values) => {
    const config = {
      url: `${PATH.STAFF}/${prevState.id}`,
      method: "put",
      data: values,
    };

    mutate(config, { onSuccess: () => navigate(-2) });
  };

  const formSubmitHandler = (values, actions) => {
    if (prevState) {
      editStaffHandler(values);
    } else {
      const config = { method: "post", data: values };
      mutate(config);
    }
    actions.resetForm();
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
    jop: prevState?.jop || "",
    fullName: prevState?.fullName || "",
    userName: prevState?.userName || "",
    password: prevState?.password || "",
    managerId: prevState?.managerId || "",
    restaurantId: prevState?.restaurantId || "",
  };

  return (
    <Container>
      <CardHeader title={prevState ? "Edit Staff" : "Add New Staff"} />
      <Card maxH="75vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          <Form>
            <VStack align="start" spacing={4}>
              <CustomInput
                type="text"
                name="fullName"
                label="Full Name"
                placeholder="Mohamed Fawzy"
                validate={VALIDATE_TEXT}
              />
              <CustomInput
                type="text"
                name="userName"
                label="username"
                isDisabled={isEditing}
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
              {isAuthorized && (
                <>
                  <Selection
                    name="restaurantId"
                    options={restaurant?.map((res) => {
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
                </>
              )}
              <CustomButton
                type="submit"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText="Submitting"
                name={prevState ? "Edit Staff" : "Add Staff"}
              />
            </VStack>
          </Form>
        </Formik>
      </Card>
    </Container>
  );
};

export default NewStaff;
