import React from "react";
import PropTypes from "prop-types";

const PlaceItem = (props) => {
  return (
    <div
      style={{
        padding: "14px",
        backgroundColor: "#00796b",
        borderRadius: "10px",
        marginRight: "10px",
        color: "#fff",
        fontStyle: "bold",
        marginTop: "10px"
      }}
    >
      {props.posicao}
    </div>
  );
};

PlaceItem.propTypes = {};

export default PlaceItem;
