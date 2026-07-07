require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// ─── Supabase ─────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use("/webhook", express.raw({ type: "application/json" }));
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

app.post("/webhook", async (req, res) => {
  const secret = process.env.YOCO_WEBHOOK_SECRET;
  const signature = req.headers["webhook-signature"];
  const webhookId = req.headers["webhook-id"];
  const webhookTimestamp = req.headers["webhook-timestamp"];

  if (!signature || !webhookId || !webhookTimestamp) {
    console.warn("Webhook rejected — missing headers.");
    return res.status(401).json({ error: "Unauthorized." });
  }

  const signedContent = `${webhookId}.${webhookTimestamp}.${req.body.toString()}`;
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

    const { error } = await supabase.from("orders").insert({
      order_id: metadata.orderId,
      first_name: metadata.firstName,
      last_name: metadata.lastName,
      email: metadata.email,
      phone: metadata.phone,
      address: metadata.address,
      city: metadata.city,
      province: metadata.province,
      postal_code: metadata.postalCode,
      amount_in_cents: amount,
      checkout_id: metadata.checkoutId,
    });

    if (error) {
      console.error("❌ Failed to save order:", error.message);
    } else {
      console.log("✅ Order saved:", metadata.orderId);
    }
  }

  res.json({ received: true });
});

// ─── Get Order ────────────────────────────────────────────────────────────────

app.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", orderId)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Order not found." });
  }

  res.json(data);
});

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});