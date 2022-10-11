import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Flex,
  Text,
  Input,
  HStack,
  Select,
  FormLabel,
  IconButton,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react";

import { CURRENCY_FORMATER, DATE_FORMATER } from "../../utils/config";
import { usePaginatedQueries } from "../../hooks/usePaginatedQueries";
import { OrderDetailsModal } from "../../components/UI/OrderDetailsModal";
import { getIconByName } from "../../utils/IconsFactory";
import { DetailsModal } from "../../components/UI/DetailsModal";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import TableBox from "../../components/table/TableBox";

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

  const setPageNumberHandler = (arrow) => {
    if (arrow === "prev" && pageNumber !== 1) {
      setPageNumber((prev) => prev - 1);
    }
    if (arrow === "next" && !isLast) {
      setPageNumber((prev) => prev + 1);
    }
  };

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
  const columnHelper = createColumnHelper();
  const header = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("orderNumber", {
      cell: (info) => info.getValue(),
      header: "number",
    }),
    columnHelper.accessor("customer", {
      cell: (info) => info.getValue(),
      header: "customer",
    }),
    columnHelper.accessor("deliveryAddress", {
      cell: (info) => info.getValue(),
      header: "delivery address",
    }),
    columnHelper.accessor("dataTime", {
      cell: (info) => info.getValue(),
      header: "date/time",
    }),
    columnHelper.accessor("totalAmount", {
      cell: (info) => info.getValue(),
      header: "total-amount",
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.getValue(),
      header: "state",
    }),
  ];

  // map order states
  const stateOptions = [
    { key: 1, value: "Pending" },
    { key: 2, value: "Processing" },
    { key: 3, value: "Rejected" },
    { key: 4, value: "Completed" },
    { key: 5, value: "Canceled" },
  ];

  const data = orders?.map((order) => {
    return {
      id: order.id,
      orderNumber: (
        <CustomButton
          size="sm"
          variant="link"
          color="blue.400"
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
          color="blue.400"
          name={order.customer.fullName}
          onClick={() => {
            onOpen();
            setModalData({ header: "Customer Details", data: order.customer });
          }}
        />
      ),
      deliveryAddress: (
        <CustomButton
          size="sm"
          variant="link"
          color="blue.400"
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
                  icon={getIconByName("edit")}
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
                {stateOptions.map((option) =>
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
                icon={getIconByName("check")}
                onClick={() => editOrderStateHandler(order)}
              />
              <IconButton
                size="xs"
                icon={getIconByName("close")}
                onClick={() => {
                  setOrderState("");
                  setShowForm(false);
                }}
              />
            </>
          )}
        </HStack>
      ),
      totalAmount: calcTotalAmount(order),
      dataTime: DATE_FORMATER(order.orderDate),
    };
  });

  return (
    <Flex minW="full" flexDir="column" gap={2}>
      {isOpen && (
        <DetailsModal modalData={modalData} onClose={onClose} isOpen={isOpen} />
      )}
      {isOpenOrder && (
        <OrderDetailsModal
          orderId={orderId}
          onClose={onCloseOrder}
          isOpen={isOpenOrder}
        />
      )}
      <TableBox
        columns={header}
        title={"orders"}
        data={data || []}
        isLoading={isLoading}
      />

      <HStack spacing={10}>
        <HStack>
          <IconButton
            icon={getIconByName("arrowLeft")}
            isDisabled={pageNumber === 1}
            onClick={() => setPageNumberHandler("prev")}
          />
          <IconButton
            icon={getIconByName("arrowRight")}
            isDisabled={isLast}
            onClick={() => setPageNumberHandler("next")}
          />
        </HStack>

        <Select
          w="200px"
          value={ordersState}
          onChange={(event) => setOrdersState(+event.target.value)}
        >
          {stateOptions.map((option, idx) => (
            <option key={idx} value={option.key}>
              {option.value}
            </option>
          ))}
        </Select>
        <FormControl w="250px" display="flex" alignItems="center">
          <FormLabel>TableSize</FormLabel>
          <Input
            type="number"
            name="pageSize"
            defaultValue={pageSize}
            onChange={(event) => setPageSize(+event.target.value)}
          />
        </FormControl>
      </HStack>
    </Flex>
  );
};

export default Orders;
