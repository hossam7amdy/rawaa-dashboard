import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";

import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import TableBox from "../../components/table/TableBox";

const Orders = () => {
  const navigate = useNavigate();
  const { isLoading, data: orders } = useQueryData("orders");

  const columnHelper = createColumnHelper();
  const header = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("number", {
      cell: (info) => info.getValue(),
      header: "number",
    }),
    columnHelper.accessor("customerId", {
      cell: (info) => info.getValue(),
      header: "customerId",
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "status",
    }),
    columnHelper.accessor("actions", {
      cell: (info) => info.getValue(),
      header: "actions",
    }),
  ];

  const data = orders?.map((order) => {
    return {
      ...order,
      actions: (
        <CustomButton
          size="xs"
          name="View"
          variant="outline"
          colorScheme="green"
          onClick={() => navigate(`${order.id}`, { state: order })}
        />
      ),
    };
  });

  return (
    <TableBox
      columns={header}
      title={"orders"}
      data={data || []}
      isLoading={isLoading}
    />
  );
};

export default Orders;
