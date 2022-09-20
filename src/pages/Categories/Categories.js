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

import { FAILED_TOAST, SUCCESS_TOAST } from "../../lib/config";
import { CATEGORY_URL, FILE_URL } from "../../lib/urls";
import useQueryData from "../../hooks/useQueryData";
import CustomButton from "../../components/UI/CustomButton";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";

const Categories = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    isLoading,
    isError,
    error,
    data: categoryList,
    refetch,
  } = useQueryData("categories");

  const editCategoryHandler = (category) => {
    navigate(`/categories/edit/${category.id}`, { state: category });
  };

  const deleteCategoryHandler = async () => {
    const config = {
      url: `${CATEGORY_URL}/${categoryId}`,
      method: "delete",
    };

    try {
      await axios(config);
      refetch();
      toast(SUCCESS_TOAST);
    } catch (err) {
      toast(FAILED_TOAST);
    }
  };

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>title EN</Th>
      <Th>title AR</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = categoryList?.map((category, idx) => (
    <Tr key={idx}>
      <Td>{category.id}</Td>
      <Td>
        <Image
          src={FILE_URL + category.image}
          alt={category.image}
          borderRadius="md"
          boxSize="50px"
        />
      </Td>
      <Td>{category.titleEn}</Td>
      <Td>{category.titleAr}</Td>
      <Td>
        <HStack>
          <CustomButton
            name="Edit"
            size="xs"
            variant="outline"
            colorScheme="yellow"
            onClick={editCategoryHandler.bind(null, category)}
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
      </Td>
    </Tr>
  ));

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
        bodyRows={bodyRows}
        title={"Categories"}
        isLoading={isLoading}
        headerRows={headerRows}
        error={isError && error.message}
      />
    </>
  );
};

export default Categories;
