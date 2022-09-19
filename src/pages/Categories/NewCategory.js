import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, useToast } from "@chakra-ui/react";

import { ARABIC_WORD, ENGLISH_WORD, IMAGE_FILE } from "../../lib/validations";
import { FAILED_TOAST, SUCCESS_TOAST } from "../../lib/config";
import { CATEGORY_URL, FILE_URL } from "../../lib/urls";
import { CategoryContext } from "../../store/category";
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
  const { isLoading, error, fetchRequest: sendData } = useFetch();
  const { addNewCategory, editCategory } = useContext(CategoryContext);
  const [Imagepreview, setImagePreview] = useState(
    prevState ? `${FILE_URL}${prevState?.image}` : null
  );

  const submitNewCategory = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    await sendData({ url: CATEGORY_URL, requestOptions }, addNewCategory);

    if (error) {
      toast(FAILED_TOAST);
      return;
    }

    toast(SUCCESS_TOAST);

    actions.resetForm();
    setImagePreview(null);
  };

  // Handling Image PUT request seperatelly
  const editImageHandler = async (imageFile) => {
    if (!prevState || IMAGE_FILE(imageFile)) return;

    const formImage = new FormData();
    formImage.append("image", imageFile);

    try {
      const response = await fetch(`${CATEGORY_URL}/image/${prevState.id}`, {
        method: "PUT",
        body: formImage,
      });

      const data = await response.json();
      editCategory(data);
    } catch (err) {
      console.error(`💥💥${err}`);
      toast(FAILED_TOAST);
    }
  };

  const submitEditCategory = async (values) => {
    // rest values request
    const formValues = new FormData();
    for (const key in values) {
      if (key !== "image") {
        formValues.append(key, values[key]);
      }
    }

    await sendData(
      {
        url: `${CATEGORY_URL}/${prevState.id}`,
        requestOptions: {
          method: "PUT",
          body: formValues,
        },
      },
      editCategory
    );

    if (error) {
      toast(FAILED_TOAST);
      return;
    }

    toast(SUCCESS_TOAST);
    navigate(-1);
  };

  const formSubmitHandler = async (values, actions) => {
    if (!prevState) {
      submitNewCategory(values, actions);
    } else {
      submitEditCategory(values);
    }
  };

  const initials = {
    image: prevState?.image || "",
    titleAr: prevState?.titleAr || "",
    titleEn: prevState?.titleEn || "",
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
                      editImageHandler(event.target.files[0]);
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
