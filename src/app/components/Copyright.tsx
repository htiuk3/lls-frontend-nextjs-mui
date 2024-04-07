import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body1" color="text.secondary" align="center">
      {'Copyright © '}
      Lo Lem Shop - Created by Dat Vo{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}