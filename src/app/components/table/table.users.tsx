'use client'
import { Box } from "@mui/material"
import { ColumnDef, createColumnHelper, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"

interface UsersTableProps {
  meta: TPageMeta
  list: TUser[]
}

export default function UsersTable({ meta, list }: UsersTableProps) {
  const data = useMemo(() => list, [list])
  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Phone Number', accessor: 'phoneNumber' },
  ]
    , [])





  return <Box>table user</Box>
}