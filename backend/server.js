require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Parse items and delivery from metadata
    const items = JSON.parse(metadata.items || "[]");
    const deliveryInCents = parseInt(metadata.deliveryInCents || "0", 10);
    const subtotalInCents = amount - deliveryInCents;

    // ── Save order to Supabase ──────────────────────────────────────────────
    const { error: dbError } = await supabase.from("orders").insert({
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

    if (dbError) {
      console.error("❌ Failed to save order:", dbError.message);
    } else {
      console.log("✅ Order saved:", metadata.orderId);
    }

    // ── Send confirmation email ─────────────────────────────────────────────
    const formatCurrency = (cents) =>
      `R${(cents / 100).toFixed(2)}`;

    const itemRows = items.map((item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="72" style="vertical-align: top;">
                <img
                  src="${item.image}"
                  alt="${item.name}"
                  width="64"
                  height="64"
                  style="object-fit: cover; border-radius: 4px; display: block;"
                />
              </td>
              <td style="padding-left: 12px; vertical-align: top; color: #cccccc; font-size: 14px;">
                <div style="color: #ffffff; font-weight: 600; margin-bottom: 4px;">${item.name}</div>
                <div>${item.size} &nbsp;·&nbsp; Qty: ${item.quantity}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `).join("");

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: Georgia, serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width: 560px; width: 100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img
                src="https://alluring-scents-v2.vercel.app/Alluring_scents_logo.avif"
                alt="Alluring Scents"
                width="120"
                style="display: block;"
              />
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td align="center" style="padding-bottom: 32px; border-bottom: 1px solid #2a2a2a;">
              <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: normal; color: #ffffff; letter-spacing: 2px;">
                Thank You, ${metadata.firstName}.
              </h1>
              <p style="margin: 0; font-size: 14px; color: #888888; letter-spacing: 1px;">
                YOUR ORDER HAS BEEN CONFIRMED
              </p>
            </td>
          </tr>

          <!-- Order ID -->
          <tr>
            <td style="padding: 24px 0 8px;">
              <p style="margin: 0; font-size: 12px; color: #666666; letter-spacing: 1px; text-transform: uppercase;">Order Reference</p>
              <p style="margin: 4px 0 0; font-size: 20px; color: #c9a84c; letter-spacing: 2px;">${metadata.orderId}</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding: 8px 0;"><hr style="border: none; border-top: 1px solid #2a2a2a;" /></td></tr>

          <!-- Items -->
          <tr>
            <td>
              <p style="margin: 0 0 12px; font-size: 12px; color: #666666; letter-spacing: 1px; text-transform: uppercase;">Your Order</p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${itemRows}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding: 8px 0;"><hr style="border: none; border-top: 1px solid #2a2a2a;" /></td></tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 16px 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size: 13px; color: #888888; padding-bottom: 8px;">Subtotal</td>
                  <td align="right" style="font-size: 13px; color: #cccccc; padding-bottom: 8px;">${formatCurrency(subtotalInCents)}</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #888888; padding-bottom: 8px;">Delivery</td>
                  <td align="right" style="font-size: 13px; color: #cccccc; padding-bottom: 8px;">${formatCurrency(deliveryInCents)}</td>
                </tr>
                <tr>
                  <td style="font-size: 15px; color: #ffffff; font-weight: bold; padding-top: 8px; border-top: 1px solid #2a2a2a;">Total</td>
                  <td align="right" style="font-size: 15px; color: #c9a84c; font-weight: bold; padding-top: 8px; border-top: 1px solid #2a2a2a;">${formatCurrency(amount)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Address -->
          <tr>
            <td style="padding: 16px 0; border-top: 1px solid #2a2a2a;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #666666; letter-spacing: 1px; text-transform: uppercase;">Delivering To</p>
              <p style="margin: 0; font-size: 13px; color: #cccccc; line-height: 1.8;">
                ${metadata.firstName} ${metadata.lastName}<br/>
                ${metadata.address}<br/>
                ${metadata.city}, ${metadata.province}, ${metadata.postalCode}
              </p>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td align="center" style="padding: 32px 0; border-top: 1px solid #2a2a2a;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #888888; font-style: italic;">
                Your trust in Alluring Scents is the greatest compliment we could've gotten.
              </p>
              <p style="margin: 0; font-size: 13px; color: #666666;">
                You smell scent-sational. 🖤
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0; font-size: 11px; color: #444444; letter-spacing: 1px;">
                © ${new Date().getFullYear()} ALLURING SCENTS &nbsp;·&nbsp; South Africa
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: metadata.email,
      subject: `Order Confirmed — ${metadata.orderId} | Alluring Scents`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("❌ Failed to send email:", emailError.message);
    } else {
      console.log("📧 Confirmation email sent to:", metadata.email);
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