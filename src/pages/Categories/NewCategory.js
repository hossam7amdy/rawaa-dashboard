import { useState } from "react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, useToast } from "@chakra-ui/react";

import { ARABIC_WORD, ENGLISH_WORD, IMAGE_FILE } from "../../lib/validations";
import { CATEGORY_URL, FILE_URL } from "../../lib/urls";
import { FAILED_TOAST, SUCCESS_TOAST } from "../../lib/helpers";
import CustomButton from "../../components/UI/CustomButton";
import PreviewImage from "../../components/UI/PreviewImage";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import InputFile from "../../components/Input/FileInput";
import useFetch from "../../hooks/use-fetch";
import Card from "../../components/UI/Card";

const NewCategory = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { state: prevState } = useLocation();
  const { isLoading, error, fetchAPI: sendData } = useFetch();
  const [Imagepreview, setImagePreview] = useState(
    prevState ? `${FILE_URL}${prevState?.image}` : null
  );

  const formSubmitHandler = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const requestOptions = {
      method: !prevState ? "POST" : "PUT",
      body: formData,
    };

    const url = `${CATEGORY_URL}/${prevState ? prevState.id : ""}`;
    await sendData(url, requestOptions);

    if (error) {
      toast(FAILED_TOAST);
      return;
    }

    toast(SUCCESS_TOAST);

    actions.resetForm();
    setImagePreview(null);
    if (prevState) navigate(-1);
  };

  const initials = {
    titleAr: prevState?.titleAr || "",
    titleEn: prevState?.titleEn || "",
    image: prevState?.image || "",
  };

  return (
    <Box>
      <CardHeader title={prevState ? "Edit Category" : "Add New Category"} />

      <Card maxH="70vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          {({ setFieldValue }) => (
            <Form>
              <Flex gap={10}>
                <PreviewImage image={Imagepreview} />

                <VStack minW="350px" spacing="4" align="start">
                  <InputFile
                    name="image"
                    label="Image"
                    validate={IMAGE_FILE}
                    onChange={(event) => {
                      setFieldValue("image", event.target.files[0]);
                      setImagePreview(
                        event.target.files[0]
                          ? URL.createObjectURL(event.target.files[0])
                          : null
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
