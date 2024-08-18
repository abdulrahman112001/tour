import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { indexTable } from "../../../utils/helpers";
import { t } from "i18next";
import DropDown from "../../molecules/DropDown/DropDown";
import DeleteMain from "./DeleteMain";
import UpdateIcon from "../../molecules/UpdateIcon";

type RefetchFunction = () => void;
type setMainDataFunction = React.Dispatch<React.SetStateAction<boolean>>;
type SetCountryDataFunction = React.Dispatch<React.SetStateAction<any>>; // Adjust 'any' to your specific type

export const generateColumns = (
  page: number,
  refetch: RefetchFunction,
  setMainData: setMainDataFunction,
  setIsModalOpen:any
): ColumnDef<any>[] => {
  return [
    {
      header: "#",
      accessorKey: "id",
      cell: (info) => <span>{indexTable(info.row.index, page)}</span>,
    },
    {
      header: `${t("name")}`,
      accessorKey: "name",
      cell: (info) => info.renderValue(),
    },
    {
      header: `${t("currency")}`,
      accessorKey: "currency",
      cell: (info) => info.renderValue(),
    },
    {
      header: `${t("iso2")}`,
      accessorKey: "iso2",
      cell: (info) => info.renderValue(),
    },
    {
      header: `${t("timezones")}`,
      accessorKey: "timezones",
      cell: (info) => info.renderValue(),
    },
    {
      header: `${t("latitude")}`,
      accessorKey: "latitude",
      cell: (info) => info.renderValue(),
    },
    {
      header: `${t("longitude")}`,
      accessorKey: "longitude",
      cell: (info) => info.renderValue(),
    },
    {
      header: `${t("Actions")}`,
      accessorKey: "actions",
      cell: (info) => (
        <div className="flex justify-center">
          <DropDown>
            <UpdateIcon
              refetch={refetch}
              setModel={setIsModalOpen}
              info={info}
              setData={setMainData}
            />
            <DeleteMain refetch={refetch} info={info} />
          </DropDown>
        </div>
      ),
    },
  ];
};
