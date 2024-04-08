'use client'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import EnhancedTableHead, { EnhancedTableToolbar } from './table-products.head';
import TableProductsPagination from './table-products.pagination';


interface TableProductsProps {
  meta: TPageMeta;
  list: TProduct[]
}
export default function TableProducts({ list, meta }: TableProductsProps) {
  const theme = useTheme()
  const [rows, setRows] = useState<TProduct[]>(list)
  const [pageMeta, setPageMeta] = useState<TPageMeta>(meta)
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleNextClick = () => {
    console.log("Next")
  }

  const handlePreviousClick = () => {
    console.log("Previous")
  }

  const handlePageClick = (page: number) => {
    console.log("Go to page ", page)
  }



  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  useEffect(() => {
    console.log(selected)
  }, [selected])


  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageMeta({
      ...pageMeta,
      take: parseInt(event.target.value),
      page: 1,
      hasPreviousPage: false
    })
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  useEffect(() => {
    console.log(pageMeta)
  }, [pageMeta])


  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      <Paper sx={{
        width: '100%',
        mb: 4,
        borderRadius: 4,
        boxShadow: `rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px`
      }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell padding='checkbox'>
                      <Image alt={row.name} src={row?.kiotImage ? row.kiotImage : ""} width={60} height={60} />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.code}
                    </TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    <TableCell align="right">{row.wholeSalePrice}</TableCell>
                    <TableCell align="right">{row.retailPrice}</TableCell>
                    <TableCell align="right">{row.onHand}</TableCell>
                    <TableCell>
                      <IconButton color="info">
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TableProductsPagination
        meta={meta}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        onPageClick={handlePageClick}
        onRowsPerPageChange={e => handleChangeRowsPerPage(e)} />
    </Box>
  );
}