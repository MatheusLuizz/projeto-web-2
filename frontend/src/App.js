import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import Home from "./components/Home";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Create from "./components/Create";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const myWidth = 200;
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  useEffect(() => {
    // Verifica o estado de autenticação no localStorage quando a aplicação é carregada
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <div className="App">
      {location.pathname === "/" && <Header />}

      {isAuthenticated ? (
        <>
          <NavBar
            drawerWidth={myWidth}
            onLogout={handleLogout}
            content={
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/ganhos" element={<Income />} />
                <Route path="/gastos" element={<Expenses />} />
                <Route path="/criar" element={<Create />} />
                <Route path="/calendario" element={<Calendar />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            }
          />
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<HomePage onLogin={handleLogin} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;
