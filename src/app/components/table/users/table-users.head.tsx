'use client'
import { alpha, Checkbox, IconButton, TableCell, TableHead, TableRow, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

interface HeadCell {
  disablePadding: boolean;
  id: keyof TUser | "actions";
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: true,
    label: 'Tên đăng nhập',
  },

  {
    id: 'phoneNumber',
    numeric: true,
    disablePadding: false,
    label: 'Số điện thoại',
  },
  {
    id: 'isActive',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Nhóm người dùng',
  },

  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

interface TableUsersHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function TableUsersHead({ onSelectAllClick, numSelected, rowCount, }: TableUsersHeadProps) {
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
