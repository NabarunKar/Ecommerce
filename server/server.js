const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: true,
  })
);

// Set up database connection
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
const reviewsRoutes = require("./routes/reviews");
const stripe = require("./routes/stripe");

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/stripe", stripe);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
