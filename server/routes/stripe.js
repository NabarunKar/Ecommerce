const express = require("express");
const Stripe = require("stripe");
const Product = require("../models/Product");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const bodyParser = require("body-parser");

let endpointSecret;
endpointSecret =
  "whsec_d8680c891071c5d18537837d6b457910d2e0d4985744290f41862290bca71893";

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("event triggered");
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          console.log(customer);
          console.log("Data: ", data);
        })
        .catch((err) => console.log(err.message));
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
      cart: JSON.stringify(req.body.items),
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
