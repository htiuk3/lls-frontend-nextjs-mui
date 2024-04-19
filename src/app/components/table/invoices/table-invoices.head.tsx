'use client'
import { alpha, Checkbox, IconButton, TableCell, TableHead, TableRow, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

interface HeadCell {
  disablePadding: boolean;
  id: keyof TInvoice | "actions";
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Mã hoá đơn',
  },
  {
    id: 'soldByKiotName',
    numeric: false,
    disablePadding: false,
    label: 'Người bán',
  },
  {
    id: 'customerCode',
    numeric: false,
    disablePadding: false,
    label: 'Mã khách hàng',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Tổng tiền',
  },
  {
    id: 'kiotStatusValue',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },


  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

interface EnhancedTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function TableInvoicesHead({ onSelectAllClick, numSelected, rowCount, }: EnhancedTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all products',
            }}
          />
        </TableCell>
        <TableCell padding="none">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
