import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function ReviewForm({ open, handleClose, data }) {
  const [value, setValue] = useState(data.rating);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Your Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Write your review"
          type="email"
          fullWidth
          variant="standard"
          value={data.text}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewForm;
