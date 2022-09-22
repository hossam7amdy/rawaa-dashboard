import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, HStack, useDisclosure } from "@chakra-ui/react";

import useMutateData from "../../hooks/useMutateData";
import useQueryData from "../../hooks/useQueryData";
import CustomButton from "../../components/UI/CustomButton";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../utils/config";
import { createColumnHelper } from "@tanstack/react-table";

const Products = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState();
  const { mutate } = useMutateData("products");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isLoading, data: products } = useQueryData("products");

  const deleteProductHandler = () => {
    mutate({ url: `${PATH.PRODUCT}/${productId}`, method: "delete" });
  };

  const columnHelper = createColumnHelper();
  const header = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("image", {
      cell: (info) => info.getValue(),
      header: "image",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: "title",
    }),
    columnHelper.accessor("small-price", {
      cell: (info) => info.getValue(),
      header: "small-price",
    }),
    columnHelper.accessor("medium-price", {
      cell: (info) => info.getValue(),
      header: "medium-price",
    }),
    columnHelper.accessor("large-price", {
      cell: (info) => info.getValue(),
      header: "large-price",
    }),
    columnHelper.accessor("discount", {
      cell: (info) => info.getValue(),
      header: "discount",
    }),
    columnHelper.accessor("calories", {
      cell: (info) => info.getValue(),
      header: "calories",
    }),
    columnHelper.accessor("tastes", {
      cell: (info) => info.getValue(),
      header: "tastes",
    }),
    columnHelper.accessor("actions", {
      cell: (info) => info.getValue(),
      header: "actions",
    }),
  ];

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
        <Image
          rounded="md"
          boxSize="50px"
          alt={product.image}
          src={PATH.FILE + product.image}
        />
      ),
      actions: (
        <HStack>
          <CustomButton
            name="View"
            size="xs"
            variant="outline"
            colorScheme="green"
            onClick={() => navigate(`${product.id}`, { state: product })}
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
