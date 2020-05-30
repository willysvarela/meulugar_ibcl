import React from "react";

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    width: "100%",
    padding: "20px 0px",
    marginTop: "200px",
    textAlign: "center"
  }
};

const Footer = (props) => {
  return (
    <div style={{ ...props.style, ...styles.footer }}>
      <span>IBCL® - Muito Mais que Amigos</span>
      <br />
      <span>2020</span>
    </div>
  );
};

export default Footer;
