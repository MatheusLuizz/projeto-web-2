import React, { useState, useEffect } from "react";

function MainBanner() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
    "Planeje sua Vida",
    "Transforme seus Sonhos em Realidade",
    "Acredite no seu Potencial",
    "Seja o Protagonista da sua História",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhrase((prevPhrase) => (prevPhrase + 1) % phrases.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [phrases.length]);

  const bannerStyle = {
    width: "100%",
    height: "420px",
    backgroundImage: "url('./bannerPrincipal.png')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const textContainerStyle = {
    width: "100%",
    backgroundColor: "#000A32",
    color: "#FFFFFF",
    textAlign: "center",
    padding: "5px 0",
  };

  const textStyle = {
    fontSize: "30px",
    margin: 0,
  };

  return (
    <div>
      <div style={bannerStyle}></div>
      <div style={textContainerStyle}>
        <h1 style={textStyle}>{phrases[currentPhrase]}</h1>
      </div>
    </div>
  );
}

export default MainBanner;
