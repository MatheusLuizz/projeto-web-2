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
  const [isClicked, setIsClicked] = useState(false); 

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
    setIsClicked(true); 

    if (!validateForm()) {
      setIsClicked(false); 
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
    maxWidth: "600px", 
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
    flexDirection: "row", 
    justifyContent: "space-between", 
    gap: "35px", 
    alignItems: "center", 
  };

  const formGroupColumnStyle = {
    display: "flex",
    flexDirection: "column", 
    alignItems: "flex-start", 
    flex: 1,
  };

  const labelStyle = {
    fontSize: "16px",
    color: "#000A32", 
    marginBottom: "5px",
    display: "block",
    textAlign: "left",
    width: "100%",
    marginRight: "10px", 
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "12px",
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
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
      <h2 style={titleStyle}>Cadastrar</h2>
      <form onSubmit={handleRegister}>
        <div style={formGroupStyle}>
          <div style={formGroupColumnStyle}>
            <label htmlFor="cpf" style={labelStyle}>CPF</label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF"
              style={inputStyle}
            />
            {errors.cpf && <span style={errorStyle}>{errors.cpf}</span>}
          </div>
          <div style={formGroupColumnStyle}>
            <label htmlFor="nome" style={labelStyle}>Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              style={inputStyle}
            />
            {errors.nome && <span style={errorStyle}>{errors.nome}</span>}
          </div>
        </div>
        <div style={formGroupStyle}>
          <div style={formGroupColumnStyle}>
            <label htmlFor="email" style={labelStyle}>E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={inputStyle}
            />
            {errors.email && <span style={errorStyle}>{errors.email}</span>}
          </div>
          <div style={formGroupColumnStyle}>
            <label htmlFor="confirmEmail" style={labelStyle}>Confirme o E-mail</label>
            <input
              id="confirmEmail"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirme o Email"
              style={inputStyle}
            />
            {errors.confirmEmail && <span style={errorStyle}>{errors.confirmEmail}</span>}
          </div>
        </div>
        <div style={formGroupStyle}>
          <div style={formGroupColumnStyle}>
            <label htmlFor="password" style={labelStyle}>Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              style={inputStyle}
            />
            {errors.password && <span style={errorStyle}>{errors.password}</span>}
          </div>
          <div style={formGroupColumnStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>Confirme a Senha</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a Senha"
              style={inputStyle}
            />
            {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
          </div>
          <div style={formGroupColumnStyle}>
            <label htmlFor="telefone" style={labelStyle}>Telefone</label>
            <input
              id="telefone"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
              style={inputStyle}
            />
            {errors.telefone && <span style={errorStyle}>{errors.telefone}</span>}
          </div>
        </div>
        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;


