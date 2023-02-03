const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const products = require("./data/products.json");

const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  res.json(products.find((e) => e.id == req.params.id));
});

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
