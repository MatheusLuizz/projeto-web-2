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