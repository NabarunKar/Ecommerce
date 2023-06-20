import { IconButton } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        m: 2,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "inline-flex",
        position: "absolute",
        left: "25px",
        top: "50px",
        border: "solid 2px rgba(0,0,0,0.5)",
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;
