import {
  Flex,
  Text,
  HStack,
  Select,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  DATE_FORMATER,
  CURRENCY_FORMATER,
  FORMATE_TABLE_HEADER,
} from "../../utils/helpers";
import { usePaginatedQueries } from "../../hooks/usePaginatedQueries";
import { OrderContentModal } from "./OrderContentModal";
import { DetailsModal } from "./DetailsModal";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import TableBox from "../../components/table/TableBox";
import { Icon } from "../../components/UI/Icons";

import { PageNumberInput } from "./PageNumberInput";
import { PageSizeInput } from "./PageSizeInput";
import { StateSelector } from "./StatusSelector";
import { ORDER_STATES } from "../../data/constants";

// defaults
const day = 30;

const calcTotalAmount = (order) => {
  const total = order.total + order.deliveryFee;

  return CURRENCY_FORMATER(total);
};

const statusText = {
  1: "Pending",
  2: "Processing",
  3: "Rejected",
  4: "Completed",
  5: "Canceled",
};
const statusColor = {
  1: "orange.400",
  2: "teal.400",
  3: "red.400",
  4: "green.400",
  5: "gray.400",
};

const Orders = () => {
  // handle order state
  const { mutate } = useMutateData("orders");
  const [showForm, setShowForm] = useState(false);
  const [orderState, setOrderState] = useState("");

  // handle modal data
  const [modalData, setModalData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenOrder,
    onOpen: onOpenOrder,
    onClose: onCloseOrder,
  } = useDisclosure();

  // handle query data
  const [orderId, setOrderId] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [ordersState, setOrdersState] = useState(1);
  const { isLoading, data: orders } = usePaginatedQueries({
    day,
    pageSize,
    key: "orders",
    page: pageNumber,
    state: ordersState,
  });

  const isLast = orders && orders?.length < pageSize;

  const editOrderStateHandler = ({ orderStatus, ...order }) => {
    if (!orderState) return;
    if (orderState !== orderStatus) {
      const config = {
        method: "put",
        data: {
          ...order,
          orderStatus: orderState,
        },
      };
      mutate(config);
    }
    setOrderState("");
    setShowForm(false);
  };

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
      state: (
        <HStack>
          {!showForm && (
            <>
              <Text as="b" color={statusColor[order.orderStatus]}>
                {statusText[order.orderStatus]}
              </Text>
              {[1, 2].includes(order.orderStatus) && (
                <IconButton
                  size="xs"
                  icon={<Icon name="edit" />}
                  onClick={() => setShowForm(true)}
                />
              )}
            </>
          )}
          {showForm && (
            <>
              <Select
                size="xs"
                placeholder="select status"
                value={orderState}
                onChange={(event) => setOrderState(+event.target.value)}
              >
                {ORDER_STATES.map((option) =>
                  option.key > order.orderStatus && option.key !== 5 ? (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ) : (
                    ""
                  )
                )}
              </Select>
              <IconButton
                size="xs"
                icon={<Icon name="check" />}
                onClick={() => editOrderStateHandler(order)}
              />
              <IconButton
                size="xs"
                icon={<Icon name="close" />}
                onClick={() => {
                  setOrderState("");
                  setShowForm(false);
                }}
              />
            </>
          )}
        </HStack>
      ),
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
      <HStack spacing={10}>
        <PageNumberInput
          isLast={isLast}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        <PageSizeInput pageSize={pageSize} setPageSize={setPageSize} />
        <StateSelector
          ordersState={ordersState}
          setOrdersState={setOrdersState}
        />
      </HStack>
    </Flex>
  );
};

export default Orders;
