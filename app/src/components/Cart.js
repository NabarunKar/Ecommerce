import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePost } from "../hooks/usePost";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

function Cart() {
  const {
    cart,
    open,
    removeFromCart,
    clearCart,
    total_item,
    total_amount,
    incrementQuantity,
    decrementQuantity,
    closeCart,
  } = useCartContext();

  const { user } = useAuthContext();

  const [post, isPending, error] = usePost(
    "/api/stripe/create-checkout-session"
  );

  const handleCheckout = async () => {
    const checkoutData = {
      userId: user._id,
      items: cart.map((ele) => {
        return {
          productId: ele.productId,
          color: ele.color,
          size: ele.size,
          quantity: ele.quantity,
        };
      }),
    };

    window.location.href = (await post(checkoutData)).url;
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={() => {
        closeCart();
      }}
      keepMounted
    >
      <DialogTitle>
        {cart.length == 0 && <>Your cart is empty!</>}
        {cart.length > 0 && (
          <Box display="flex" justifyContent="space-between">
            <span>{total_item} Items</span>
            <span>₹{Math.round(total_amount * 100) / 100}</span>
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        {cart.length > 0 && (
          <Container>
            {cart.map((ele) => (
              <Grid container sx={{ justifyContent: "space-between", my: 2 }}>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Paper
                        variant="outlined"
                        sx={{ padding: "5px", display: "inline-flex" }}
                      >
                        <CardMedia
                          component="img"
                          image={ele.thumbnail}
                          sx={{
                            objectFit: "contain",
                            width: "50px",
                            height: "50px",
                            margin: "auto",
                          }}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={9} md={4}>
                      <Typography variant="body1">
                        {ele.title}{" "}
                        {ele.color && (
                          <CircleIcon
                            style={{
                              color: `${ele.color}`,
                            }}
                          />
                        )}
                        {ele.size && (
                          <Box
                            display="inline-flex"
                            justifyContent="center"
                            alignItems="center"
                            width={40}
                            height={40}
                            border="solid 2px rgba(0,0,0,0.5)"
                            borderRadius="50%"
                          >
                            <Typography variant="body1">{ele.size}</Typography>
                          </Box>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid
                    container
                    sx={{ justifyContent: "space-between", my: 2 }}
                  >
                    <Grid item>
                      <IconButton
                        disabled={ele.quantity == 1}
                        onClick={() => {
                          decrementQuantity(ele.cartItemId);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Box
                        display="inline-flex"
                        justifyContent="center"
                        alignItems="center"
                        width={40}
                        height={40}
                        border="solid 2px rgba(0,0,0,0.5)"
                        borderRadius="10%"
                      >
                        <Typography variant="body1">{ele.quantity}</Typography>
                      </Box>

                      <IconButton
                        disabled={ele.quantity == ele.stock}
                        onClick={() => {
                          incrementQuantity(ele.cartItemId);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        ₹{Math.round(ele.quantity * ele.price * 100) / 100}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          removeFromCart(ele.cartItemId);
                        }}
                      >
                        <DeleteIcon color="warning" />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        disableElevation
                        color="secondary"
                      >
                        Buy
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Container>
        )}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={cart.length === 0 || !user}
          onClick={() => {
            handleCheckout();
          }}
          loading={isPending && !error}
          loadingPosition="center"
          variant="text"
        >
          Checkout
        </LoadingButton>
        <Button
          disabled={cart.length == 0}
          onClick={() => {
            clearCart();
          }}
        >
          Clear All
        </Button>
        <Button onClick={closeCart} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Cart;
