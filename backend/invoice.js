const PDFDocument = require("pdfkit");
const axios = require("axios");

const GOLD = "#C9A66B";
const BLACK = "#0a0a0a";
const GREY = "#6F6F6F";
const LIGHT = "#f5f5f5";

const LOGO_URL = "https://alluring-scents-v2.vercel.app/Alluring_scents_logo.webp";

function formatCurrency(cents) {
  return `R${(cents / 100).toFixed(2)}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });
}

async function generateInvoice(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `Invoice ${order.order_id}`,
          Author: "Alluring Scents",
        },
      });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      const pageWidth  = doc.page.width;
      const pageHeight = doc.page.height;
      const margin     = 50;
      const contentWidth = pageWidth - margin * 2;

      // ── Logo ──────────────────────────────────────────────────────────────
      try {
        const response = await axios.get(LOGO_URL, { responseType: "arraybuffer" });
        const logoBuffer = Buffer.from(response.data);
        doc.image(logoBuffer, margin, margin, { width: 60 });
      } catch {
        // If logo fails, just write the brand name
        doc.font("Helvetica-Bold").fontSize(18).fillColor(BLACK)
          .text("ALLURING SCENTS", margin, margin);
      }

      // ── Brand info (top right) ─────────────────────────────────────────────
      doc.font("Helvetica").fontSize(8).fillColor(GREY)
        .text("Alluring Notes T/A Alluring Scents", margin, margin, { align: "right", width: contentWidth })
        .text("26 Whitney Road, Hazelhurst", { align: "right", width: contentWidth })
        .text("Johannesburg, South Africa", { align: "right", width: contentWidth })
        .text("alluringscents6@gmail.com", { align: "right", width: contentWidth });

      // ── Divider ───────────────────────────────────────────────────────────
      const dividerY = margin + 75;
      doc.moveTo(margin, dividerY).lineTo(pageWidth - margin, dividerY)
        .strokeColor(GOLD).lineWidth(1).stroke();

      // ── INVOICE label ──────────────────────────────────────────────────────
      doc.font("Helvetica-Bold").fontSize(28).fillColor(BLACK)
        .text("INVOICE", margin, dividerY + 20);

      // ── Invoice meta (right side) ──────────────────────────────────────────
      const metaX = pageWidth - margin - 160;
      const metaY = dividerY + 20;

      doc.font("Helvetica-Bold").fontSize(8).fillColor(GREY)
        .text("INVOICE NUMBER", metaX, metaY)
        .font("Helvetica").fontSize(10).fillColor(BLACK)
        .text(order.order_id, metaX, metaY + 12);

      doc.font("Helvetica-Bold").fontSize(8).fillColor(GREY)
        .text("DATE", metaX, metaY + 36)
        .font("Helvetica").fontSize(10).fillColor(BLACK)
        .text(formatDate(order.created_at), metaX, metaY + 48);

      doc.font("Helvetica-Bold").fontSize(8).fillColor(GREY)
        .text("STATUS", metaX, metaY + 72)
        .font("Helvetica").fontSize(10).fillColor(BLACK)
        .text(order.status.toUpperCase(), metaX, metaY + 84);

      // ── Bill to ───────────────────────────────────────────────────────────
      const billY = dividerY + 110;
      doc.font("Helvetica-Bold").fontSize(8).fillColor(GREY)
        .text("BILL TO", margin, billY);
      doc.font("Helvetica-Bold").fontSize(11).fillColor(BLACK)
        .text(`${order.first_name} ${order.last_name}`, margin, billY + 14);
      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text(order.email, margin, billY + 28)
        .text(order.phone, margin, billY + 40)
        .text(order.address, margin, billY + 52)
        .text(`${order.city}, ${order.province}, ${order.postal_code}`, margin, billY + 64);

      // ── Items table header ─────────────────────────────────────────────────
      const tableY = billY + 110;

      doc.rect(margin, tableY, contentWidth, 24)
        .fill(BLACK);

      doc.font("Helvetica-Bold").fontSize(8).fillColor("#ffffff")
        .text("ITEM", margin + 10, tableY + 8)
        .text("SIZE", margin + 280, tableY + 8)
        .text("QTY", margin + 340, tableY + 8)
        .text("AMOUNT", pageWidth - margin - 60, tableY + 8);

      // ── Items ──────────────────────────────────────────────────────────────
      const items = order.items ?? [];
      const delivery = 9500;
      const subtotal = order.amount_in_cents - delivery;

      let rowY = tableY + 30;
      let rowIndex = 0;

      for (const item of items) {
        if (rowIndex % 2 === 0) {
          doc.rect(margin, rowY - 4, contentWidth, 22).fill(LIGHT);
        }

        doc.font("Helvetica").fontSize(9).fillColor(BLACK)
          .text(item.name, margin + 10, rowY)
          .text(item.size, margin + 280, rowY)
          .text(String(item.quantity), margin + 340, rowY)
          .text("—", pageWidth - margin - 60, rowY);

        rowY += 26;
        rowIndex++;
      }

      // ── Divider before totals ──────────────────────────────────────────────
      rowY += 8;
      doc.moveTo(margin, rowY).lineTo(pageWidth - margin, rowY)
        .strokeColor("#e0e0e0").lineWidth(0.5).stroke();
      rowY += 16;

      // ── Totals ────────────────────────────────────────────────────────────
      const totalsX = pageWidth - margin - 200;

      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text("Subtotal", totalsX, rowY)
        .text(formatCurrency(subtotal), pageWidth - margin - 60, rowY);
      rowY += 18;

      doc.font("Helvetica").fontSize(9).fillColor(GREY)
        .text("Delivery", totalsX, rowY)
        .text(formatCurrency(delivery), pageWidth - margin - 60, rowY);
      rowY += 14;

      doc.moveTo(totalsX, rowY).lineTo(pageWidth - margin, rowY)
        .strokeColor("#e0e0e0").lineWidth(0.5).stroke();
      rowY += 12;

      doc.font("Helvetica-Bold").fontSize(11).fillColor(BLACK)
        .text("TOTAL", totalsX, rowY);
      doc.font("Helvetica-Bold").fontSize(11).fillColor(GOLD)
        .text(formatCurrency(order.amount_in_cents), pageWidth - margin - 80, rowY);

      // ── Footer ────────────────────────────────────────────────────────────
      const footerY = pageHeight - margin - 40;
      doc.moveTo(margin, footerY).lineTo(pageWidth - margin, footerY)
        .strokeColor(GOLD).lineWidth(1).stroke();

      doc.font("Helvetica").fontSize(8).fillColor(GREY)
        .text("Thank you for choosing Alluring Scents.", margin, footerY + 10, {
          align: "center", width: contentWidth,
        })
        .text("You smell scent-sational. 🖤", margin, footerY + 22, {
          align: "center", width: contentWidth,
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateInvoice };