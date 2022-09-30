import { useState } from "react";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, HStack, VStack } from "@chakra-ui/react";

import { ARABIC_TEXT, ENGLISH_TEXT, IMAGE_FILE } from "../../utils/validations";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import InputFile from "../../components/Input/FileInput";
import { PATH } from "../../utils/config";
import Card from "../../components/UI/Card";

const NewCategory = () => {
  const navigate = useNavigate();
  const { state: prevState } = useLocation();
  const { isLoading, mutate } = useMutateData("categories");
  const [Imagepreview, setImagePreview] = useState(
    prevState ? `${PATH.FILE}${prevState?.image}` : null
  );

  const submitNewCategory = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    mutate({ method: "post", data: formData });
  };

  // Image request seperatelly
  const editImageHandler = (imageFile) => {
    if (!prevState || IMAGE_FILE(imageFile)) return;

    const formImage = new FormData();
    formImage.append("image", imageFile);

    const config = {
      url: `${PATH.CATEGORY}/image/${prevState.id}`,
      method: "put",
      data: formImage,
    };
    mutate(config);
  };

  const editCategoryHandler = (values) => {
    const formValues = new FormData();
    for (const key in values) {
      if (key !== "image") {
        formValues.append(key, values[key]);
      }
    }

    const config = {
      url: `${PATH.CATEGORY}/${prevState.id}`,
      method: "put",
      data: formValues,
    };
    mutate(config, {
      onSuccess: () => navigate(-1),
    });
  };

  const formSubmitHandler = (values, actions) => {
    if (!prevState) {
      submitNewCategory(values);
    } else {
      editCategoryHandler(values);
    }
    actions.resetForm();
    setImagePreview(null);
  };

  const initials = {
    image: prevState?.image || "",
    titleAr: prevState?.titleAr || "",
    titleEn: prevState?.titleEn || "",
  };

  return (
    <Container>
      <CardHeader title={prevState ? "Edit Category" : "Add New Category"} />

      <Card maxH="75vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          {({ setFieldValue }) => (
            <Form>
              <HStack align="start" spacing={4}>
                <InputFile
                  name="image"
                  label={Imagepreview}
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
                <VStack align="start" spacing={4} w="full">
                  <CustomInput
                    type="text"
                    name="titleAr"
                    validate={ARABIC_TEXT}
                    label="Category in Arabic"
                    placeholder="Enter category name in arabic"
                  />
                  <CustomInput
                    type="text"
                    name="titleEn"
                    validate={ENGLISH_TEXT}
                    label="Category in English"
                    placeholder="Enter category name in english"
                  />
                  <CustomButton
                    type="submit"
                    colorScheme="teal"
                    isLoading={isLoading}
                    loadingText="Submitting"
                    name={!prevState ? "Add Category" : "Edit Category"}
                  />
                </VStack>
              </HStack>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default NewCategory;
