import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import { FORMATE_TABLE_HEADER } from "../../utils/helpers";
import { ActionButtons } from "../../components/Button/ActionButtons";
import useMutateData from "../../hooks/useMutateData";
import useQueryData from "../../hooks/useQueryData";
import PreviewImage from "../../components/UI/PreviewImage";
import DeleteModal from "../../components/Modal/DeleteModal";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../data/constants";

const Products = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState();
  const { mutate } = useMutateData("products");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isLoading, data: products } = useQueryData("products");

  const deleteProductHandler = () => {
    mutate({ url: `${PATH.PRODUCT}/${productId}`, method: "delete" });
  };

  const headerContent = [
    "id",
    "image",
    "title",
    "small-price",
    "medium-price",
    "large-price",
    "discount",
    "calories",
    "tastes",
    "actions",
  ];
  const header = FORMATE_TABLE_HEADER(headerContent);

  const bodyRows = products?.map((product) => {
    return {
      id: product.id,
      title: product.titleEn,
      tastes: product.tastes ? product.tastes : "-",
      "small-price": `${product.smallSizePrice}L.E`,
      calories: product.calories ? product.calories : "-",
      discount: product.discountValue ? product.discountValue + "%" : "-",
      "medium-price": `${
        product.mediumSizePrice ? product.mediumSizePrice + "L.E" : "-"
      }`,
      "large-price": `${
        product.bigSizePrice ? product.bigSizePrice + "L.E" : "-"
      }`,
      image: (
        <PreviewImage
          rounded="md"
          boxSize="50px"
          alt={product.titleEn}
          src={PATH.FILE + product.image}
        />
      ),
      actions: (
        <ActionButtons
          onView={() => navigate(`${product.id}`, { state: product })}
          onDelete={() => {
            onOpen();
            setProductId(product.id);
          }}
        />
      ),
    };
  });

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        header="Delete Category"
        onDelete={deleteProductHandler}
      />
      <TableBox
        columns={header}
        hasButton={true}
        title={"Products"}
        data={bodyRows || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default Products;
