import { useContext, useEffect, useState } from "react";
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
import { CategoryContext } from "../../store/category";
import CustomButton from "../../components/UI/CustomButton";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";
import useFetch from "../../hooks/use-fetch";

const Categories = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isLoading, error, fetchRequest } = useFetch();
  const { categoryList, getCategoryList, deleteCategory } =
    useContext(CategoryContext);

  useEffect(() => {
    fetchRequest({ url: `${CATEGORY_URL}/all` }, getCategoryList);
    // eslint-disable-next-line
  }, [fetchRequest]);

  const editCategoryHandler = (category) => {
    navigate(`/categories/edit/${category.id}`, { state: category });
  };

  const deleteCategoryHandler = async () => {
    const applyDelete = (data) => {
      deleteCategory(data.id);
    };

    await fetchRequest(
      {
        url: `${CATEGORY_URL}/${categoryId}`,
        requestOptions: {
          method: "DELETE",
        },
      },
      applyDelete
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
      <Th>title EN</Th>
      <Th>title AR</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = categoryList.map((category) => (
    <Tr key={category.id}>
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
        error={error}
        hasButton={true}
        bodyRows={bodyRows}
        title={"Categories"}
        isLoading={isLoading}
        headerRows={headerRows}
      />
    </>
  );
};

export default Categories;
