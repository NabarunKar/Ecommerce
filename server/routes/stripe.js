const express = require("express");
const Stripe = require("stripe");
const Product = require("../models/Product");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    let event;

    try {
      event = await stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.ENDPOINT_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err.message);
      return;
    }
    data = event.data.object;
    eventType = event.type;

    switch (event.type) {
      case "payment_intent.succeeded":
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            console.log(data.id);
            console.log(customer["metadata"].userId);
            console.log(JSON.parse(customer["metadata"].items));
          })
          .catch((err) => console.log(err.message));
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event
    res.send().end();
  }
);

router.post("/create-checkout-session", requireAuth, async (req, res) => {
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
              description: `${ele.color ? `COLOR ${ele.color}` : ""} ${
                ele.size ? `SIZE ${ele.size}` : ""
              }`,
            },
            unit_amount: product.price * 100,
          },
          quantity: ele.quantity,
        };
      }
    })
  );

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.authUserId.toString(),
      items: JSON.stringify(req.body.items),
    },
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    customer: customer.id,
    line_items: data,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-failed`,
  });

  res.json({ url: session.url });
});

module.exports = router;
