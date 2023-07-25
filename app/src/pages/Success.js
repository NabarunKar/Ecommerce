import React from "react";
import { Link } from "react-router-dom";
import { Alert, AlertTitle, Container } from "@mui/material";

function Success() {
  return (
    <Container sx={{ mt: 5 }}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Your payment is successful —{" "}
        <strong >
          <Link to="/products" className="btn-link-dark">Continue Shopping</Link>
        </strong>
      </Alert>
    </Container>
  );
}

export default Success;
