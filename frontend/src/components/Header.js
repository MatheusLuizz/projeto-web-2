import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Who from "./Who";
import Features from "./Features";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000A32" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="./logo-plan-header.png" alt="Logo" style={{ height: 40 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/sobre"
            sx={{
              "&:hover": {
                color: "#00C75A", 
                fontWeight: "bold", 
              },
            }}
          >
            Funcionalidades
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              "&:hover": {
                color: "#00C75A",
                fontWeight: "bold",
              },
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            sx={{
              "&:hover": {
                color: "#00C75A",
                fontWeight: "bold",
              },
            }}
          >
            Cadastro
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/quemSomos"
            sx={{
              "&:hover": {
                color: "#00C75A",
                fontWeight: "bold",
              },
            }}
          >
            Quem Somos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;


