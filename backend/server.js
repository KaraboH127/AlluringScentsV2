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

  console.log("=== WEBHOOK DEBUG ===");
  console.log("Raw secret from env:", secret);
  console.log("Signature header:", signature);
  console.log("Body type:", typeof req.body);
  console.log("Body is Buffer:", Buffer.isBuffer(req.body));
  console.log("Body toString:", req.body.toString());

  // Try all combinations
  const rawSignature = signature.startsWith("v1,") ? signature.slice(3) : signature;

  const attempt1 = crypto.createHmac("sha256", secret).update(req.body).digest("base64");
  const attempt2 = crypto.createHmac("sha256", secret).update(req.body).digest("hex");
  const attempt3 = crypto.createHmac("sha256", Buffer.from(secret, "base64")).update(req.body).digest("base64");
  const attempt4 = crypto.createHmac("sha256", Buffer.from(secret, "base64")).update(req.body).digest("hex");

  console.log("Raw signature:", rawSignature);
  console.log("Attempt 1 (secret as-is, base64):", attempt1);
  console.log("Attempt 2 (secret as-is, hex):", attempt2);
  console.log("Attempt 3 (secret decoded, base64):", attempt3);
  console.log("Attempt 4 (secret decoded, hex):", attempt4);
  console.log("Match 1:", rawSignature === attempt1);
  console.log("Match 2:", rawSignature === attempt2);
  console.log("Match 3:", rawSignature === attempt3);
  console.log("Match 4:", rawSignature === attempt4);
  console.log("=== END DEBUG ===");

  res.json({ received: true });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});