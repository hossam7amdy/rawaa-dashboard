import { Td, Th, Tr, Image, HStack, useToast } from "@chakra-ui/react";

import useFetch from "../../hooks/use-fetch";
import TableBox from "../../components/table/TableBox";
import CustomButton from "../../components/UI/CustomButton";
import { BASE_URL, FAILED_TOAST, SUCCESS_TOAST } from "../../lib/helpers";

// TODO enumrate away
const url = `${BASE_URL}/ar/api/cp/category/`;

const Categories = () => {
  const {
    isLoading,
    error,
    data: tableData,
    fetchAPI: deleteRequest,
  } = useFetch(url + "all");
  const toast = useToast();

  const editCategoryHandler = (category) => {
    console.log(category);
  };

  const deleteCategoryHandler = async (id) => {
    await deleteRequest(url + id, {
      id,
      method: "DELETE",
    });

    if (error) {
      toast(FAILED_TOAST);
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

  const bodyRows = tableData.map((row) => (
    <Tr key={row.id}>
      <Td>{row.id}</Td>
      <Td>
        <Image
          src={`${BASE_URL}/api/file/${row.image}`}
          alt={row.image}
          borderRadius="md"
          boxSize="50px"
        />
      </Td>
      <Td>{row.titleEn}</Td>
      <Td>{row.titleAr}</Td>
      <Td>
        <HStack>
          <CustomButton
            name="Edit"
            size="xs"
            variant="outline"
            colorScheme="yellow"
            onClick={editCategoryHandler.bind(null, row)}
          />
          <CustomButton
            name="Delete"
            size="xs"
            variant="outline"
            colorScheme="red"
            onClick={deleteCategoryHandler.bind(null, row.id)}
          />
        </HStack>
      </Td>
    </Tr>
  ));

  return (
    <TableBox
      title={"Categories"}
      hasButton={true}
      headerRows={headerRows}
      bodyRows={bodyRows}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Categories;
