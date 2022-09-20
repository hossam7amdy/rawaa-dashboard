import axios from "axios";
import { useState } from "react";
import {
  Td,
  Th,
  Tr,
  Text,
  Toast,
  HStack,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { FAILED_TOAST, SUCCESS_TOAST } from "../../lib/config";
import { STAFF_URL } from "../../lib/urls";
import CustomButton from "../../components/UI/CustomButton";
import useQueryData from "../../hooks/useQueryData";
import DeleteModal from "../../components/UI/DeleteModal";
import TableBox from "../../components/table/TableBox";

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
  const toast = useToast();
  const [staffId, setStafftId] = useState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const redColor = useColorModeValue("red.200", "red.400");
  const greenColor = useColorModeValue("green.200", "green.400");
  const { error, isLoading, data: staff, refetch } = useQueryData("staff");

  const toggleStateHandler = async ({ active, ...staff }) => {
    const newActiveState = !active;
    const data = { active: newActiveState, ...staff };

    try {
      const config = {
        url: `${STAFF_URL}/${staff.id}`,
        method: "put",
        data,
      };
      await axios(config);
      toast(SUCCESS_TOAST);
      refetch();
    } catch (error) {
      toast(FAILED_TOAST);
    }
  };

  const deleteStaffHandler = async () => {
    try {
      const config = {
        url: `${STAFF_URL}/${staffId}`,
        method: "delete",
      };
      await axios(config);
      refetch();
    } catch (err) {
      Toast(FAILED_TOAST);
    }
  };

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>username</Th>
      <Th>job</Th>
      <Th>branch</Th>
      <Th>Joined</Th>
      <Th>status</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = staff?.map((emp) => (
    <Tr key={emp.id}>
      <Td>{emp.id}</Td>
      <Td>{emp.userName}</Td>
      <Td>{emp.jop}</Td>
      <Td>{emp.restaurantId}</Td>
      <Td>{formatDate(emp.createOn)}</Td>
      <Td>
        <Text
          rounded="xl"
          w="min-content"
          px={1}
          bg={emp.active ? greenColor : redColor}
        >
          {emp.active ? "Active" : "Inactive"}
        </Text>
      </Td>
      <Td>
        <HStack>
          <CustomButton
            size="xs"
            name="Toggle State"
            variant="outline"
            colorScheme="yellow"
            onClick={toggleStateHandler.bind(null, emp)}
          />
          <CustomButton
            size="xs"
            name="Delete"
            variant="outline"
            colorScheme="red"
            onClick={() => {
              onOpen();
              setStafftId(emp.id);
            }}
          />
        </HStack>
      </Td>
    </Tr>
  ));

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
        bodyRows={bodyRows}
        isLoading={isLoading}
        error={error?.message}
        headerRows={headerRows}
      />
    </>
  );
};

export default Staff;
