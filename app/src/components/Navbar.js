import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../contexts/CartContext";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout } = useLogout();

  const { user } = useAuthContext();

  const { total_item } = useCartContext();

  const handleClick = () => {
    logout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="btn-link" to="/">
              Shop
            </Link>
          </Typography>

          <Badge badgeContent={total_item} color="secondary">
            <Link className="btn-link" to="/cart">
              <ShoppingCartIcon />
            </Link>
          </Badge>

          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link className="btn-link-dark" to="/profile">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClick}>Log out</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <Button color="inherit">
              <Link className="btn-link" to="/login">
                Log In
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
