import { useState } from "react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Image, VStack, useToast } from "@chakra-ui/react";

import { ARABIC_WORD, ENGLISH_WORD, IMAGE_FILE } from "../../lib/validations";
import { SUCCESS_TOAST, IMAGE_PREVIEW } from "../../lib/helpers";
import { CATEGORY_API, FILE_API } from "../../lib/api";
import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import InputFile from "../../components/Input/FileInput";
import useFetch from "../../hooks/use-fetch";
import Card from "../../components/UI/Card";
import InputHeader from "../../components/Input/InputHeader";

const NewCategory = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { state: prevState } = useLocation();
  const { isLoading, fetchAPI: sendData } = useFetch();
  const [Imagepreview, setImagePreview] = useState(
    prevState ? `${FILE_API}${prevState?.image}` : IMAGE_PREVIEW
  );

  const formSubmitHandler = async (values, actions) => {
    console.log(values);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const requestOptions = {
      method: !prevState ? "POST" : "PUT",
      body: formData,
    };

    const url = `${CATEGORY_API}/${prevState ? prevState.id : ""}`;
    await sendData(url, requestOptions);

    toast(SUCCESS_TOAST);

    actions.resetForm();
    setImagePreview(IMAGE_PREVIEW);
    if (prevState) navigate(-1);
  };

  const initials = {
    titleAr: prevState?.titleAr || "",
    titleEn: prevState?.titleEn || "",
    image: prevState?.image || "",
  };

  return (
    <Box>
      {/* TODO create form header component */}
      <InputHeader title={prevState ? "Edit Category" : "Add New Category"} />

      <Card maxH="70vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          {({ setFieldValue }) => (
            <Form>
              <Flex gap={10}>
                <Image
                  rounded="full"
                  boxSize="100px"
                  justifyContent="center"
                  src={Imagepreview}
                  alt="image placeholder"
                />
                <VStack minW="350px" spacing="4" align="start">
                  <InputFile
                    name="image"
                    label="Image"
                    display="none"
                    validate={IMAGE_FILE}
                    onChange={(event) => {
                      setFieldValue("image", event.target.files[0]);
                      setImagePreview(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                  />
                  <CustomInput
                    type="text"
                    name="titleAr"
                    validate={ARABIC_WORD}
                    label="Category in Arabic"
                    placeholder="Enter category name in arabic"
                  />
                  <CustomInput
                    type="text"
                    name="titleEn"
                    validate={ENGLISH_WORD}
                    label="Category in English"
                    placeholder="Enter category name in english"
                  />
                  <CustomButton
                    type="submit"
                    colorScheme="teal"
                    isDisabled={isLoading}
                    onClick={() => {
                      console.log(initials.image);
                    }}
                    name={
                      !isLoading &&
                      (!prevState ? "Add Category" : "Edit Category")
                    }
                  />
                </VStack>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default NewCategory;
