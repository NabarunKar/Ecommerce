const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");

const server = http.createServer(app);

app.get("/products", (req, res) => {
  res.json({ products: ["p1", "p2", "p3", "p4"] });
});

app.listen(5000, () => {
  console.table(
    {
      port:5000,
      date:Date()
    }
  );
});
