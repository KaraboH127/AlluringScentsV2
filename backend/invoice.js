const PDFDocument = require("pdfkit");
const axios = require("axios");

const GOLD  = "#C9A66B";
const BLACK = "#0a0a0a";
const GREY  = "#888888";
const LIGHT = "#f9f9f9";
const WHITE = "#ffffff";

const LOGO_URL = "https://alluring-scents-v2.vercel.app/Alluring_scents_logo.webp";

// Collection prices — used to calculate per-item amounts
const PRICES = {
  standard: { "10ml": 120, "50ml": 400,  "100ml": 700  },
  private:  { "10ml": 200, "50ml": 600,  "100ml": 1100 },
};

const FRAGRANCE_COLLECTIONS = {
  "lush": "standard", "whiskey-sour": "standard", "velvet-nectar": "standard",
  "midnight-oud": "standard", "purple-rain": "standard", "taboo": "standard",
  "ocean-eyes": "standard", "fresh": "standard",
  "9-lives": "private", "golden-amber": "private",
  "island-water": "private", "signature": "private",
};

function getItemPrice(item) {
  // Try to find price from fragrance name -> collection -> size
  const slug = item.name?.toLowerCase().replace(/\s+/g, "-");
  const collection = FRAGRANCE_COLLECTIONS[slug];
  if (collection && PRICES[collection] && PRICES[collection][item.size]) {
    return PRICES[collection][item.size] * 100 * (item.quantity || 1);
  }
  return null;
}

function fmt(cents) {
  return `R${(cents / 100).toFixed(2)}`;
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// Normalize order fields — handles both snake_case (Supabase) and camelCase (webhook metadata)
function normalizeOrder(order) {
  return {
    order_id:    order.order_id   ?? order.orderId,
    first_name:  order.first_name ?? order.firstName,
    last_name:   order.last_name  ?? order.lastName,
    email:       order.email,
    phone:       order.phone,
    address:     order.address,
    city:        order.city,
    province:    order.province,
    postal_code: order.postal_code ?? order.postalCode,
    amount_in_cents: order.amount_in_cents ?? order.amountInCents,
    status:      order.status ?? "succeeded",
    created_at:  order.created_at ?? new Date().toISOString(),
    items:       order.items ?? [],
  };
}

async function generateInvoice(rawOrder) {
  const order = normalizeOrder(rawOrder);

  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        info: {
          Title: `Invoice ${order.order_id}`,
          Author: "Alluring Scents",
        },
      });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end",  () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      const W  = doc.page.width;
      const H  = doc.page.height;
      const M  = 50;
      const CW = W - M * 2;

      // ── Dark header band ────────────────────────────────────────────────
      doc.rect(0, 0, W, 110).fill(BLACK);

      // Logo
      try {
        const res = await axios.get(LOGO_URL, { responseType: "arraybuffer" });
        doc.image(Buffer.from(res.data), M, 25, { width: 55 });
      } catch {
        doc.font("Helvetica-Bold").fontSize(16).fillColor(WHITE)
          .text("ALLURING SCENTS", M, 38);
      }

      // Brand name + tagline next to logo
      doc.font("Helvetica-Bold").fontSize(13).fillColor(WHITE)
        .text("ALLURING SCENTS", M + 65, 30);
      doc.font("Helvetica").fontSize(8).fillColor(GREY)
        .text("Extrait de Parfum  |  South Africa  |  Est. 2024", M + 65, 48);

      // INVOICE label (top right)
      doc.font("Helvetica-Bold").fontSize(26).fillColor(GOLD)
        .text("INVOICE", 0, 32, { align: "right", width: W - M });

      // Gold accent line at bottom of header
      doc.rect(0, 108, W, 2).fill(GOLD);

      // ── Invoice meta row ────────────────────────────────────────────────
      const metaY = 130;

      // Left: invoice number + date
      doc.font("Helvetica-Bold").fontSize(7).fillColor(GREY)
        .text("INVOICE NUMBER", M, metaY);
      doc.font("Helvetica-Bold").fontSize(12).fillColor(BLACK)
        .text(order.order_id, M, metaY + 10);

      doc.font("Helvetica-Bold").fontSize(7).fillColor(GREY)
        .text("DATE ISSUED", M + 130, metaY);
      doc.font("Helvetica").fontSize(10).fillColor(BLACK)
        .text(fmtDate(order.created_at), M + 130, metaY + 10);

      // Right: status badge
      const statusText = order.status.toUpperCase();
      const badgeX = W - M - 80;
      doc.rect(badgeX, metaY, 80, 22).fill(order.status === "shipped" ? "#16a34a" : "#c9a84c");
      doc.font("Helvetica-Bold").fontSize(8).fillColor(WHITE)
        .text(statusText, badgeX, metaY + 7, { width: 80, align: "center" });

      // Thin divider
      doc.rect(M, metaY + 36, CW, 0.5).fill("#e5e5e5");

      // ── Bill to / Deliver to ────────────────────────────────────────────
      const billY = metaY + 52;

      doc.font("Helvetica-Bold").fontSize(7).fillColor(GREY)
        .text("BILLED TO", M, billY);
      doc.font("Helvetica-Bold").fontSize(11).fillColor(BLACK)
        .text(`${order.first_name} ${order.last_name}`, M, billY + 12);
      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text(order.email,    M, billY + 26)
        .text(order.phone,    M, billY + 38);

      doc.font("Helvetica-Bold").fontSize(7).fillColor(GREY)
        .text("DELIVERY ADDRESS", M + 200, billY);
      doc.font("Helvetica").fontSize(9).fillColor(BLACK)
        .text(order.address,  M + 200, billY + 12)
        .text(`${order.city}, ${order.province}`, M + 200, billY + 24)
        .text(order.postal_code ?? "", M + 200, billY + 36);

      // From address (right column)
      doc.font("Helvetica-Bold").fontSize(7).fillColor(GREY)
        .text("FROM", M + 370, billY);
      doc.font("Helvetica").fontSize(9).fillColor(BLACK)
        .text("Alluring Notes T/A", M + 370, billY + 12)
        .text("Alluring Scents",    M + 370, billY + 24);
      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text("26 Whitney Road",    M + 370, billY + 36)
        .text("Hazelhurst, JHB",    M + 370, billY + 48);

      // ── Items table ─────────────────────────────────────────────────────
      const tableY = billY + 80;

      // Table header
      doc.rect(M, tableY, CW, 26).fill(BLACK);
      doc.font("Helvetica-Bold").fontSize(8).fillColor(WHITE)
        .text("DESCRIPTION",  M + 10,       tableY + 9)
        .text("SIZE",          M + 240,      tableY + 9)
        .text("QTY",           M + 300,      tableY + 9)
        .text("UNIT PRICE",    M + 350,      tableY + 9)
        .text("TOTAL",         W - M - 55,   tableY + 9);

      // Items
      const items = order.items ?? [];
      let rowY = tableY + 32;

      for (let i = 0; i < items.length; i++) {
        const item      = items[i];
        const unitCents = getItemPrice({ ...item, quantity: 1 });
        const totCents  = getItemPrice(item);

        // Alternating row background
        if (i % 2 === 0) {
          doc.rect(M, rowY - 5, CW, 24).fill(LIGHT);
        }

        doc.font("Helvetica-Bold").fontSize(9).fillColor(BLACK)
          .text(item.name, M + 10, rowY);
        doc.font("Helvetica").fontSize(9).fillColor(GREY)
          .text(item.size,                         M + 240,    rowY)
          .text(String(item.quantity),              M + 300,    rowY)
          .text(unitCents ? fmt(unitCents) : "—",  M + 350,    rowY);
        doc.font("Helvetica-Bold").fontSize(9).fillColor(BLACK)
          .text(totCents ? fmt(totCents) : "—",    W - M - 55, rowY);

        rowY += 26;
      }

      // ── Totals block ────────────────────────────────────────────────────
      rowY += 12;
      doc.rect(M, rowY, CW, 0.5).fill("#e5e5e5");
      rowY += 16;

      const delivery = 9500;
      const subtotal = order.amount_in_cents - delivery;
      const totX     = W - M - 160;
      const amtX     = W - M - 55;

      // Subtotal
      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text("Subtotal",  totX, rowY)
        .text(fmt(subtotal), amtX, rowY, { align: "right", width: 55 });
      rowY += 18;

      // Delivery
      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text("Delivery",  totX, rowY)
        .text(fmt(delivery), amtX, rowY, { align: "right", width: 55 });
      rowY += 16;

      // Total divider
      doc.rect(totX, rowY, 160, 0.5).fill(GOLD);
      rowY += 10;

      // Total row — gold background
      doc.rect(totX - 10, rowY - 4, 170, 28).fill(GOLD);
      doc.font("Helvetica-Bold").fontSize(11).fillColor(WHITE)
        .text("TOTAL", totX, rowY + 4)
        .text(fmt(order.amount_in_cents), totX, rowY + 4, { align: "right", width: 150 });

      // ── Footer band ──────────────────────────────────────────────────────
      doc.rect(0, H - 70, W, 70).fill(BLACK);
      doc.rect(0, H - 70, W, 2).fill(GOLD);

      doc.font("Helvetica-Bold").fontSize(9).fillColor(WHITE)
        .text("Thank you for choosing Alluring Scents.", 0, H - 52, {
          align: "center", width: W,
        });
      doc.font("Helvetica").fontSize(8).fillColor(GREY)
        .text("Your trust is the greatest compliment we could have gotten. You smell scent-sational.", 0, H - 36, {
          align: "center", width: W,
        })
        .text("alluringscents6@gmail.com  |  alluring-scents.co.za", 0, H - 22, {
          align: "center", width: W,
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateInvoice };