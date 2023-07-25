import React from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "@mui/material";

function Success() {
  return (
    <Container sx={{ mt: 5 }}>
      <Alert severity="success">Payment Successful!</Alert>
      <Container sx={{ my: 5, textAlign: "center" }}>
        <Link to="/products">Continue Shopping</Link>
      </Container>
    </Container>
  );
}

export default Success;
