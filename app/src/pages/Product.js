import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../hooks/useFetch";
import { useCartContext } from "../contexts/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ReviewForm from "../components/ReviewForm";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFilterContext } from "../contexts/FilterContext";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

function Product() {
  const { id } = useParams();

  const { user } = useAuthContext();

  const { showByCategory } = useFilterContext();

  const [data, isPending, error] = UseFetch(`/api/products/${id}`);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [imgArrayIndex, setImgArrayIndex] = useState(0);

  // ReviewForm controls
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { addToCart, handleCheckout, isCheckoutPending, checkoutError } =
    useCartContext();

  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const increaseQuantity = (stock) => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent={"center"}>
          {error && (
            <Container sx={{ mt: 5 }}>
              <Alert severity="error">{error}</Alert>
            </Container>
          )}
          {isPending && (
            <Box sx={{ display: "flex", margin: "auto", mt: 5 }}>
              <CircularProgress />
            </Box>
          )}
          {data && (
            <>
              <Grid item md={6} order={{ xs: 2, md: 1 }}>
                <Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      padding: "5px",
                      minHeight: "400px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={data.images[imgArrayIndex]}
                      sx={{
                        objectFit: "contain",
                        maxHeight: "400px",
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
                          width: "50px",
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
                  <Typography>
                    {data.categories.map((e) => (
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          showByCategory(e);
                        }}
                      >
                        <Link to="/products">#{e.toLowerCase()}</Link>
                      </Button>
                    ))}
                  </Typography>
                  <Typography variant="h4">{data.title}</Typography>
                  {data.reviews && (
                    <>
                      <Rating
                        name="read-only"
                        value={
                          data.reviews.reduce(
                            (acc, ele) => acc + ele.rating,
                            0
                          ) / data.reviews.length
                        }
                        precision={0.1}
                        readOnly
                      />{" "}
                      ({data.reviews.length} reviews)
                    </>
                  )}
                  <Typography variant="h4">
                    ₹{data.price}{" "}
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
                      <LoadingButton
                        fullWidth
                        disableElevation
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={
                          !user ||
                          ((data.colors.length > 0 && !color) ||
                            (data.sizes.length > 0 && !size))
                        }
                        onClick={() => {
                          handleCheckout(user._id, user.token, [
                            {
                              productId: data._id,
                              color: color,
                              size: size,
                              quantity: quantity,
                            },
                          ]);
                        }}
                        loading={isCheckoutPending && !checkoutError}
                        loadingPosition="center"
                      >
                        Buy
                      </LoadingButton>
                    ) : (
                      <h2>Out of stock</h2>
                    )}
                  </Container>
                  <p style={{ textAlign: "justify" }}>{data.description}</p>
                </Container>
              </Grid>
              <Grid md={12} order={{ xs: 3 }}>
                {user && (
                  <Container
                    sx={{ my: 5, display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="text"
                      onClick={handleClickOpen}
                      size="large"
                    >
                      Your review
                    </Button>
                    <ReviewForm
                      open={open}
                      handleClose={handleClose}
                      data={
                        data.reviews.find((ele) => ele.userId === user._id) || {
                          rating: null,
                          content: "",
                        }
                      }
                      productId={id}
                    />
                  </Container>
                )}
              </Grid>
              <Grid item md={12} order={{ xs: 4 }}>
                <Container>
                  <Typography variant="h2" sx={{ my: 2 }}>
                    All reviews ({data.reviews.length})
                  </Typography>
                  <Divider />
                  <Container sx={{ my: 5 }}>
                    <Box sx={{ minWidth: 275 }}>
                      {data.reviews
                        .sort(
                          (a, b) =>
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime()
                        )
                        .map((ele) => (
                          <Card variant="outlined" sx={{ my: 2 }}>
                            <CardContent>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Typography
                                  sx={{ display: "inline-flex" }}
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  {ele.userName} ({ele.userId})
                                </Typography>
                                <Typography
                                  sx={{ display: "inline" }}
                                  gutterBottom
                                >
                                  {new Date(ele.updatedAt).toLocaleDateString(
                                    "en-GB"
                                  )}{" "}
                                  {formatAMPM(new Date(ele.updatedAt))}
                                </Typography>
                              </Box>
                              <Rating
                                name="read-only"
                                value={ele.rating}
                                readOnly
                              />
                              <Typography sx={{ mt: 2, textAlign: "justify" }}>
                                {ele.text}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                    </Box>
                  </Container>
                </Container>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Product;
