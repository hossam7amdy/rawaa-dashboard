import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, HStack, useToast } from "@chakra-ui/react";

import {
  ARABIC_WORD,
  ENGLISH_WORD,
  IMAGE_FILE,
  RANGE_NUMBER,
} from "../../lib/validations";
import { FAILED_TOAST, PENDING_TOAST, SUCCESS_TOAST } from "../../lib/config";
import { FILE_URL, PRODUCT_URL } from "../../lib/urls";
import PreviewImage from "../../components/UI/PreviewImage";
import useQueryData from "../../hooks/useQueryData";
import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CardHeader from "../../components/UI/CardHeader";
import InputFile from "../../components/Input/FileInput";
import Selection from "../../components/Input/Selection";
import Card from "../../components/UI/Card";

const NewProduct = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { state: prevState } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { data: categoryList } = useQueryData("categories");
  const [Imagepreview, setImagePreview] = useState(
    prevState ? `${FILE_URL}${prevState?.image}` : null
  );

  const submitNewProduct = async (values, actions) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      setIsLoading(true);

      const config = {
        url: PRODUCT_URL,
        method: "post",
        data: formData,
      };
      await axios(config);

      toast(SUCCESS_TOAST);
      actions.resetForm();
      setImagePreview(null);
    } catch (err) {
      toast(FAILED_TOAST);
    } finally {
      setIsLoading(false);
    }
  };

  // uploading images seperatelly
  const editImageHandler = async (imageFile) => {
    if (!prevState || IMAGE_FILE(imageFile)) return;

    try {
      toast(PENDING_TOAST);
      const formImage = new FormData();
      formImage.append("image", imageFile);

      const config = {
        url: `${PRODUCT_URL}/image/${prevState.id}`,
        method: "put",
        data: formImage,
      };
      await axios(config);
      toast(SUCCESS_TOAST);
    } catch (err) {
      toast(FAILED_TOAST);
    }
  };

  const submitEditProduct = async (values) => {
    const formValues = new FormData();
    for (const key in values) {
      if (key !== "image") {
        formValues.append(key, values[key]);
      }
    }

    try {
      setIsLoading(true);

      const config = {
        url: `${PRODUCT_URL}/${prevState.id}`,
        method: "put",
        data: formValues,
      };

      await axios(config);

      toast(SUCCESS_TOAST);
      navigate(-2);
    } catch (err) {
      toast(FAILED_TOAST);
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmitHandler = (values, actions) => {
    if (prevState) {
      submitEditProduct(values);
    } else {
      submitNewProduct(values, actions);
    }
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
                    validate={ARABIC_WORD}
                  />
                  <CustomInput
                    type="text"
                    name="titleEn"
                    placeholder="Pepperoni"
                    label="Title in English"
                    validate={ENGLISH_WORD}
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
                    name={
                      !isLoading &&
                      (!prevState ? "Add Product" : "Edit Product")
                    }
                  />
                </VStack>
              </Flex>
            </Form>
          )}
        </Formik>
        {/* )} */}
      </Card>
    </Box>
  );
};

export default NewProduct;
