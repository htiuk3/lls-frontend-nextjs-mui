'use client'
import { Box, Checkbox, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Fragment, useState } from "react"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"


interface TableInvoiceRowProps {
  handleCheckBoxClick: (event: any) => void
  isItemSelected: boolean
  labelId: string
  row: TInvoice
}

function TableInvoiceRow({ handleCheckBoxClick, isItemSelected, labelId, row }: TableInvoiceRowProps) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{
          cursor: 'pointer',
          '& > *': { borderBottom: 'unset' }
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={handleCheckBoxClick}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
        >
          {row.code}
        </TableCell>
        <TableCell align="left">
          <Typography>{row.soldByKiotName}</Typography>
          <Typography variant='body2'>{row.soldByKiotId}</Typography>
        </TableCell>
        <TableCell align="left">{row.customerCode}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="left">{row.kiotStatusValue}</TableCell>
        <TableCell>
          <IconButton color="info">
            <EditOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{
          paddingBottom: 0,
          paddingTop: 0
        }} colSpan={7}>


          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography textAlign="center" variant="subtitle2" gutterBottom component="div">
                Chi tiết hoá đơn:
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Giá bán</TableCell>
                    <TableCell align="right">Giảm giá</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.invoiceDetails.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.productCode}
                      </TableCell>
                      <TableCell align="center">
                        {item.quantity}
                      </TableCell>
                      <TableCell align="right">
                        {item.price}
                      </TableCell>
                      <TableCell align="right">
                        {item.discount}
                      </TableCell>
                      <TableCell align="right">
                        {item.subTotal}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default TableInvoiceRow