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
      size="large"
      edge="start"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;
