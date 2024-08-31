import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

function Header() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000A32" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="./logo-plan-header.png" alt="Logo" style={{ height: 40 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => handleScroll('features')}
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
            onClick={() => handleScroll('login')}
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
            onClick={() => handleScroll('register')}
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
            onClick={() => handleScroll('who')}
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



