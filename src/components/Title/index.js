import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const Title = (props) => {
  return (
    <Typography style={{ fontSize: "2.5em" }}>{props.children}</Typography>
  );
};

Title.propTypes = {};

export default Title;
