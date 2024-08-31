import React from "react";

const features = [
  { src: "./gastos.png", title: "Controle de Contas" },
  { src: "./ganhos.png", title: "Controle de Ativos" },
  { src: "./dashboard.png", title: "Dashboard" },
  { src: "./calendario.png", title: "Calendário de Contas" },
];

function Features() {
  const containerStyle = {
    padding: "20px",
    textAlign: "left",
    backgroundColor: "#ffffff",
  };

  const mainTitleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#606060",
    paddingBottom: "10px",
    display: "inline-block",
  };

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    padding: "20px",
  };

  const cardStyle = {
    textAlign: "center",
    flex: "1 1 23%",
    maxWidth: "23%",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    padding: "10px",
    boxSizing: "border-box",
  };

  const imgStyle = {
    width: "80%",
    height: "auto",
    borderRadius: "8px",
    margin: "0 auto", 
  };

  const cardTitleStyle = {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#606060",
  };

  return (
    <div style={containerStyle}>
      <h2 style={mainTitleStyle}>Funcionalidades</h2> 
      <div style={cardContainerStyle}>
        {features.map((feature, index) => (
          <div style={cardStyle} key={index}>
            <img src={feature.src} alt={feature.title} style={imgStyle} />
            <p style={cardTitleStyle}>{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;



