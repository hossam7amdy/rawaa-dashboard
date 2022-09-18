import { useEffect, useState } from "react";
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
import CustomButton from "../../components/UI/CustomButton";
import useFetch from "../../hooks/use-fetch";
import TableBox from "../../components/table/TableBox";
import { FAILED_TOAST, SUCCESS_TOAST } from "../../lib/config";
import DeleteModal from "../../components/UI/DeleteModal";

const Products = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { error, isLoading, fetchRequest } = useFetch();

  useEffect(() => {
    const getProductList = (data) => {
      setProducts(data);
    };

    fetchRequest({ url: `${PRODUCT_URL}/all` }, getProductList);
  }, [fetchRequest]);

  const viewProductHandler = (product) => {
    navigate(`/products/${product.id}`, { state: product });
  };

  const deleteProductHandler = async () => {
    const deleteProduct = (dataObj) => {
      setProducts((prevState) =>
        prevState.filter((item) => item.id !== dataObj.id)
      );
    };

    await fetchRequest(
      {
        url: `${PRODUCT_URL}/${productId}`,
        requestOptions: {
          method: "DELETE",
        },
      },
      deleteProduct
    );

    if (error) {
      toast(FAILED_TOAST);
      return;
    }

    if (!error && !isLoading) {
      toast(SUCCESS_TOAST);
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

  const bodyRows = products.map((product) => (
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
        error={error}
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
