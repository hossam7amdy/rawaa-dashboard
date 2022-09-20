import { Td, Th, Tr, HStack } from "@chakra-ui/react";

import RestaurantState from "../../components/restaurant/RestaurantState";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import TableBox from "../../components/table/TableBox";

const Restaurants = () => {
  const { isLoading, error, data: restaurants } = useQueryData("restaurants");

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>name</Th>
      <Th>city</Th>
      <Th>state</Th>
      <Th>phone</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = restaurants?.map((branch) => (
    <Tr key={branch.id}>
      <Td>{branch.id}</Td>
      <Td>{branch.nameEn}</Td>
      <Td>{branch.city}</Td>
      <Td>
        <RestaurantState state={branch.state} />
      </Td>
      <Td>{branch.phone}</Td>
      <Td>
        <HStack>
          <CustomButton
            name="Edit"
            variant="outline"
            colorScheme="yellow"
            size="xs"
          />
          <CustomButton
            name="Delete"
            variant="outline"
            colorScheme="red"
            size="xs"
          />
        </HStack>
      </Td>
    </Tr>
  ));

  return (
    <TableBox
      hasButton={true}
      bodyRows={bodyRows}
      title={"Restaurants"}
      isLoading={isLoading}
      error={error?.message}
      headerRows={headerRows}
    />
  );
};

export default Restaurants;
