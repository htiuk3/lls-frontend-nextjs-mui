'use client'

import { Box, MenuItem, TextField } from "@mui/material"
import { ChangeEvent } from "react"


interface TableProductsPaginationProps {
  meta: TPageMeta
  onNextClick: () => void
  onPreviousClick: () => void
  onPageClick: (page: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export default function TableProductsPagination({ onNextClick, onPreviousClick, onPageClick, onRowsPerPageChange }: TableProductsPaginationProps) {
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
      {[10, 20, 30, 50, 100].map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  </Box>
}