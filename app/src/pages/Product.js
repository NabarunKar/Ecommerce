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
import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {data && (
            <>
              <Grid item md={6} order={{ xs: 2, md: 1 }}>
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
              <Grid item md={6} order={{ xs: 1, md: 2 }}>
                <Container>
                  {/* <img src={data.thumbnail} alt="" /> */}
                  <Typography variant="h4">{data.title}</Typography>
                  <Typography variant="h4">
                    ${data.price}{" "}
                    {color && <CircleIcon style={{ color: `${color}` }} />}{" "}
                    {size && (
                      <Box
                        display="inline-flex"
                        justifyContent="center"
                        alignItems="center"
                        width={40}
                        height={40}
                        border="solid 2px rgba(0,0,0,0.5)"
                        borderRadius="50%"
                      >
                        <Typography variant="body1">{size}</Typography>
                      </Box>
                    )}
                  </Typography>
                  {/* <h3>Price: ${data.price}</h3> */}

                  <Container sx={{ mt: 2 }}>
                    {data.colors.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          sx={{ color: "rgba(0,0,0,0.5)", display: "inline" }}
                        >
                          Colors
                        </Typography>
                        {data.colors.map((ele) => (
                          <IconButton onClick={() => setColor(ele)}>
                            <CircleIcon style={{ color: `${ele}` }} />
                          </IconButton>
                        ))}
                      </>
                    )}
                  </Container>
                  <Container>
                    {data.sizes.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          sx={{ color: "rgba(0,0,0,0.5)", display: "inline" }}
                        >
                          Sizes
                        </Typography>
                        {data.sizes.map((ele) => (
                          <IconButton onClick={() => setSize(ele)}>
                            <Box
                              display="inline-flex"
                              justifyContent="center"
                              alignItems="center"
                              width={40}
                              height={40}
                              border="solid 2px rgba(0,0,0,0.5)"
                              borderRadius="50%"
                            >
                              <Typography variant="body1">{ele}</Typography>
                            </Box>
                          </IconButton>
                        ))}
                      </>
                    )}
                  </Container>
                  <Divider sx={{ mt: 2 }} />
                  <Container sx={{ my: 2 }}>
                    {data.stock > 0 && (
                      <>
                        <IconButton
                          disabled={quantity == 1}
                          onClick={() => decreaseQuantity()}
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
                          borderRadius="50%"
                        >
                          <Typography variant="body1">{quantity}</Typography>
                        </Box>
                        <IconButton
                          disabled={quantity == data.stock}
                          onClick={() => increaseQuantity(data.stock)}
                        >
                          <AddIcon />
                        </IconButton>

                        <Button
                          disableElevation
                          variant="text"
                          color="secondary"
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
                        </Button>
                      </>
                    )}
                  </Container>
                  <Container sx={{ mb: 2 }}>
                    {data.stock > 0 ? (
                      <Button
                        fullWidth
                        disableElevation
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={
                          (data.colors.length > 0 && !color) ||
                          (data.sizes.length > 0 && !size)
                        }
                      >
                        Buy
                      </Button>
                    ) : (
                      <h2>Out of stock</h2>
                    )}
                  </Container>
                  <p>{data.description}</p>
                </Container>
              </Grid>
              {/* <Grid md={12} order={{ xs: 3 }}>
                {user && <ReviewForm id={id} />}
              </Grid> */}
              {/* <Grid md={12}>All reviews</Grid> */}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Product;
