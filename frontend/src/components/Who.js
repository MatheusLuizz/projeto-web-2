import React from "react";

const images = [
  { src: "./Who-Adriel.png", title: "Adriel Leite" },
  { src: "/Who-Hilda.png", title: "Hilda Miranda" },
  { src: "/Who-Kamila.png", title: "Kamila Rocha" },
  { src: "/Who-Matheus.png", title: "Matheus Luiz" },
  { src: "/Who-Murilo.png", title: "Murilo Alves" },
];

function Who() {
  const containerStyle = {
    padding: "20px",
    textAlign: "left",
    backgroundColor: "#000A32",
    color: "#00C75A",
    marginTop: "0",
  };

  const headerStyle = {
    color: "#FFFFFF",
    borderBottom: "2px solid #00C75A",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const gridStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const itemStyle = {
    textAlign: "center",
    flex: "1 1 18%",
    maxWidth: "18%",
    boxSizing: "border-box",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  };

  const titleStyle = {
    marginTop: "10px",
    fontSize: "14px",
    color: "#FFFFFF",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Quem Somos</h2>
      <div style={gridStyle}>
        {images.map((image, index) => (
          <div style={itemStyle} key={index}>
            <img src={image.src} alt={image.title} style={imgStyle} />
            <p style={titleStyle}>{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Who;
