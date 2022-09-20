import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Td,
  Th,
  Tr,
  Image,
  HStack,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { FILE_URL, PRODUCT_URL } from "../../lib/urls";
import { FAILED_TOAST } from "../../lib/config";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";

const Products = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [productId, setProductId] = useState();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const {
    error,
    refetch,
    isLoading,
    data: products,
  } = useQueryData("products");

  const viewProductHandler = (product) => {
    navigate(`/products/${product.id}`, { state: product });
  };

  const deleteProductHandler = async () => {
    try {
      const config = {
        url: `${PRODUCT_URL}/${productId}`,
        method: "delete",
      };
      await axios(config);
      refetch();
    } catch (err) {
      toast(FAILED_TOAST);
    }
  };

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>title</Th>
      <Th>small price</Th>
      <Th>medium price</Th>
      <Th>large price</Th>
      <Th>discount</Th>
      <Th>calories</Th>
      <Th>tastes</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = products?.map((product) => (
    <Tr key={product.id}>
      <Td>{product.id}</Td>
      <Td>
        <Image
          rounded="md"
          boxSize="50px"
          alt={product.image}
          src={FILE_URL + product.image}
        />
      </Td>
      <Td>{product.titleEn}</Td>
      <Td>{product.smallSizePrice}L.E</Td>
      <Td>{`${
        product.mediumSizePrice ? product.mediumSizePrice + "L.E" : "-"
      }`}</Td>
      <Td>{`${product.bigSizePrice ? product.bigSizePrice + "L.E" : "-"}`}</Td>
      <Td>{product.discountValue ? product.discountValue + "%" : "-"}</Td>
      <Td>{product.calories ? product.calories : "-"}</Td>
      <Td>{product.hasTaste}</Td>
      <Td>
        <HStack>
          <CustomButton
            name="View"
            size="xs"
            variant="outline"
            colorScheme="green"
            onClick={viewProductHandler.bind(null, product)}
          />
          <CustomButton
            name="Delete"
            size="xs"
            variant="outline"
            colorScheme="red"
            onClick={() => {
              onOpen();
              setProductId(product.id);
            }}
          />
        </HStack>
      </Td>
    </Tr>
  ));

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        header="Delete Category"
        onDelete={deleteProductHandler}
      />
      <TableBox
        error={error?.message}
        hasButton={true}
        title={"Products"}
        bodyRows={bodyRows}
        products={products}
        isLoading={isLoading}
        headerRows={headerRows}
      />
    </>
  );
};

export default Products;
