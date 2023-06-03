import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    await login(email, password);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={12}>
        <Container maxWidth="sm">
          {/* {isPending && <h1>Logging in...</h1>} */}
          {!user && (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "& > :not(style)": { m: 1 },
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                disabled={isPending}
                id="outlined-email-input"
                label="Email"
                type="email"
                defaultValue={email}
                helperText="e.g. name@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />

              <TextField
                disabled={isPending}
                id="outlined-password-input"
                label="Password"
                type={showPassword ? "text" : "password"}
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {!isPending && <Link to="/signup">Create a new account</Link>}

              {!isPending && (
                <Button type="submit" variant="text" color="primary">
                  Log In
                </Button>
              )}

              {isPending && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              )}
            </Box>
          )}
          {error && (
            <Container>
              <Alert severity="error">{error}</Alert>
            </Container>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
