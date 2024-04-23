'use client'
import { getInvoices } from '@/app/(manage-layout)/invoices/page';
import { scrollToTop } from '@/app/hooks/scrollToTop';
import { Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { ChangeEvent, useEffect, useState } from 'react';
import TablePagination from '../table.pagination';
import { TableToolbar } from '../table.toolbar';
import TableInvoiceRow from './table-invoice.row';
import TableInvoicesHead from './table-invoices.head';


interface TableInvoicesProps {
  meta: TPageMeta;
  list: TInvoice[]
}
export default function TableInvoices({ list, meta }: TableInvoicesProps) {
  const [rows, setRows] = useState<TInvoice[]>(list)
  const [currentPage, setCurrentPage] = useState<number>(meta.page)
  const [take, setTake] = useState<number>(meta.take)
  const [pageCount, setPageCount] = useState<number>(meta.pageCount)
  const [total, setTotal] = useState<number>(meta.itemCount)
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<any>()

  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handlePageClick = (page: number) => {
    setCurrentPage(page)
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
    setTake(parseInt(event.target.value))
    setCurrentPage(1)
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await getInvoices(take, currentPage)
        setCurrentPage(result.data.meta.page)
        setPageCount(result.data.meta.pageCount)
        setTotal(result.data.meta.itemCount)
        setRows(result.data.list)
        scrollToTop()
      } catch (error) {
        setOpen(true)
        setMessage(error)
      }
      setIsLoading(false)
    }
    console.log(">>> Check page meta: ", take, "--", currentPage)

    fetchData()
  }, [currentPage, take])


  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
      />
      <Paper sx={{
        width: '100%',
        mb: 4,
        borderRadius: 4,
        boxShadow: {
          md: `rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px`
        }
      }}>
        <TableToolbar title="Danh sách hoá đơn" numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableInvoicesHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `table-invoices-${index}`;

                return (
                  <TableInvoiceRow
                    key={row.id + "tablerow"}
                    labelId={labelId}
                    isItemSelected={isItemSelected}
                    row={row}
                    handleCheckBoxClick={(event) => handleClick(event, row.id)}
                  />
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        take={take}
        currentPage={currentPage}
        pageCount={pageCount}
        total={total}
        onPageClick={handlePageClick}
        onRowsPerPageChange={e => handleChangeRowsPerPage(e)} />
    </Box>
  );
}