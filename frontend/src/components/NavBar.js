import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsightsIcon from '@mui/icons-material/Insights';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function NavBar(props) {
  const { drawerWidth, content } = props
  const location = useLocation()
  const path = location.pathname

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open)
  }

  const myDrawer = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toolbar />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/home" selected={"/home" === path}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/gastos" selected={"/gastos" === path}>
              <ListItemIcon>
                <MoneyOffIcon />
              </ListItemIcon>
              <ListItemText primary={"Gastos"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ganhos" selected={"/ganhos" === path}>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={"Ganhos"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/criar" selected={"/criar" === path}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"Criar"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" selected={"/dashboard" === path}>
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/calendario" selected={"/calendario" === path}>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={"Calendário"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#000A32',
          color: '#fff'
       }}>
        <Toolbar>

          <IconButton 
            color = "inheret"
            onClick={changeOpenStatus}
            sx = {{mr:2,display:{sm:"none"}}}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Mudar isso em components/NavBar.js, linha 112
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: {xs: 'none', sm: 'block'},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            backgroundColor: '#000A32',
            color: '#fff'
          },
        }}
      >
        {myDrawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={open}
        onClose={changeOpenStatus}
        sx={{
          display: {xs: 'block', sm: 'none'},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

          {content}

      </Box>
    </Box>
  );
}