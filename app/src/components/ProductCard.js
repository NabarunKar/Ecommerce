import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

function ProductCard(props) {
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
          height="200"
          image={data.thumbnail}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description.slice(0, 120)} ...
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
        </CardActions>
        {/* <Link to={`/products/${data._id}`}>
        <h2>{data.title}</h2>
      </Link>
      <h3>Price: ${data.price}</h3>
      <img src={data.thumbnail} alt="" /> */}
      </Card>
    </Grid>
  );
}

export default ProductCard;
