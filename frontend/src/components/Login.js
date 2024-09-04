import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false); 
  const navigate = useNavigate();

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "123";

 
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    setIsClicked(true); 

    try {
     
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin();
        navigate("/home");
        return;
      }

      
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authenticatedUser", username);
        onLogin();
        navigate("/home");
      } else {
        alert("CPF/Email ou senha incorretos");
        setUsername(""); 
        setPassword(""); 
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Erro durante o login. Tente novamente.");
      setUsername(""); 
      setPassword(""); 
    } finally {
      setIsClicked(false); 
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const titleStyle = {
    color: "#000A32",
    marginBottom: "20px",
  };

  const formGroupStyle = {
    width: "90%", 
    marginBottom: "15px", 
    padding: "0 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
  };

  const labelStyle = {
    fontSize: "16px",
    color: "#000A32", 
    marginBottom: "5px",
    display: "block",
    textAlign: "left",
    width: "100%",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px", 
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "12px", 
  };

  const buttonStyle = {
    width: "auto", 
    minWidth: "100px",
    padding: "10px",
    backgroundColor: isClicked ? "#91c8fa" : "#00C75A", 
    color: "#000A32", 
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "background-color 0.3s", 
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Login</h2>
      <div style={formGroupStyle}>
        <label htmlFor="username" style={labelStyle}>Usuário</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="CPF ou Email"
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="password" style={labelStyle}>Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          style={inputStyle}
        />
      </div>
      <button onClick={handleLogin} style={buttonStyle}>
        Entrar
      </button>
    </div>
  );
}

export default Login;











