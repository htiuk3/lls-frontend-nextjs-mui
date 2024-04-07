import { Box, Container } from "@mui/material";
import type { Metadata } from "next";
import * as React from 'react';
import MainDrawer from "../../components/drawer/drawer.main";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm - Lọ Lem Shop",
  description: "Phần mềm quản lý bán hàng Lọ Lem Shop - Created by Dat Vo",
};

export default function ProductsPageLayout(props: { children: React.ReactNode }) {
  return (
    <Box>

      {props.children}
    </Box>
  );
}