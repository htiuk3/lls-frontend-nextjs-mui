import { Box } from "@mui/material";
import type { Metadata } from "next";
import * as React from 'react';

export const metadata: Metadata = {
  title: "Hoá đơn - Lọ Lem Shop",
  description: "Phần mềm quản lý bán hàng Lọ Lem Shop - Created by Dat Vo",
};

export default function InvoicesPageLayout(props: { children: React.ReactNode }) {
  return (
    <Box>

      {props.children}
    </Box>
  );
}