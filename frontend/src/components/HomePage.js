// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Register from "./Register"; 

// function HomePage({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (username === "admin" && password === "admin") {
//       onLogin();
//       navigate("/home");
//     } else {
//       alert("Usuário ou senha incorretos");
//     }
//   };

//   return (
//     <div>
//       <h1>Bem-vindo à HomePage</h1>
//       <div>
//         <h2>Login</h2>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Usuário"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Senha"
//         />
//         <button onClick={handleLogin}>Entrar</button>
//       </div>

//       <div style={{ marginTop: 50 }}>
//         <Register />
//       </div>
//     </div>
//   );
// }

// export default HomePage;


// ----------------------

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Register from "./Register"; 
// import Login from "./Login";

// function HomePage({ onLogin }) {
//   const [cpf, setCpf] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cpf: cpf,
//           password: password,
//         }),
        
//       });


//       const data = await response.json();

//       if (data.success) {
//         onLogin();
//         navigate("/home");
//       } else {
//         alert("CPF ou senha incorretos");
//       }
//     } catch (error) {
//       console.error("Erro ao fazer login:", error);
//       alert("Ocorreu um erro ao tentar fazer login.");
//     }
//   };

//   return (
//     <div>
//       <h1>Bem-vindo à HomePage</h1>
//       <div>
//         <h2>Login</h2>
//         <input
//           type="text"
//           value={cpf}
//           onChange={(e) => setCpf(e.target.value)}
//           placeholder="CPF"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Senha"
//         />
//         <button onClick={handleLogin}>Entrar</button>
//       </div>

//       <Login onLogin={onLogin} />

//       <div style={{ marginTop: 50 }}>
//         <Register />
//       </div>
//     </div>
//   );
// }

// export default HomePage;


// -------------

import React from "react";
import Register from "./Register";
import Login from "./Login";

function HomePage({ onLogin }) {
  return (
    <div>
      <h1>Bem-vindo à HomePage</h1>
      <Login onLogin={onLogin} />
      <div style={{ marginTop: 50 }}>
        <Register />
      </div>
    </div>
  );
}

export default HomePage;
