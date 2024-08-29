// import React, { useState } from "react";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/api/register/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           username: username,
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("Usuário registrado com sucesso!");
//       } else {
//         alert(`Erro: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Erro durante o registro:", error);
//       alert("Erro durante o registro. Tente novamente.");
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Registrar</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Registrar</button>
//     </form>
//   );
// }

// export default Register;


// ---------------------

// import React, { useState } from 'react';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:8000/api/register/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//           username: username,
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('Usuário registrado com sucesso!');
//       } else {
//         alert(`Erro: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Erro durante o registro:', error);
//       alert('Erro durante o registro. Tente novamente.');
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Registrar</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Registrar</button>
//     </form>
//   );
// }

// export default Register;


import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Usuário registrado com sucesso!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Ocorreu um erro ao tentar registrar.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrar</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;

