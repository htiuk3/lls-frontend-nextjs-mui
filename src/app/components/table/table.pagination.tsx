'use client'

import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import { ChangeEvent, Fragment } from "react";
interface TablePaginationProps {
  take: number
  currentPage: number
  pageCount: number
  total: number
  onPageClick: (page: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export default function TablePagination({ onPageClick, onRowsPerPageChange, take, currentPage, pageCount, total }: TablePaginationProps) {
  return <Box sx={{
    display: "flex",
    gap: 2,
    justifyContent: "flex-end"
  }}>
    <TextField
      id="select-rows-per-page"
      select
      label="Số lượng"
      defaultValue={50}
      size="small"
      onChange={onRowsPerPageChange}
      sx={{
        width: 90
      }}
    >
      {[5, 10, 20, 30, 50, 100].map((item) => (
        <MenuItem key={item} value={item} defaultValue={take}>
          {item}
        </MenuItem>
      ))}
    </TextField>
    <IconButton size="small" color="primary" disabled={currentPage === 1} onClick={() => onPageClick(1)}>
      1
    </IconButton>

    {
      [currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3].map(
        i => <Fragment key={i}>
          {i > 1
            && i < pageCount
            && <IconButton size="small" color="primary" disabled={i === currentPage} onClick={() => onPageClick(i)}>
              {i}
            </IconButton>}
        </Fragment>
      )
    }
    <IconButton size="small" color="primary" disabled={currentPage === pageCount} onClick={() => onPageClick(pageCount)} >
      {pageCount}
    </ IconButton>
  </Box >
}