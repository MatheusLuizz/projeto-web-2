import React, { useState } from "react";

function Register() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefone, setTelefone] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (email !== confirmEmail) {
      formIsValid = false;
      errors["confirmEmail"] = "Os e-mails não coincidem.";
    }

    if (password !== confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "As senhas não coincidem.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpf,
          nome: nome,
          email: email,
          password: password,
          telefone: telefone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registro realizado com sucesso!");
        // Limpar os campos após sucesso
        setCpf("");
        setNome("");
        setEmail("");
        setConfirmEmail("");
        setPassword("");
        setConfirmPassword("");
        setTelefone("");
        setErrors({});
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Ocorreu um erro ao tentar registrar.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrar</h2>
      <div>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF"
          required
        />
        {errors.cpf && <span>{errors.cpf}</span>}
      </div>
      <div>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        {errors.nome && <span>{errors.nome}</span>}
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Confirme o Email"
          required
        />
        {errors.confirmEmail && <span>{errors.confirmEmail}</span>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a Senha"
          required
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <div>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
          required
        />
        {errors.telefone && <span>{errors.telefone}</span>}
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
