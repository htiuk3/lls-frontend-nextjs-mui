'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BallotOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import theme from '@/theme';
import ResponsiveAppBar from '../appbar/appbar';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

const drawerWidth = 240;


interface MenuItemProps {
  content: string
  icon: React.ReactElement
  url: string
}
const MenuItem = ({ content, icon, url }: MenuItemProps) => {
  const router = useRouter()
  return (
    <ListItem disablePadding onClick={() => router.push(url)}>
      <ListItemButton>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={content} />
      </ListItemButton>
    </ListItem>
  )
}
export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider textAlign='left'>Quản lý hàng hoá</Divider>
      <List>
        <MenuItem icon={<BallotOutlined />} content="Danh mục" url="/products" />
        <MenuItem icon={<WarehouseOutlinedIcon />} content="Kho" url="/warehouse" />
      </List>
      <Divider textAlign='left'>Quản lý bán hàng</Divider>
      <List>
        <MenuItem icon={<DescriptionOutlinedIcon />} content="Hoá đơn" url="/invoices" />
        <MenuItem icon={<Face3OutlinedIcon />} content="Khách hàng" url="/customers" />
      </List>
      <Divider textAlign='left'>Quản lý người dùng</Divider>
      <List>
        <MenuItem icon={<AccountCircleOutlinedIcon />} content="Người dùng" url="/users" />
        <MenuItem icon={<AdminPanelSettingsOutlinedIcon />} content="Nhóm / Phân quyền" url="/roles_permissions" />


      </List>
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ResponsiveAppBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
