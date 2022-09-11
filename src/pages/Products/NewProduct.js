import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Heading,
  VStack,
  Checkbox,
} from "@chakra-ui/react";

import useFetch from "../../hooks/use-fetch";
import CustomInput from "../../components/Input/CustomInput";
import Selection from "../../components/Input/Selection";
import { DB_URL } from "../../lib/helpers";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Card from "../../components/UI/Card";

const NewProduct = () => {
  const {
    isLoading,
    error,
    data: categoriesList,
    fetchAPI: sendData,
  } = useFetch(`${DB_URL}Category/show_all`);

  const formSubmitHandler = async (values, actions) => {
    const formdata = new FormData(...values);

    console.log(formdata);

    // const requestOptions = {
    //   method: "POST",
    //   body: formdata,
    // };

    // const response = await sendData(`${DB_URL}Product/create/`, requestOptions);
    // console.log(response);

    // actions.resetForm();
  };

  const initial = {
    title: "",
    smallSizePrice: "",
    mediumSizePrice: "",
    bigSizePrice: "",
    discountValue: "",
    calories: "",
    hasTaste: "",
    imageFile: "",
  };

  if (isLoading) {
    return (
      <Card>
        <LoadingSpinner />
        <Heading>Form is Loading...</Heading>
      </Card>
    );
  }

  return (
    <VStack spacing={6} mt={6} w="90%">
      <Heading textAlign="center" size="md">
        Add New Product
      </Heading>
      <Card maxH="70vh">
        <Formik initialValues={initial} onSubmit={formSubmitHandler}>
          <Form>
            <VStack spacing={4}>
              <CustomInput
                name="title"
                placeholder="Enter product title"
                size="sm"
              />
              <Selection
                name="category"
                placeholder="choose category"
                size="sm"
              >
                {categoriesList.map((cat) => (
                  <option key={cat.image} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </Selection>
              <FormControl>
                <FormLabel>product image</FormLabel>
                <Input
                  variant="flushed"
                  name="imageFile"
                  type="file"
                  size="sm"
                />
              </FormControl>
              <HStack spacing={5} w="100%">
                <CustomInput
                  label="small price"
                  size="sm"
                  name="smallSizePrice"
                  placeholder="Enter price"
                  type="number"
                />
                <CustomInput
                  label="medium price"
                  size="sm"
                  name="mediumSizePrice"
                  placeholder="Enter price"
                  type="number"
                />
                <CustomInput
                  label="large price"
                  size="sm"
                  name="bigSizePrice"
                  placeholder="Enter price"
                  type="number"
                />
              </HStack>
              <HStack w="100%">
                <CustomInput
                  size="sm"
                  name="discountValue"
                  placeholder="Enter discount amount in %"
                  type="number"
                />
                <CustomInput
                  size="sm"
                  name="calories"
                  placeholder="How many calories?"
                  type="number"
                />
              </HStack>
              <Checkbox name="hasTaste" defaultValue={false}>
                Has Tastes
              </Checkbox>
              <Button type="submit">Submit</Button>
            </VStack>
          </Form>
        </Formik>
      </Card>
    </VStack>
  );
};

export default NewProduct;
