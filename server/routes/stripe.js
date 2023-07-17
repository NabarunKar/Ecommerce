const express = require("express");
const Stripe = require("stripe");
const Product = require("../models/Product");
const router = express.Router();

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const data = await Promise.all(
    req.body.items.map(async (ele) => {
      let product = await Product.findById(ele.productId);
      if (product) {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.title,
              images: [product.thumbnail],
              description: `${ele.color ? `${ele.color}` : ""} ${
                ele.size ? `${ele.size}` : ""
              }`,
            },
            unit_amount: product.price * 100,
          },
          quantity: ele.quantity,
        };
      }
    })
  );
  const session = await stripe.checkout.sessions.create({
    line_items: data,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-failed`,
  });

  res.json({ url: session.url });
});

module.exports = router;
