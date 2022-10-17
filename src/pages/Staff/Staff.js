import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import { FORMATE_TABLE_HEADER } from "../../utils/helpers";
import { ActionButtons } from "../../components/Button/ActionButtons";
import useMutateData from "../../hooks/useMutateData";
import useQueryData from "../../hooks/useQueryData";
import DeleteModal from "../../components/Modal/DeleteModal";
import { State } from "./State";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../data/constants";

// Helper Method
const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const days = calcDaysPassed(new Date(date), new Date());

  if (days === 0) return `Today`;
  else if (days === 1) return `Yesterday`;
  else if (days <= 7) return `${days} Days Ago`;

  const toDate = new Date(date);
  return `${new Intl.DateTimeFormat(locale).format(toDate)}`;
};

const Staff = () => {
  const navigate = useNavigate();
  const { mutate } = useMutateData("staff");
  const [staffId, setStafftId] = useState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isLoading, data: staff } = useQueryData("staff");

  const deleteStaffHandler = () => {
    mutate({ method: "delete", url: `${PATH.STAFF}/${staffId}` });
  };

  const headerContent = [
    "id",
    "username",
    "job",
    "branch-id",
    "joined",
    "status",
    "actions",
  ];
  const header = FORMATE_TABLE_HEADER(headerContent);

  const data = staff?.map((emp) => {
    return {
      id: emp.id,
      username: emp.userName,
      job: emp.jop,
      "branch-id": emp.restaurantId,
      joined: formatDate(emp.createOn),
      status: <State isActive={emp.active} />,
      actions: (
        <ActionButtons
          onView={() => navigate(`${emp.id}`, { state: emp })}
          onDelete={() => {
            onOpen();
            setStafftId(emp.id);
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
        header="Delete Staff"
        onDelete={deleteStaffHandler}
      />
      <TableBox
        title={"Staff"}
        hasButton={true}
        columns={header}
        data={data || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default Staff;
