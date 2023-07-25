import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";

function Profile() {
  const { user } = useAuthContext();

  return (
    <Box p={2}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent={"center"}
        sx={{ mt: 5 }}
      >
        <Grid item>
          <Avatar>{user.name[0]}</Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Grid>
      </Grid>
      <Container sx={{ textAlign: "center", mt: 2 }}>
        <Link to="/orders">My Orders</Link>
      </Container>
    </Box>
  );
}

export default Profile;
