import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import RestaurantState from "../../components/restaurant/RestaurantState";
import useMutateData from "../../hooks/useMutateData";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../utils/config";

const Restaurants = () => {
  const navigate = useNavigate();
  const { mutate } = useMutateData("restaurants");
  const [restaurantId, setRestaurantId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data: restaurants } = useQueryData("restaurants");

  const deleteRestaurantHandler = () => {
    const config = {
      method: "delete",
      url: `${PATH.RESTAURANT}/${restaurantId}`,
    };
    mutate(config);
  };

  const columnHelper = createColumnHelper();
  const header = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "name",
    }),
    columnHelper.accessor("city", {
      cell: (info) => info.getValue(),
      header: "city",
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.getValue(),
      header: "state",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "phone",
    }),
    columnHelper.accessor("actions", {
      cell: (info) => info.getValue(),
      header: "actions",
    }),
  ];

  const data = restaurants?.map(({ state, nameEn, ...branch }) => {
    return {
      ...branch,
      name: nameEn,
      state: <RestaurantState state={state} />,
      actions: (
        <HStack>
          <CustomButton
            size="xs"
            name="View"
            variant="outline"
            colorScheme="green"
            onClick={() =>
              navigate(`${branch.id}`, { state: { state, nameEn, ...branch } })
            }
          />
          <CustomButton
            size="xs"
            name="Delete"
            variant="outline"
            colorScheme="red"
            onClick={() => {
              onOpen();
              setRestaurantId(branch.id);
            }}
          />
        </HStack>
      ),
    };
  });

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        header="Delete Restaurant"
        onDelete={deleteRestaurantHandler}
      />
      <TableBox
        hasButton={true}
        columns={header}
        data={data || []}
        title={"Restaurants"}
        isLoading={isLoading}
      />
    </>
  );
};

export default Restaurants;
