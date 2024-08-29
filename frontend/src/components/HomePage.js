import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register"; // Importe o componente Register

function HomePage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (username === "admin" && password === "admin") {
      onLogin(); 
      navigate("/home"); 
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <div>
      <h1>Bem-vindo à HomePage</h1>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>

      <div style={{ marginTop: 50 }}>

        <Register />
      </div>
    </div>
  );
}

export default HomePage;