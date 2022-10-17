import { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";

import {
  DATE_FORMATER,
  CURRENCY_FORMATER,
  FORMATE_TABLE_HEADER,
} from "../../utils/helpers";
import { usePaginatedQueries } from "../../hooks/usePaginatedQueries";
import { OrderContentModal } from "./OrderContentModal";
import { DetailsModal } from "./DetailsModal";
import { Pagination } from "./Pagination";
import CustomButton from "../../components/Button/CustomButton";
import { State } from "./State";
import TableBox from "../../components/table/TableBox";

// defaults
const day = 30;

const calcTotalAmount = (order) => {
  const total = order.total + order.deliveryFee;

  return CURRENCY_FORMATER(total);
};

const Orders = () => {
  // handle modal data
  const [modalData, setModalData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenOrder,
    onOpen: onOpenOrder,
    onClose: onCloseOrder,
  } = useDisclosure();

  const [orderId, setOrderId] = useState(null);

  // handle query data
  const [paginationValues, setPaginationValues] = useState();
  const { isLoading, data: orders } = usePaginatedQueries({
    ...paginationValues,
    day,
    key: "orders",
  });

  // table data
  const headerContent = [
    "id",
    "number",
    "customer",
    "delivery address",
    "date/time",
    "total-amount",
    "state",
  ];
  const header = FORMATE_TABLE_HEADER(headerContent);

  const data = orders?.map((order) => {
    return {
      id: order.id,
      number: (
        <CustomButton
          size="sm"
          variant="link"
          colorScheme="blue"
          name={order.orderNumber}
          onClick={() => {
            setOrderId(order.id);
            onOpenOrder();
          }}
        />
      ),
      customer: (
        <CustomButton
          size="sm"
          variant="link"
          colorScheme="blue"
          name={order.customer.fullName}
          onClick={() => {
            onOpen();
            setModalData({ header: "Customer Details", data: order.customer });
          }}
        />
      ),
      "delivery address": (
        <CustomButton
          size="sm"
          variant="link"
          colorScheme="blue"
          name={order.deliveryAddress.city}
          onClick={() => {
            setModalData({
              header: "Delivery Address",
              data: order.deliveryAddress,
            });
            onOpen();
          }}
        />
      ),
      state: <State order={order} />,
      "date/time": DATE_FORMATER(order.orderDate),
      "total-amount": calcTotalAmount(order),
    };
  });

  return (
    <Flex minW="full" flexDir="column" gap={2}>
      <DetailsModal
        modalData={modalData || {}}
        onClose={onClose}
        isOpen={isOpen}
      />
      <OrderContentModal
        orderId={orderId}
        onClose={onCloseOrder}
        isOpen={isOpenOrder}
      />

      {/* table contents */}
      <TableBox
        columns={header}
        title={"orders"}
        data={data || []}
        isLoading={isLoading}
      />

      {/* pagination */}
      <Pagination
        length={orders?.length || 0}
        setPaginationValues={setPaginationValues}
      />
    </Flex>
  );
};

export default Orders;
