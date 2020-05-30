import React from "react";

import { Typography } from "@material-ui/core";

const Title = (props) => {
  return (
    <Typography style={{ fontSize: "2.5em" }}>{props.children}</Typography>
  );
};

export default Title;
