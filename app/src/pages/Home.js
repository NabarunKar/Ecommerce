import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Marquee from "react-fast-marquee";
import { useProductContext } from "../contexts/ProductContext";
import {
  Paper,
  Container,
  CardMedia,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

function Home() {
  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
  ];

  const { products } = useProductContext();

  return (
    <Container sx={{ mb: 10 }}>
      <Carousel>
        {items.map((item, i) => (
          <Paper key={i} elevation={0}>
            <CardMedia
              component="img"
              image={item.image}
              sx={{
                objectFit: "contain",
                height: "400px",
                margin: "auto",
              }}
            />
          </Paper>
        ))}
      </Carousel>
      <Container sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="h4">
          Here's our featured items. Start <Link to="/products">Shopping</Link>
        </Typography>
      </Container>
      {products && (
        <Marquee pauseOnHover>
          {products.slice(0, 5).map((ele) => (
            <Link to={`/products/${ele._id}`}>
              <Card
                sx={{
                  mx: 2,
                  p: 2,
                  width: "200px",
                  height: "250px",
                  border: "1px solid",
                  borderColor: "rgba(0,0,0,0.2)",
                }}
                elevation={0}
              >
                <CardMedia
                  component="img"
                  image={ele.thumbnail}
                  sx={{
                    height: "150px",
                    margin: "auto",
                  }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" noWrap>
                    {ele.brand}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Marquee>
      )}
    </Container>
  );
}

export default Home;
