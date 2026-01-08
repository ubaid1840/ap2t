"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useMemo,
  useState
} from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import Spinner from "./ui/spinner";

const PageTable = ({

  columns,
  data,
  onRowClick = () => { },
  loading = false,
} : any) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply column filters
    columnFilters.forEach((filter : any) => {
      filtered = filtered.filter((row : any) => {
        const cellValue = row[filter.id];
        return cellValue.toString().toLowerCase().includes(filter.value.toLowerCase());
      });
    });

    // Apply global search filter
    if (search) {
      filtered = filtered.filter((row : any) => {
        return Object.values(row).some(value =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    return filtered;
  }, [data, columnFilters, search]);



  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: search,
    },
    defaultColumn: {
      size: 200
    }
    // manualPagination: true,
    // manualFiltering: true
  });

  const isMobile = useIsMobile()



  return (
    <div className="flex flex-1 flex-col space-y-4">
      <div className={`relative flex flex-1 flex-col ${isMobile && "min-h-[500px]"}`}>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex overflow-scroll rounded-md border md:overflow-auto custom-scrollbar">
          <ScrollArea className="flex-1 relative">
            <Table className="relative">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}  
                  // className="sticky top-0 z-20 bg-background"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead style={{ width: header.getSize(), color : "#99A1AF" }} key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="bg-white dark:bg-gray-900">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      onClick={(e) => onRowClick(row.original, e)}
                      className="bg-[#252525] dark:text-white text-black cursor-pointer"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="text-[13px]" key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            stopRowClick: (e : any) => e.stopPropagation(),
                          })}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {loading ? (
                        <div className="flex flex-1 justify-center">
                          <Spinner />
                        </div>
                      ) : (
                        "No results."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

     
    </div>
  );
};

export default PageTable;
