import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Text,
  Image,
  VStack,
  Select,
  HStack,
  Heading,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

import { GRAY_COLOR } from "../../lib/config";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import QuantityButton from "../../components/Input/QuantityButton";
import { FILE_URL } from "../../lib/urls";
import CustomButton from "../../components/UI/CustomButton";
import useQueryById from "../../hooks/useQueryById";

const calcDiscount = (amount, discount) => {
  const discountAmount = (amount * discount) / 100;
  const amountAfter = amount - discountAmount;
  return amountAfter.toFixed(2);
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { state: product } = useLocation();
  const [chosenPrice, setChosedPrice] = useState(product.smallSizePrice);
  const { isLoading, data: category } = useQueryById({
    key: "categories",
    id: product.categoryId,
  });

  const editProductHandler = () => {
    navigate(`/products/edit/${productId}`, { state: product });
  };

  if (isLoading) {
    return (
      <HStack h="50vh">
        <LoadingSpinner />
      </HStack>
    );
  }

  return (
    <HStack h="75vh" spacing={5}>
      <VStack align="start" spacing={6}>
        <Text
          fontWeight="semibold"
          textTransform="uppercase"
          color={GRAY_COLOR}
        >
          {category?.titleEn}
        </Text>
        <Heading marginBottom={6}>{product.titleEn}</Heading>

        <HStack>
          <Text as={product?.discountValue ? "del" : "b"} fontSize="md">
            ${chosenPrice.toFixed(2)}
          </Text>
          {product?.discountValue && (
            <Text as="b" fontSize="md">
              ${calcDiscount(chosenPrice, product?.discountValue)}
            </Text>
          )}
        </HStack>

        <VStack w="full" align="start" spacing={-2}>
          <FormLabel fontSize={12}>Size</FormLabel>
          <FormControl>
            <Select onChange={(event) => setChosedPrice(+event.target.value)}>
              <option value={product.smallSizePrice}>Small</option>
              {product?.mediumSizePrice && (
                <option value={product.mediumSizePrice}>Medium</option>
              )}
              {product?.bigSizePrice && (
                <option value={product.bigSizePrice}>Large</option>
              )}
            </Select>
          </FormControl>
        </VStack>

        <VStack align="start" spacing={-2}>
          <FormLabel fontSize={12}>Quantity</FormLabel>
          <QuantityButton defaultValue={1} min={1} max={15} />
        </VStack>
        <HStack w="full">
          <CustomButton name="Add to cart" colorScheme="teal" w="70%" />

          <CustomButton
            w="30%"
            name="Edit"
            variant="outline"
            colorScheme="yellow"
            onClick={editProductHandler}
          />
        </HStack>
      </VStack>

      <Image
        shadow="lg"
        rounded="lg"
        boxSize="sm"
        alt={product.titleEn}
        src={FILE_URL + product.image}
        fallbackSrc="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      />
    </HStack>
  );
};

export default ProductDetails;
