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

function App() {
  const myWidth = 200;
  return (
    <div className="App">
      <NavBar 
          drawerWidth={myWidth}
          content = {
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/ganhos" element={<Income />} />
              <Route path="/gastos" element={<Expenses />} />
              <Route path="/criar" element={<Create />} />
              <Route path="/calendario" element={<Calendar />} />
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          }
      />
    </div>
  );
}

export default App;
