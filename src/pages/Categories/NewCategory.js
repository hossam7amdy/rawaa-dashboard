import { useState } from "react";
import { Form, Formik } from "formik";
import { Flex, Image, VStack, Heading, useToast } from "@chakra-ui/react";
import {
  BASE_URL,
  MAX_FILE_SIZE,
  SUCCESS_TOAST,
  SUPPORTED_FORMATS,
} from "../../lib/helpers";

import Card from "../../components/UI/Card";
import useFetch from "../../hooks/use-fetch";
import InputFile from "../../components/Input/FileInput";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import { useNavigate } from "react-router-dom";

// TODO enumrate away
const url = `${BASE_URL}/ar/api/cp/category`;

const NewCategory = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [preview, setPreview] = useState(null);
  const { isLoading, fetchAPI: sendData } = useFetch();

  const formSubmitHandler = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    await sendData(url, requestOptions);
    toast(SUCCESS_TOAST);

    setPreview(null);
    actions.resetForm();
    navigate(-1);
  };

  const initials = {
    titleAr: "",
    titleEn: "",
    image: "",
  };
  const validations = (values) => {
    let errors = {};

    const titleAr = values.titleAr.trim();
    if (titleAr.length === 0) {
      errors.titleAr = "invalid input";
    } else if (titleAr.length < 5) {
      errors.titleAr = "title must be at leas 5 letters.";
    }

    const titleEn = values.titleEn.trim();
    if (titleEn.length === 0) {
      errors.titleEn = "invalid input";
    } else if (titleEn.length < 5) {
      errors.titleEn = "title must be at least 5 letters.";
    }

    if (!SUPPORTED_FORMATS.includes(values.image.type)) {
      errors.image = "not supported format";
    } else if (values.image.size > MAX_FILE_SIZE) {
      errors.image = "Large size. Must be less than 1MB";
    }

    return errors;
  };

  return (
    <VStack spacing={6} mt={6} w="90%">
      <Heading size="md">Adding new Category</Heading>

      <Card minW="70%">
        <Formik
          initialValues={initials}
          validate={validations}
          onSubmit={formSubmitHandler}
        >
          {({ errors, setFieldValue }) => (
            <Form>
              <Flex w="100%" justify="space-evenly">
                <Image
                  rounded="full"
                  boxSize="100px"
                  justifyContent="center"
                  src={
                    preview
                      ? URL.createObjectURL(preview)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
                <VStack spacing={4} w="50%">
                  <InputFile
                    name="image"
                    label="Image"
                    display="none"
                    error={errors.image}
                    onChange={(event) => {
                      setPreview(event.target.files[0]);
                      setFieldValue("image", event.target.files[0]);
                    }}
                  />
                  <CustomInput
                    type="text"
                    name="titleAr"
                    label="Category in Arabic"
                    placeholder="Enter category name in arabic"
                  />
                  <CustomInput
                    type="text"
                    name="titleEn"
                    label="Category in English"
                    placeholder="Enter category name in english"
                  />
                  <CustomButton
                    type="submit"
                    variant="outline"
                    isDisabled={isLoading}
                    name={!isLoading && "Submit"}
                  />
                </VStack>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </VStack>
  );
};

export default NewCategory;
