import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Create from './components/Create';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Footer from './components/Footer';

function App() {
  const myWidth = 200;
  return (
    
    <div className="App">
      {location.pathname === "/" && <Header />}

      {isAuthenticated && (
        <NavBar
          drawerWidth={myWidth}
          onLogout={handleLogout}
         
          content={
/*             <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/ganhos" element={<Income />} />
              <Route path="/gastos" element={<Expenses />} />
              <Route path="/criar" element={<Create />} />
              <Route path="/calendario" element={<Calendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
 */        
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
          </Routes>  }
        />
      )}


     

      <Footer />
    </div>
  );
}

export default App;
