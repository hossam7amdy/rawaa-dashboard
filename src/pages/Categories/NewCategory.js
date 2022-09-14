import { useState } from "react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Wrap, Flex, Image, Heading, useToast } from "@chakra-ui/react";
import {
  BASE_URL,
  MAX_FILE_SIZE,
  SUCCESS_TOAST,
  SUPPORTED_FORMATS,
} from "../../lib/helpers";

import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import InputFile from "../../components/Input/FileInput";
import useFetch from "../../hooks/use-fetch";
import Card from "../../components/UI/Card";

const NewCategory = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [preview, setPreview] = useState(null);
  const { isLoading, fetchAPI: sendData } = useFetch();

  const formSubmitHandler = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    const requestOptions = {
      method: !state ? "POST" : "PUT",
      body: formData,
    };

    // TODO enumrate away
    const url = `${BASE_URL}/en/api/cp/category/${state ? state.id : ""}`;

    await sendData(url, requestOptions);

    toast(SUCCESS_TOAST);

    setPreview(null);
    actions.resetForm();
    navigate(-1); // previous page
  };

  const initials = {
    titleAr: state?.titleAr || "",
    titleEn: state?.titleEn || "",
    image: "",
  };
  const validations = (values) => {
    let errors = {};

    const titleAr = values.titleAr.trim();
    if (titleAr.length === 0) {
      errors.titleAr = "Invalid Input";
    } else if (titleAr.length < 5) {
      errors.titleAr = "Title must be at leas 5 letters.";
    }

    const titleEn = values.titleEn.trim();
    if (titleEn.length === 0) {
      errors.titleEn = "Invalid Input";
    } else if (titleEn.length < 5) {
      errors.titleEn = "Title must be at least 5 letters.";
    }

    if (state) {
      // FIXME: put request
    } else if (!SUPPORTED_FORMATS.includes(values.image.type)) {
      errors.image = "Not supported format";
    } else if (values.image.size > MAX_FILE_SIZE) {
      errors.image = "Large size. Must be less than 1MB";
    }

    return errors;
  };

  return (
    <Box maxW="90%" maxH="80vh" m={6}>
      <Heading size="md" m={6}>
        Adding new Category
      </Heading>

      <Card>
        <Formik
          initialValues={initials}
          validate={validations}
          onSubmit={formSubmitHandler}
        >
          {({ errors, setFieldValue }) => (
            <Form>
              <Flex gap={10}>
                <Image
                  rounded="full"
                  boxSize="100px"
                  justifyContent="center"
                  src={
                    preview
                      ? URL.createObjectURL(preview)
                      : state
                      ? `${BASE_URL}/api/file/${state.image}`
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
                <Wrap spacing={4}>
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
                    colorScheme="teal"
                    isDisabled={isLoading}
                    name={!isLoading && "Submit"}
                  />
                </Wrap>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default NewCategory;
