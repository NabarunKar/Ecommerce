import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useAuthContext } from "../hooks/useAuthContext";

function ProductCard(props) {
  const { user } = useAuthContext();
  let data = props.data;
  return (
    <Grid item key={data._id}>
      <Card
        sx={{ maxWidth: 345 }}
        elevation={0}
        style={{ border: "1px solid", borderColor: "rgba(0,0,0,0.2)" }}
      >
        <Link className="btn-link-dark" to={`/products/${data._id}`}>
          <CardHeader title={data.title} subheader={data.brand} />
        </Link>
        <CardMedia
          component="img"
          alt={data.title}
          image={data.thumbnail}
          sx={{
            width: "auto",
            height: "200px",
            minHeight: "200px",
            margin: "auto",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${data.price}
          </Typography>
          {data.reviews.length > 0 && (
            <Rating
              name="read-only"
              value={
                data.reviews.reduce((acc, ele) => acc + ele.rating, 0) /
                data.reviews.length
              }
              precision={0.1}
              readOnly
            />
          )}
          <Typography noWrap>{data.description}</Typography>
        </CardContent>
        <CardActions>
          {user && (
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          )}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
