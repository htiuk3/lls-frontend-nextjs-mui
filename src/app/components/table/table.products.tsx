'use client'
import React from 'react'


import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  useReactTable
} from '@tanstack/react-table'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Table as MuiTable, Select, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'
import DebouncedInput from '../input/debounced.input'
import Filter from './table.filter'
import { withCommas } from '@/utils/utils'
import theme from '@/theme'
import { cyan, grey } from '@mui/material/colors'
import Image from 'next/image'
declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
interface TableUsersProps {
  meta: TPageMeta;
  list: TProduct[]
}
export default function TableProducts({ meta, list }: TableUsersProps) {

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = React.useMemo<ColumnDef<TProduct, any>[]>(
    () => [

      {
        accessorFn: row => row.kiotImage,
        id: 'kiotImage',
        cell: info => info.getValue() ? <Image loading="lazy" width={60} height={60} alt={info.getValue()} src={info.getValue()} /> : null,
        header: () => "",
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.code,
        id: 'code',
        cell: info => info.getValue(),
        header: () => "Mã sản phẩm",
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.name,
        id: 'name',
        cell: info => info.getValue(),
        header: () => "Tên sản phẩm",
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.cost,
        id: 'cost',
        header: 'Giá vốn',
        cell: (info) => withCommas(info.renderValue()),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.retailPrice,
        id: 'retailPrice',
        header: 'Giá lẻ',
        cell: (info) => withCommas(info.getValue()),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.onHand,
        id: 'onHand',
        header: 'Kho',
        cell: (info) => info.getValue(),
        footer: props => props.column.id,
      },
    ],
    []
  )

  const [data, setData] = React.useState<TProduct[]>(list)
  const theme = useTheme()

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  return (
    <div>
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
        placeholder="Tìm kiếm trong bảng..."
      />
      <TableContainer>
        <MuiTable>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <Box
                            onClick={header.column.getToggleSortingHandler()}
                            sx={{
                              cursor: header.column.getCanSort() ? "pointer" : "default",
                              userSelect: "none",
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </Box>
                          {/* {header.column.getCanFilter() ? (
                            <Box>
                              <Filter column={header.column} table={table} />
                            </Box>
                          ) : null} */}
                        </>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => {
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: cyan[50]
                    }
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell
                        sx={{
                          padding: 1,
                        }}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end", marginTop: 4 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="number-in-page">Số lượng</InputLabel>
          <Select
            labelId="number-in-page"
            value={table.getState().pagination.pageSize}
            label="Số lượng"
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >{[10, 20, 30, 40, 50].map(pageSize => (
            <MenuItem key={pageSize} value={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <Button
          size="small"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Trang đầu
        </Button>
        <IconButton
          color='primary'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          color='primary'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <NavigateNextIcon />
        </IconButton>
        <Button
          size="small"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Trang cuối
        </Button>
        <Typography>
          {`Trang ${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()} | Đến trang: `}
        </Typography>
        <TextField
          sx={{
            maxWidth: 80
          }}
          size="small"
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
        />



      </Box>
      <Typography>Tổng số: {table.getPrePaginationRowModel().rows.length} bản ghi</Typography>
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
    </div>
  )
}
