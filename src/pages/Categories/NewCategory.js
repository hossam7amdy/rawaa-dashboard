import { useState } from "react";
import { Form, Formik } from "formik";
import { Heading, VStack } from "@chakra-ui/react";
import InputFile from "../../components/Input/FileInput";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import Card from "../../components/UI/Card";
import useFetch from "../../hooks/use-fetch";
import { DB_URL } from "../../lib/helpers";

const NewCategory = () => {
  const [imageFile, setImageFile] = useState("");
  const { fetchAPI: sendData } = useFetch();

  const formSubmitHandler = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    // formData.append("source.Files", imageFile);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    console.log(values, imageFile);

    // const response = await sendData(`${DB_URL}Category/create`, requestOptions);
    // console.log(response);
  };

  const initials = {
    Title: "",
    TitleEn: "",
    // imageFile: "",
  };

  return (
    <VStack spacing={6} mt={6} w="90%">
      <Heading textAlign="center" size="md">
        Adding new Category
      </Heading>
      <Card>
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          <Form>
            <VStack spacing={4}>
              <CustomInput
                name="Title"
                placeholder="Enter category name in arabic"
                label="Category in Arabic"
              />
              <CustomInput
                name="TitleEn"
                placeholder="Enter category name in english"
                label="Category in English"
              />
              <InputFile
                name="imageFile"
                label="Category Image"
                variant="flushed"
                setImageFile={setImageFile}
              />
              <CustomButton name="Submit" type="submit" />
            </VStack>
          </Form>
        </Formik>
      </Card>
    </VStack>
  );
};

export default NewCategory;
