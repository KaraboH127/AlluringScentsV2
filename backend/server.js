require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

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

app.post("/webhook", (req, res) => {
  const secret = process.env.YOCO_WEBHOOK_SECRET;
  const signature = req.headers["webhook-signature"];
  const webhookId = req.headers["webhook-id"];
  const webhookTimestamp = req.headers["webhook-timestamp"];

  if (!signature || !webhookId || !webhookTimestamp) {
    console.warn("Webhook rejected — missing headers.");
    return res.status(401).json({ error: "Unauthorized." });
  }

  // Build the signed content exactly as Yoco does
  const signedContent = `${webhookId}.${webhookTimestamp}.${req.body.toString()}`;

  // Strip "whsec_" prefix and decode from base64
  const secretBuffer = Buffer.from(secret.replace("whsec_", ""), "base64");

  const expectedSignature = crypto
    .createHmac("sha256", secretBuffer)
    .update(signedContent)
    .digest("base64");

  const rawSignature = signature.startsWith("v1,")
    ? signature.slice(3)
    : signature;

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
      const { metadata, amount } = event.payload;
      console.log("✅ Payment succeeded:", { metadata, amountInCents: amount });
    }

  res.json({ received: true });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});