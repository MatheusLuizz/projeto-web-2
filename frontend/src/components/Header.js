import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000A32" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="./logo-plan-header.png" alt="Logo" style={{ height: 40}} />
        </Typography>
        <Box>
        <Button color="inherit" component={Link} to="/sobre">
            Sobre
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Cadastro
          </Button>
          <Button color="inherit" component={Link} to="/quemSomos">
            Quem Somos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
