import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Image, HStack, useDisclosure } from "@chakra-ui/react";

import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../utils/config";

const Categories = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const { mutate } = useMutateData("categories");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isLoading, data: categories } = useQueryData("categories");

  const deleteCategoryHandler = () => {
    mutate({ url: `${PATH.CATEGORY}/${categoryId}`, method: "delete" });
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
    columnHelper.accessor("titleEn", {
      cell: (info) => info.getValue(),
      header: "title-en",
    }),
    columnHelper.accessor("titleAr", {
      cell: (info) => info.getValue(),
      header: "title-ar",
    }),
    columnHelper.accessor("actions", {
      cell: (info) => info.getValue(),
      header: "actions",
    }),
  ];

  const data = categories?.map(({ image, ...category }) => {
    return {
      image: (
        <Image
          src={PATH.FILE + image}
          alt={image}
          borderRadius="md"
          boxSize="50px"
        />
      ),
      actions: (
        <HStack>
          <CustomButton
            name="View"
            size="xs"
            variant="outline"
            colorScheme="green"
            onClick={() =>
              navigate(`${category.id}`, { state: { image, ...category } })
            }
          />
          <CustomButton
            name="Delete"
            size="xs"
            variant="outline"
            colorScheme="red"
            onClick={() => {
              onOpen();
              setCategoryId(category.id);
            }}
          />
        </HStack>
      ),
      ...category,
    };
  });

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        header="Delete Category"
        onDelete={deleteCategoryHandler}
      />
      <TableBox
        hasButton={true}
        title={"Categories"}
        isLoading={isLoading}
        columns={header}
        data={data || []}
      />
    </>
  );
};

export default Categories;
