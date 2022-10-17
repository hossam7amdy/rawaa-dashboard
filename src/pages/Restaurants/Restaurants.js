import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import { FORMATE_TABLE_HEADER } from "../../utils/helpers";
import { ActionButtons } from "../../components/Button/ActionButtons";
import useMutateData from "../../hooks/useMutateData";
import useQueryData from "../../hooks/useQueryData";
import DeleteModal from "../../components/Modal/DeleteModal";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../data/constants";
import State from "./State";

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

  const headerContent = ["id", "name", "city", "state", "phone", "actions"];
  const header = FORMATE_TABLE_HEADER(headerContent);

  const data = restaurants?.map(({ state, nameEn, ...branch }) => {
    return {
      ...branch,
      name: nameEn,
      state: <State state={state} />,
      actions: (
        <ActionButtons
          onView={() =>
            navigate(`${branch.id}`, { state: { state, nameEn, ...branch } })
          }
          onDelete={() => {
            onOpen();
            setRestaurantId(branch.id);
          }}
        />
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
