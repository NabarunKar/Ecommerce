import React from "react";
import { useHistory } from "react-router-dom";

function BackButton() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }
  return <button onClick={handleClick}>Go Back</button>;
}

export default BackButton;
