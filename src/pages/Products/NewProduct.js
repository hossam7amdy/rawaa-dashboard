import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Heading,
  VStack,
  Checkbox,
  Text,
} from "@chakra-ui/react";

import { PRODUCT_URL } from "../../lib/urls";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import CustomInput from "../../components/Input/CustomInput";
import Selection from "../../components/Input/Selection";
import useFetch from "../../hooks/use-fetch";
import Card from "../../components/UI/Card";

const NewProduct = () => {
  const [image, setImage] = useState(null);
  const {
    isLoading,
    error,
    data: categoriesList,
    fetchAPI: sendData,
  } = useFetch(`${PRODUCT_URL}/all`);

  const formSubmitHandler = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.append("image", image);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    await sendData(PRODUCT_URL, requestOptions);

    actions.resetForm();
  };

  const initial = {
    titleAr: "",
    titleEn: "",
    categoryId: "",
    smallSizePrice: "",
    mediumSizePrice: "",
    bigSizePrice: "",
    discountValue: "",
    calories: "",
    // hasTaste: false,
  };

  return (
    <VStack spacing={6} mt={6} w="90%">
      <Heading textAlign="center" size="md">
        Adding New Product
      </Heading>
      <Card maxH="70vh">
        {isLoading && (
          <VStack>
            <LoadingSpinner />
            <Text>Form is Loading...</Text>
          </VStack>
        )}
        {error && (
          <Text color="crimson">Failed to fetch categories. Try again!</Text>
        )}
        {!isLoading && !error && (
          <Formik initialValues={initial} onSubmit={formSubmitHandler}>
            <Form>
              <VStack spacing={4}>
                <CustomInput
                  name="titleAr"
                  type="text"
                  label="Title in Arabic"
                  placeholder="بيبروني"
                />
                <CustomInput
                  name="titleEn"
                  type="text"
                  label="Title in English"
                  placeholder="Pepperoni"
                />
                <Selection name="categoryId" placeholder="choose category">
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.titleEn}
                    </option>
                  ))}
                </Selection>
                <FormControl>
                  <FormLabel>product image</FormLabel>
                  <Input
                    name="image"
                    type="file"
                    variant="flushed"
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </FormControl>
                <HStack spacing={5} w="100%">
                  <CustomInput
                    name="smallSizePrice"
                    type="number"
                    label="small price"
                    placeholder="10"
                  />
                  <CustomInput
                    type="number"
                    name="mediumSizePrice"
                    label="medium price"
                    placeholder="20"
                  />
                  <CustomInput
                    name="bigSizePrice"
                    type="number"
                    label="large price"
                    placeholder="30"
                  />
                </HStack>
                <HStack w="100%">
                  <CustomInput
                    name="discountValue"
                    type="number"
                    label="discount value"
                    placeholder="23%"
                  />
                  <CustomInput
                    name="calories"
                    type="number"
                    placeholder="1500"
                  />
                </HStack>
                <Field as={Checkbox} name="hasTaste">
                  Has Tastes
                </Field>
                <Button type="submit">Submit</Button>
              </VStack>
            </Form>
          </Formik>
        )}
      </Card>
    </VStack>
  );
};

export default NewProduct;
