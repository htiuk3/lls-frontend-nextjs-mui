import theme from '@/theme';
import { Box, Container } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
import * as React from 'react';
import MainDrawer from "../components/drawer/drawer.main";

export const metadata: Metadata = {
  title: "Quản lý Lọ Lem Shop",
  description: "Phần mềm quản lý bán hàng Lọ Lem Shop - Created by Dat Vo",
};
const drawerWidth = 240
export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <MainDrawer />
            <Box sx={{
              ml: { xs: 0, md: 32 },
              mt: 10,
              mr: 2,
            }}>
              {props.children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}