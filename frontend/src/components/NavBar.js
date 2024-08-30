import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import InsightsIcon from "@mui/icons-material/Insights";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function NavBar(props) {
  const { drawerWidth, content, onLogout } = props; // Recebe a função de logout como prop
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate(); // Para redirecionamento após logout

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    onLogout(); // Chama a função de logout
    navigate("/"); // Redireciona para a HomePage após deslogar
  };

  const myDrawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Toolbar />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/home"
              selected={"/home" === path}
            >
              <ListItemIcon>
                <HomeIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/gastos"
              selected={"/gastos" === path}
            >
              <ListItemIcon>
                <MoneyOffIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Gastos"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/ganhos"
              selected={"/ganhos" === path}
            >
              <ListItemIcon>
                <AttachMoneyIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Ganhos"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/criar"
              selected={"/criar" === path}
            >
              <ListItemIcon>
                <AddIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Criar"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard"
              selected={"/dashboard" === path}
            >
              <ListItemIcon>
                <InsightsIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/calendario"
              selected={"/calendario" === path}
            >
              <ListItemIcon>
                <CalendarMonthIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Calendário"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#000A32",
          color: "#fff",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img
              src="./logo-plan-header.png"
              alt="Logo"
              style={{ height: 40}}
            />
          </Typography>
          <button
            onClick={handleLogout}
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Deslogar
          </button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#000A32",
            color: "#fff",
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
          display: { xs: "block", sm: "none" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
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

