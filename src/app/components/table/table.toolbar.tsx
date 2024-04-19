'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";


interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string
}

export function TableToolbar({ numSelected, title }: EnhancedTableToolbarProps) {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} đã chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Tuỳ chọn">
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}