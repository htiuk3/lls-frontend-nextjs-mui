'use client'
import { alpha, Checkbox, IconButton, TableCell, TableHead, TableRow, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

interface HeadCell {
  disablePadding: boolean;
  id: keyof TProduct | "actions";
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên sản phẩm',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Mã sản phẩm',
  },

  {
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Giá vốn',
  },
  {
    id: 'wholeSalePrice',
    numeric: true,
    disablePadding: false,
    label: 'Giá sỉ',
  },
  {
    id: 'retailPrice',
    numeric: true,
    disablePadding: false,
    label: 'Giá lẻ',
  },
  {
    id: 'onHand',
    numeric: true,
    disablePadding: false,
    label: 'Tồn kho',
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

export default function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount, }: EnhancedTableHeadProps) {
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
              'aria-label': 'select all users',
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
