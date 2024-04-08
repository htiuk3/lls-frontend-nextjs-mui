'use client'
import theme from '@/theme';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Badge } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountMenu from '../menu/account.menu';
interface ResponsiveAppBarProps {
  drawerWidth: number
  handleDrawerToggle: () => void
}

function ResponsiveAppBar({ drawerWidth, handleDrawerToggle }: ResponsiveAppBarProps) {

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backgroundColor: 'white',
        boxShadow: "none",
        color: 'black'
      }}
    >
      <Toolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Lọ Lem Shop
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsNoneOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="secondary">
              <SettingsOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
            </Badge>
          </IconButton>
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
