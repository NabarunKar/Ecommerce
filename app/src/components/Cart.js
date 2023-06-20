import React from "react";
import { useCartContext } from "../contexts/CartContext";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
            <span>${Math.round(total_amount * 100) / 100}</span>
          </Box>
          // <>
          //   {total_item} Items - ${total_amount}
          // </>
        )}
      </DialogTitle>
      <DialogContent>
        {cart.length > 0 && (
          <div>
            <table>
              <tbody>
                {cart.map((ele) => (
                  <tr key={ele.cartItemId}>
                    <td>
                      <Paper variant="outlined" sx={{ padding: "5px" }}>
                        <CardMedia
                          component="img"
                          image={ele.thumbnail}
                          sx={{
                            width: "auto",
                            height: "50px",
                            minHeight: "50px",
                            margin: "auto",
                          }}
                        />
                      </Paper>
                    </td>
                    <td>
                      <Typography variant="body1">{ele.title}</Typography>
                    </td>
                    {/* <td>{ele.price}</td> */}
                    {ele.color && (
                      <td>
                        <CircleIcon style={{ color: `${ele.color}` }} />
                      </td>
                    )}
                    {ele.size && (
                      <Box
                        display="flex"
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
                    <td>
                      <IconButton
                        disabled={ele.quantity == 1}
                        onClick={() => {
                          decrementQuantity(ele.cartItemId);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Box
                        display="flex"
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
                    </td>
                    <td>
                      <Typography variant="h6">
                        ${Math.round(ele.quantity * ele.price * 100) / 100}
                      </Typography>
                    </td>
                    <td>
                      <IconButton
                        onClick={() => {
                          removeFromCart(ele.cartItemId);
                        }}
                      >
                        <DeleteIcon color="warning" />
                      </IconButton>
                    </td>
                    <td>
                      <Button>Buy</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="success" disabled={cart.length == 0}>
          Checkout
        </Button>
        <Button
          color="warning"
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
