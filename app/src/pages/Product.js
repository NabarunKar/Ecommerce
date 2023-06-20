import React, { useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import UseFetch from "../hooks/useFetch";
import { useCartContext } from "../contexts/CartContext";
import Reviews from "../components/Reviews";
import { useAuthContext } from "../hooks/useAuthContext";
import ReviewForm from "../components/ReviewForm";
import BackButton from "../components/BackButton";
import { Box, Button, CardMedia, Container, Grid, Paper } from "@mui/material";

function Product() {
  const { id } = useParams();

  const { user } = useAuthContext();

  const [data, isPending, error] = UseFetch(`/api/products/${id}`);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [imgArrayIndex, setImgArrayIndex] = useState(0);

  const { addToCart } = useCartContext();

  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const increaseQuantity = (stock) => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  return (
    <>
      <BackButton />
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {data && (
            <>
              <Grid item md={6}>
                <Box>
                  <Paper variant="outlined" sx={{ padding: "5px" }}>
                    <CardMedia
                      component="img"
                      image={data.images[imgArrayIndex]}
                      sx={{
                        width: "auto",
                        height: "400px",
                        minHeight: "50px",
                        margin: "auto",
                      }}
                    />
                  </Paper>
                </Box>
                {data.images.map((e, id) => (
                  <Button
                    onClick={() => {
                      setImgArrayIndex(id);
                    }}
                  >
                    <Paper variant="outlined" sx={{ padding: "5px" }}>
                      <CardMedia
                        component="img"
                        image={e}
                        sx={{
                          width: "auto",
                          height: "50px",
                          minHeight: "50px",
                          margin: "auto",
                        }}
                      />
                    </Paper>
                  </Button>
                ))}
              </Grid>
              <Grid item md={6}>
                <Container>
                  {color && (
                    <h3>
                      Your chosen color is
                      <button
                        style={{
                          background: `${color}`,
                          width: "50px",
                          height: "50px",
                        }}
                      ></button>
                    </h3>
                  )}
                  {size && <h3>Your chosen size is {size}</h3>}
                  {data.stock > 0 && (
                    <>
                      <button
                        disabled={quantity == 1}
                        onClick={() => decreaseQuantity()}
                      >
                        -
                      </button>
                      {quantity}
                      <button
                        disabled={quantity == data.stock}
                        onClick={() => increaseQuantity(data.stock)}
                      >
                        +
                      </button>
                      <br />
                      <button
                        onClick={() => {
                          addToCart({
                            productId: data._id,
                            thumbnail: data.thumbnail,
                            title: data.title,
                            price: data.price,
                            quantity: quantity,
                            color: color,
                            size: size,
                          });
                        }}
                        disabled={
                          (data.colors.length > 0 && !color) ||
                          (data.sizes.length > 0 && !size)
                        }
                      >
                        Add to cart
                      </button>
                    </>
                  )}
                  {data.colors &&
                    data.colors.map((ele) => (
                      <li key={ele}>
                        <button
                          style={{
                            background: `${ele}`,
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          onClick={() => setColor(ele)}
                        ></button>
                      </li>
                    ))}
                  {data.sizes &&
                    data.sizes.map((ele) => (
                      <li key={ele}>
                        <button
                          style={{
                            width: "50px",
                            height: "50px",
                            padding: "5px",
                          }}
                          onClick={() => setSize(ele)}
                        >
                          {ele}
                        </button>
                      </li>
                    ))}

                  <br />
                  {/* <img src={data.thumbnail} alt="" /> */}
                  <h1>{data.title}</h1>
                  <h3>Price: ${data.price}</h3>
                  {data.stock > 0 ? (
                    <button>Buy</button>
                  ) : (
                    <h2>Out of stock</h2>
                  )}
                  <p>{data.description}</p>
                </Container>
              </Grid>
              <Grid md={12}>{user && <ReviewForm id={id} />}</Grid>
              <Grid md={12}>All reviews</Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Product;
