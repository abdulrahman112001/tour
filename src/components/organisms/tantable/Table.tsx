import React, { useEffect, useState, useMemo } from "react";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { ColumnFiltersState } from "@tanstack/react-table";
import {
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { t } from "i18next";
import { Header } from "../../atoms/Header";
import { Loading } from "../../molecules/Loading/Loading";
import { TableHeader } from "./TableHeader";
import { ReactTableProps } from "./tableTypes";

export const Table = <T extends object>({
  data,
  columns,
  isSuccess,
  isLoading,
  pageSize,
  setPageSize,
  isFetching,
  columnsToRemove,
  setWord,
  setChartType,
  showChartType = false,
  setChartAccount,
  setCostCenter,
  setSupplier,
  showChartAccount,
  showCostCenter,
  showSuppliers,
  setEntities,
  showEntities,
  showCurrency,
  setCurrencyValue,
  setGlTypeValue,
  showGlType,
  setCoastCenterValue,
  showCoastCenter,
  showModuleType,
  setModuleTypeValue,
  setBranchValue,
  setCustodiansValue,
  setEmployeeValue,
  showBranch,
  showCustodians,
  showEmplyeesFilter,
  setTaxesValue,
  showTaxes,
  showModuleFilter,
  setModuleType,
  setModuleValue,
  moduleValue,
  setSafeValue,
  showSafeFilter,
  showActivityFilter,
  setActivityValue,
  showLogFilter,
  setLogValue,
  setSubjectLogValue,
  logValue,
  setCountryValue,
  showCountryFilter,
  showCityFilter,
  setCityValue,
  setDepartmentValue,
  showDepartmentFilter,
  setAreaValue,
  showAreaFilter,
  showEventFilter,
  setEventValue,
  showAdminFilter,
  setAdminValue,
  showStatusFilter,
  showCloseFilter,
  setStatusValue,
  setCloseValue,
  showDateFrom,
  setDateFromValue,
  setMultiDateValueFrom,
  showDateTo,
  showEmptyButton,
  showPaymentMethod,
  setPaymentMethodValue,
  showPaymentType,
  handelEmptyFilters,
  setPaymentTypeValue,
  setChartClass,
  showChartClass,
  setSortingData,
  setMultiDateValueTo,
  showMultiDateFrom,
  setDateToValue,
  showMultiDateTo,
  showSearch,
  showFilter,
  showClient,
  setClientValue,
  setMainClientValue,
  showMainClint,
  footerData,
}: ReactTableProps<T>) => {
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentPageData, setCurrentPageData] = useState<T[]>([]);
  const [sorting, setSorting] = React.useState<SortingState[]>([]);
  const [sortingState, setSortingState] = useState<Record<string, string>>({});

  const table = useReactTable(
    {
      data,
      columns,
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      state: {
        globalFilter,
        sorting,
      },
      initialState: {
        pagination: {
          pageSize: 100,
        },
      },
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: fuzzyFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    },
    // @ts-ignore
    (hooks: { onPageChange: (({ rows }: { rows: any }) => void)[] }) => {
      hooks.onPageChange.push(({ rows }) => {
        setCurrentPageData(rows.map((row: { original: any }) => row.original));
      });
    }
  );

  useEffect(() => {
    setCurrentPageData(table.getRowModel().rows.map((row) => row.original));
  }, [table.getRowModel().rows]);

  useEffect(() => {}, [currentPageData]);

  const handleSorting = (header: any) => {
    if (header.column?.columnDef?.filterKey) {
      header.column.toggleSorting();
      const newSortingState = header.column.getIsSorted() as string;
      setSortingState((prevState) => ({
        ...prevState,
        [header.id]: newSortingState || "none",
      }));
      setSortingData({
        state: newSortingState || "",
        name: header.column?.columnDef?.filterKey || "",
      });
    }
  };
  const generateFooters = (footerData: any[]) => {
    return footerData?.map((footerRow: { value: any[] }, rowIndex: any) => (
      <tr key={`footer-row-${rowIndex}`} className=" border-t-4 border-white ">
        {columns.map((column: any, colIndex: any) => {
          const footerValue =
            footerRow.value.find(
              (cell: { index: any }) => cell.index === colIndex
            )?.value || null;
          return (
            <td
              key={`footer-cell-${rowIndex}-${colIndex}`}
              className="px-6 py-4  !mt-10 text-sm font-light text-gray-300 !bg-gray-100 "
            >
              {footerValue}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      {/* <TableHeader
        globalFilter={globalFilter}
        pageSize={pageSize}
        setGlobalFilter={setGlobalFilter}
        setPageSize={setPageSize}
        showFilter={showFilter}
        showSearch={showSearch}
        table={table}
        columnsToRemove={columnsToRemove}
        setWord={setWord}
    
      /> */}

      <div className="GlobalTable w-full flex flex-col gap-4  overflow-x-scroll ">
        {isLoading && <Loading />}
        <table id="print-table" className="min-w-full text-center">
          <thead className="border-b ">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-sm  text-white dark:!bg-dark-tertiary capitalize"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: () => handleSorting(header),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column?.columnDef?.filterKey && (
                          <span className="table-sort-arrow">
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[sortingState[header.id]] ?? null}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {isSuccess && !!data.length && (
          
              <tbody className="">
                {table?.getRowModel()?.rows?.map((row) => (
                  <tr key={row.id} className="border-b ">
                    {row?.getVisibleCells()?.map((cell) => (
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm  font-light text-gray-300 td-col-dark first:text-black capitalize "
                        key={cell.id}
                        style={{
                          background: !!row.original.is_free_session
                            ? "#F4FFFA"
                            : "",
                        }}
                      >
                        {flexRender(
                          cell?.column?.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
        
          )}
          <tfoot>{generateFooters(footerData)}</tfoot>
        </table>
        {isSuccess &&
          !!!data?.length &&
          !!!footerData?.length &&
          !!!isLoading &&
          !!!isFetching && (
            <div className="mb-5 pr-5">
              <Header
                header={t("nothing")}
                className="text-center text-2xl font-bold dark:text-white"
              />
            </div>
          )}
      </div>
    </>
  );
};
