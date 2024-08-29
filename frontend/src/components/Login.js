// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//   const [username, setUsername] = useState(""); // Pode ser CPF ou email
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           username: username,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         onLogin(); 
//         navigate("/home"); 
//       } else {
//         alert("CPF/Email ou senha incorretos");
//       }
//     } catch (error) {
//       console.error("Erro durante o login:", error);
//       alert("Erro durante o login. Tente novamente.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="CPF ou Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Senha"
//       />
//       <button onClick={handleLogin}>Entrar</button>
//     </div>
//   );
// }

// export default Login;


// -------------



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState(""); // Pode ser CPF ou email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "123";

  const handleLogin = async () => {
    try {
      // Verificação para usuário admin
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin();
        navigate("/home");
        return;
      }

      // Tentativa de autenticação normal
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
        onLogin(); 
        navigate("/home"); 
      } else {
        alert("CPF/Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Erro durante o login. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="CPF ou Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;

