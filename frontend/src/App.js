import "./App.css";
import React, { useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const myWidth = 200;
  const location = useLocation(); 

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {location.pathname === "/" && <Header />}

      {isAuthenticated && (
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
      )}


      <Routes>

        <Route
          path="/"
          element={<HomePage onLogin={() => setIsAuthenticated(true)} />}
        />
 
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/ganhos"
          element={isAuthenticated ? <Income /> : <Navigate to="/" />}
        />
        <Route
          path="/gastos"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/" />}
        />
        <Route
          path="/criar"
          element={isAuthenticated ? <Create /> : <Navigate to="/" />}
        />
        <Route
          path="/calendario"
          element={isAuthenticated ? <Calendar /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
