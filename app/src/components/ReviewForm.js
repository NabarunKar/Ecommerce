import {
  Alert,
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
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { usePost } from "../hooks/usePost";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDelete } from "../hooks/useDelete";

function ReviewForm({ open, handleClose, data, productId }) {
  const { user } = useAuthContext();

  const [value, setValue] = useState(data.rating);
  const [content, setContent] = useState(data.text);

  const [post, isPending, error] = usePost(`/api/reviews/${productId}`);
  const [deleteReq, isDeletePending, deleteError] = useDelete(
    `/api/reviews/${productId}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await post(
      {
        rating: value,
        text: content,
      },
      user.token
    );
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteReq(user.token).then((res) => {
      setValue(null);
      setContent("");
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Your Review</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {deleteError && <Alert severity="error">{deleteError}</Alert>}
        <DialogContentText>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            disabled={isPending}
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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          disabled={isPending}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <LoadingButton
          onClick={handleDelete}
          loading={isDeletePending}
          loadingPosition="center"
          variant="text"
        >
          Delete
        </LoadingButton>
        <LoadingButton
          onClick={handleSubmit}
          loading={isPending}
          loadingPosition="center"
          variant="text"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewForm;
