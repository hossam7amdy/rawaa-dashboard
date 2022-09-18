import { useEffect, useState } from "react";
import { Td, Th, Tr, HStack } from "@chakra-ui/react";

import { RESTAURANT_URL } from "../../lib/urls";
import TableBox from "../../components/table/TableBox";
import useFetch from "../../hooks/use-fetch";
import RestaurantState from "../../components/restaurant/RestaurantState";
import CustomButton from "../../components/UI/CustomButton";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { isLoading, error, fetchRequest } = useFetch();

  useEffect(() => {
    const applyRestaurants = (data) => {
      setRestaurants(data);
    };

    fetchRequest({ url: `${RESTAURANT_URL}/all` }, applyRestaurants);
  }, [fetchRequest]);

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

  const bodyRows = restaurants.map((branch) => (
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
      title={"Restaurants"}
      headerRows={headerRows}
      bodyRows={bodyRows}
      isLoading={isLoading}
      hasButton={true}
      error={error}
    />
  );
};

export default Restaurants;
