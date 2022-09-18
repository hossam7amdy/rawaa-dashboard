import { Td, Th, Tr, Image } from "@chakra-ui/react";

import { FILE_URL, CUSTOMERS_URL } from "../../lib/urls";
import { useEffect, useState } from "react";
import TableBox from "../../components/table/TableBox";
import useFetch from "../../hooks/use-fetch";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const { isLoading, error, fetchRequest: getAllCustomers } = useFetch();

  useEffect(() => {
    const getCustomersList = (data) => {
      setCustomers(data);
    };

    getAllCustomers({ url: `${CUSTOMERS_URL}/all` }, getCustomersList);
  }, [getAllCustomers, setCustomers]);

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = customers.map((customer) => (
    <Tr key={customer.id}>
      <Td>{customer.id}</Td>
      <Td>
        <Image
          src={FILE_URL + customer.image}
          alt={customer.image}
          rounded="md"
          boxSize="50px"
        />
      </Td>
    </Tr>
  ));

  return (
    <TableBox
      error={error}
      title={"Customers"}
      bodyRows={bodyRows}
      isLoading={isLoading}
      headerRows={headerRows}
    />
  );
};

export default Customers;
