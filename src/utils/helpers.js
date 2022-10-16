import { createColumnHelper } from "@tanstack/react-table";

// helpers
export const CURRENCY_FORMATER = (amount) => {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
};

export const DATE_FORMATER = (date) => {
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateFormat = new Date(date);
  return new Intl.DateTimeFormat("en-EG", options).format(dateFormat);
};

export const FORMATE_TABLE_HEADER = (headerContent) => {
  const columnHelper = createColumnHelper();

  return headerContent.map((headerItem) =>
    columnHelper.accessor(headerItem, {
      cell: (info) => info.getValue(),
      header: headerItem,
    })
  );
};
