import React from "react";
import Register from "./Register";
import Login from "./Login";
import Who from "./Who";
import MainBanner from "./MainBanner";
import Features from "./Features";

function HomePage({ onLogin }) {
  const cardContainerStyle = {
    padding: "20px",
    backgroundColor: "rgba(145, 200, 250, 0.5)", 
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    margin: "20px auto", 
    position: "relative",
    overflow: "hidden",
    maxWidth: "1000px", 
    display: "flex",
    justifyContent: "center", 
    };

  const cardContentStyle = {
    padding: "20px",
    position: "relative",
    zIndex: 1,
    width: "100%", 
    maxWidth: "1000px",
    alignItems: "center", 
    justifyContent: "center", 
  };

  const cardInnerContainerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  };

  const loginStyle = {
    width: "40%", 
    maxWidth: "400px", 
    marginRight: "20px",
    display: "flex",
    alignItems: "center", 
  };

  const registerStyle = {
    width: "60%", 
    maxWidth: "600px", 
    marginLeft: "20px",
    display: "flex",
    alignItems: "center", 
  };

  return (
    <div>
      <div>
        <MainBanner />
      </div>

      <div id="features">
        <Features />
      </div>

      <div style={cardContainerStyle}>
        <div style={cardContentStyle}>
          <div style={cardInnerContainerStyle}>
            <div id="login" style={loginStyle}>
              <Login onLogin={onLogin} />
            </div>

            <div id="register" style={registerStyle}>
              <Register />
            </div>
          </div>
        </div>
      </div>

      <div id="who">
        <Who />
      </div>
    </div>
  );
}

export default HomePage;





