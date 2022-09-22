import { useState } from "react";
import { Formik, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, HStack } from "@chakra-ui/react";

import {
  ARABIC_TEXT,
  ENGLISH_TEXT,
  IMAGE_FILE,
  RANGE_NUMBER,
} from "../../utils/validations";
import useMutateData from "../../hooks/useMutateData";
import PreviewImage from "../../components/UI/PreviewImage";
import useQueryData from "../../hooks/useQueryData";
import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import InputFile from "../../components/Input/FileInput";
import Selection from "../../components/Input/Selection";
import { PATH } from "../../utils/config";
import Card from "../../components/UI/Card";

const NewProduct = () => {
  const navigate = useNavigate();
  const { state: prevState } = useLocation();
  const { isLoading, mutate } = useMutateData("products");
  const { data: categoryList } = useQueryData("categories");
  const [Imagepreview, setImagePreview] = useState(
    prevState ? `${PATH.FILE}${prevState?.image}` : null
  );

  const submitNewProduct = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    mutate({ method: "post", data: formData });
  };

  // uploading images seperatelly
  const editImageHandler = (imageFile) => {
    if (!prevState || IMAGE_FILE(imageFile)) return;

    const formImage = new FormData();
    formImage.append("image", imageFile);

    const config = {
      url: `${PATH.PRODUCT}/image/${prevState.id}`,
      method: "put",
      data: formImage,
    };

    mutate(config);
  };

  const submitEditProduct = (values) => {
    const formValues = new FormData();
    for (const key in values) {
      if (key !== "image") {
        formValues.append(key, values[key]);
      }
    }

    const config = {
      url: `${PATH.PRODUCT}/${prevState.id}`,
      method: "put",
      data: formValues,
    };

    mutate(config, {
      onSuccess: () => navigate(-2),
    });
  };

  const formSubmitHandler = (values, actions) => {
    if (prevState) {
      submitEditProduct(values);
    } else {
      submitNewProduct(values);
    }
    actions.resetForm();
    setImagePreview(null);
  };

  const initials = {
    image: prevState?.image || "",
    titleAr: prevState?.titleAr || "",
    titleEn: prevState?.titleEn || "",
    hasTaste: prevState?.hasTaste || "",
    calories: prevState?.calories || "",
    categoryId: prevState?.categoryId || "",
    bigSizePrice: prevState?.bigSizePrice || "",
    discountValue: prevState?.discountValue || "",
    smallSizePrice: prevState?.smallSizePrice || "",
    mediumSizePrice: prevState?.mediumSizePrice || "",
  };

  return (
    <Box>
      <CardHeader title={prevState ? "Edit Product" : "Add New Product"} />

      <Card maxH="70vh">
        <Formik initialValues={initials} onSubmit={formSubmitHandler}>
          {({ setFieldValue }) => (
            <Form>
              <Flex gap={10}>
                <PreviewImage image={Imagepreview} />

                <VStack minW="350px" spacing={4} align="start">
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
                    placeholder="بيبروني"
                    label="Title in Arabic"
                    validate={ARABIC_TEXT}
                  />
                  <CustomInput
                    type="text"
                    name="titleEn"
                    placeholder="Pepperoni"
                    label="Title in English"
                    validate={ENGLISH_TEXT}
                  />
                  <Selection
                    name="categoryId"
                    label="Select a category"
                    placeholder="select an option"
                    options={categoryList?.map((category) => {
                      return { key: category.id, value: category.titleEn };
                    })}
                  />
                  <CustomInput
                    type="number"
                    name="calories"
                    label="Calories"
                    placeholder="500"
                    validate={(value) => RANGE_NUMBER(value, 0, 1500)}
                  />
                  <CustomInput
                    type="number"
                    name="hasTaste"
                    placeholder="3"
                    label="Number of tastes"
                    validate={(value) => RANGE_NUMBER(value, 1, 3)}
                  />
                  <CustomInput
                    type="number"
                    placeholder="23%"
                    name="discountValue"
                    label="Discount value"
                    validate={(value) => RANGE_NUMBER(value, 0, 99)}
                  />
                  <HStack spacing={4}>
                    <CustomInput
                      type="number"
                      placeholder="10"
                      label="Small price"
                      name="smallSizePrice"
                      validate={(value) => RANGE_NUMBER(value, 1, 999)}
                    />
                    <CustomInput
                      type="number"
                      placeholder="20"
                      label="Medium price"
                      name="mediumSizePrice"
                      validate={(value) => RANGE_NUMBER(value, 0, 999)}
                    />
                    <CustomInput
                      type="number"
                      placeholder="30"
                      name="bigSizePrice"
                      label="Large price"
                      validate={(value) => RANGE_NUMBER(value, 0, 999)}
                    />
                  </HStack>
                  <CustomButton
                    type="submit"
                    colorScheme="teal"
                    isDisabled={isLoading}
                    name={!prevState ? "Add Product" : "Edit Product"}
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

export default NewProduct;
