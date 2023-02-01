const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const products = require("./data/products.json");

const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.get("/products", async (req, res, next) => {
  res.json(products);
});

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
