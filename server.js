const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS
// app.use(
//   cors({
//     origin: true,
//   })
// );

// Set up database connection
// Secret Key: Ggg2HTOeE4qMdxco
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

// Start server
const port = process.env.PORT;
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
