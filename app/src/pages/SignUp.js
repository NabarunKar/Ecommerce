import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link, useHistory } from "react-router-dom";
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

const SignUp = () => {
  const routerHistory = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { signup, error, isPending } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);
    await signup(user).then((res) => {
      setUser(null);
      routerHistory.replace("/");
    });
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
              id="outlined-name-input"
              label="Name"
              type="text"
              defaultValue={user.name}
              helperText="e.g. John Doe"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              required={true}
            />
            <TextField
              disabled={isPending}
              id="outlined-email-input"
              label="Email"
              type="email"
              defaultValue={user.email}
              helperText="e.g. name@gmail.com"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              required={true}
            />
            <TextField
              disabled={isPending}
              id="outlined-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              defaultValue={user.password}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
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
            {!isPending && <Link to="/login">Already have a account?</Link>}

            {!isPending && (
              <Button type="submit" variant="text" color="primary">
                Sign Up
              </Button>
            )}

            {isPending && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            {error && (
              <Container>
                <Alert severity="error">{error}</Alert>
              </Container>
            )}
          </Box>
        </Container>
      </Grid>
    </Grid>
    // <form onSubmit={handleSubmit}>
    //   <h3>Sign Up</h3>

    //   <label>Name</label>
    //   <input
    //     type="text"
    //     onChange={(e) =>
    //       setUser((prevState) => ({ ...prevState, name: e.target.value }))
    //     }
    //     value={user.name}
    //   />

    //   <label>Email</label>
    //   <input
    //     type="email"
    //     onChange={(e) =>
    //       setUser((prevState) => ({ ...prevState, email: e.target.value }))
    //     }
    //     value={user.email}
    //   />

    //   <label>Password</label>
    //   <input
    //     type="password"
    //     onChange={(e) =>
    //       setUser((prevState) => ({ ...prevState, password: e.target.value }))
    //     }
    //     value={user.password}
    //   />
    //   <button disabled={isPending}>SignUp</button>
    //   {error && <div>{error}</div>}
    // </form>
  );
};

export default SignUp;
