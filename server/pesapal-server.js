/**
 * GymTitan — Pesapal Checkout Server (standalone)
 * ------------------------------------------------
 * Run:
 *   npm init -y
 *   npm install express cors node-fetch@2
 *   node server/pesapal-server.js
 *
 * Exposes ONE endpoint:
 *   POST /api/checkout   { name, email, phone, amount? }
 *   -> { redirect_url, order_tracking_id }
 *
 * No webhooks. No IPN listeners. Just: auth -> submit order -> return redirect URL.
 */

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

// === LIVE PESAPAL CREDENTIALS ===============================================
const PESAPAL_BASE  = "https://pay.pesapal.com/v3/api";
const PESAPAL_KEY   = "OUNKT1cEquU113+RkSJG6nNLpEOiqJ6t";
const PESAPAL_SECRET= "WRi3JdhTsL1INMqf1IMAbzoHfBY=";
const PESAPAL_IPN_ID= "651be742-df1a-4a22-9657-b0a70188b486";
// ============================================================================

const PORT = process.env.PORT || 5050;
// Where Pesapal sends the shopper after the payment attempt completes.
// Change this to your real domain in production.
const CALLBACK_URL = process.env.CALLBACK_URL || "https://gain-zone-grid.lovable.app/checkout";

const app = express();
app.use(cors());
app.use(express.json());

/** Step 1 — Get a short-lived bearer token from Pesapal. */
async function getAccessToken() {
  const res = await fetch(`${PESAPAL_BASE}/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: PESAPAL_KEY, consumer_secret: PESAPAL_SECRET }),
  });
  const data = await res.json();
  if (!data.token) throw new Error("Pesapal auth failed: " + JSON.stringify(data));
  return data.token;
}

/** Step 2 — Submit the order and return the hosted checkout redirect URL. */
async function submitOrder(token, { name, email, phone, amount }) {
  const [first_name, ...rest] = String(name || "Customer").trim().split(" ");
  const last_name = rest.join(" ") || first_name;

  const payload = {
    id: "GT-" + Date.now(),                 // unique merchant reference
    currency: "UGX",
    amount: Number(amount) || 50000,
    description: "GymTitan Order",
    callback_url: CALLBACK_URL,
    notification_id: PESAPAL_IPN_ID,        // required by Pesapal even without a listener
    billing_address: {
      email_address: email || "",
      phone_number: phone || "",
      first_name,
      last_name,
      country_code: "UG",
    },
  };

  const res = await fetch(`${PESAPAL_BASE}/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

app.post("/api/checkout", async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ error: "name and phone are required" });
    }
    const token = await getAccessToken();
    const order = await submitOrder(token, { name, email, phone, amount });
    if (!order.redirect_url) {
      return res.status(502).json({ error: "Pesapal did not return redirect_url", detail: order });
    }
    res.json({
      redirect_url: order.redirect_url,
      order_tracking_id: order.order_tracking_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Unknown server error" });
  }
});

app.get("/", (_req, res) => res.send("GymTitan Pesapal server is live."));

app.listen(PORT, () => {
  console.log(`✅ Pesapal server running on http://localhost:${PORT}`);
});
