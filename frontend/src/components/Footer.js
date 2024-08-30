import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#00c85a",
    color: "#000a32",
    textAlign: "center",
    padding: "10px",
    // position: 'fixed',
    left: "0",
    bottom: "0",
    width: "100%",
    marginTop: "auto",
    boxSizing: "border-box",
    fontWeight: "bold",
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      IFPE Campus Paulista - 4º período - ADS 2024
    </footer>
  );
}
