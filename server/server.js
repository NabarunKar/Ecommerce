const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

// Set up database connection Ggg2HTOeE4qMdxco
const uri =
  "mongodb+srv://soumya34:Ggg2HTOeE4qMdxco@cluster0.eiums9t.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});

// Import routes
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// const products = require("./data/products.json");

// app.get("/products", (req, res) => {
//   res.json(products);
// });

// app.get("/products/:id", (req, res) => {
//   res.json(products.find((e) => e.id == req.params.id));
// });
