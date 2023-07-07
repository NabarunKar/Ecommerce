import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  let data = props.data;
  return (
    <Grid item key={data._id}>
      <Card
        sx={{ maxWidth: 345}}
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
      </Card>
    </Grid>
  );
}

export default ProductCard;
