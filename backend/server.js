require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Raw body parser MUST come before json — needed for webhook signature verification
app.use(
  "/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  })
);

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({ status: "Fragrance store backend is running." });
});

// ─── Create Yoco Checkout ─────────────────────────────────────────────────────

app.post("/create-checkout", async (req, res) => {
  const { amountInCents, currency, cancelUrl, successUrl, metadata } = req.body;

  if (!amountInCents || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const response = await axios.post(
      "https://payments.yoco.com/api/checkouts",
      {
        amount: amountInCents,
        currency: currency || "ZAR",
        successUrl,
        cancelUrl,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { id, redirectUrl } = response.data;
    res.json({ checkoutId: id, redirectUrl });
  } catch (err) {
    console.error("Yoco checkout error:", err.response?.data || err.message);
    res.status(500).json({ error: "Could not create checkout session." });
  }
});

// ─── Yoco Webhook ─────────────────────────────────────────────────────────────

const crypto = require("crypto");

app.post("/webhook", (req, res) => {
  const secret = process.env.YOCO_WEBHOOK_SECRET;
  const signature = req.headers["webhook-signature"];

  if (!signature) {
    console.warn("Webhook rejected — no signature header.");
    return res.status(401).json({ error: "Unauthorized." });
  }

    // Strip the "v1," prefix Yoco sends
    const rawSignature = signature.startsWith("v1,")
    ? signature.slice(3)
    : signature;

  // Yoco signs the raw body with HMAC-SHA256
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.body)
    .digest("base64");

  if (rawSignature !== expectedSignature) {
    console.warn("Webhook rejected — signature mismatch.");
    console.warn("Received:", rawSignature);
    console.warn("Expected:", expectedSignature);
    return res.status(401).json({ error: "Unauthorized." });
  }

  let event;
  try {
    event = JSON.parse(req.body.toString());
  } catch {
    return res.status(400).json({ error: "Invalid JSON." });
  }

  console.log("Webhook received:", event.type);

  if (event.type === "payment.succeeded") {
    const { metadata, amountInCents } = event.payload;
    console.log("✅ Payment succeeded:", { metadata, amountInCents });
  }

  res.json({ received: true });
});


// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});