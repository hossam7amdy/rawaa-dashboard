import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HStack, useDisclosure } from "@chakra-ui/react";

import { FORMATE_TABLE_HEADER } from "../../utils/helpers";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import PreviewImage from "../../components/UI/PreviewImage";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../data/constants";

const Categories = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const { mutate } = useMutateData("categories");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isLoading, data: categories } = useQueryData("categories");

  const deleteCategoryHandler = () => {
    mutate({ url: `${PATH.CATEGORY}/${categoryId}`, method: "delete" });
  };

  const headerContent = ["id", "image", "titleEn", "titleAr", "actions"];
  const header = FORMATE_TABLE_HEADER(headerContent);

  const data = categories?.map(({ image, ...category }) => {
    return {
      image: (
        <PreviewImage src={PATH.FILE + image} boxSize="50px" rounded="md" />
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
