import { useNavigate } from "react-router-dom";
import { Td, Th, Tr, Image, HStack } from "@chakra-ui/react";

import { FILE_API, PRODUCT_API } from "../../lib/api";
import CustomButton from "../../components/UI/CustomButton";
import TableBox from "../../components/table/TableBox";
import useFetch from "../../hooks/use-fetch";

const Products = () => {
  const {
    isLoading,
    error,
    data: tableData,
    fetchAPI: deleteRequest,
  } = useFetch(`${PRODUCT_API}/all`);

  const navigate = useNavigate();

  const viewItemHandler = (id) => {
    navigate(`/products/${id}`);
  };

  const deleteItemHandler = async (id) => {
    await deleteRequest(PRODUCT_API + id, {
      method: "DELETE",
    });
  };

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>title</Th>
      <Th>category</Th>
      <Th>small price</Th>
      <Th>medium price</Th>
      <Th>large price</Th>
      <Th>discount</Th>
      <Th>calories</Th>
      <Th>tastes</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = tableData.map((row) => (
    <Tr key={row.id}>
      <Td>{row.id}</Td>
      <Td>
        <Image
          src={FILE_API + row.image}
          alt={row.image}
          rounded="md"
          boxSize="50px"
        />
      </Td>
      <Td>{row.titleEn}</Td>
      <Td>{row.categoryId}</Td>
      <Td>{row.smallSizePrice}L.E</Td>
      <Td>{row.mediumSizePrice}L.E</Td>
      <Td>{row.bigSizePrice}L.E</Td>
      <Td>{row.discountValue}%</Td>
      <Td>{row.calories}</Td>
      <Td>{row.hasTaste}</Td>
      <Td>
        <HStack>
          <CustomButton
            name="View"
            size="xs"
            variant="outline"
            colorScheme="green"
            onClick={viewItemHandler.bind(null, row.id)}
          />
          <CustomButton
            name="Delete"
            size="xs"
            variant="outline"
            colorScheme="red"
            onClick={deleteItemHandler.bind(null, row.id)}
          />
        </HStack>
      </Td>
    </Tr>
  ));

  return (
    <TableBox
      title={"Products"}
      hasButton={true}
      headerRows={headerRows}
      bodyRows={bodyRows}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Products;
