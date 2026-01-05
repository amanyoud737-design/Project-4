type PayPalEnv = "sandbox" | "live";

function apiBase(env: PayPalEnv) {
  return env === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

export async function getAccessToken() {
  const env = (process.env.PAYPAL_ENV || "sandbox") as PayPalEnv;
  const client = process.env.PAYPAL_CLIENT_ID || "";
  const secret = process.env.PAYPAL_CLIENT_SECRET || "";
  if (!client || !secret) throw new Error("PayPal secrets missing");

  const basic = Buffer.from(`${client}:${secret}`).toString("base64");
  const res = await fetch(`${apiBase(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "authorization": `Basic ${basic}`,
      "content-type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  if (!res.ok) throw new Error("PayPal token error");
  const j = await res.json();
  return j.access_token as string;
}

export async function createOrderUSD(amountUSD: string) {
  const token = await getAccessToken();
  const env = (process.env.PAYPAL_ENV || "sandbox") as PayPalEnv;

  const res = await fetch(`${apiBase(env)}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: amountUSD } }]
    })
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "PayPal create order failed");
  }
  return await res.json();
}

export async function captureOrder(orderID: string) {
  const token = await getAccessToken();
  const env = (process.env.PAYPAL_ENV || "sandbox") as PayPalEnv;
  const res = await fetch(`${apiBase(env)}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: { "authorization": `Bearer ${token}`, "content-type": "application/json" }
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "PayPal capture failed");
  }
  return await res.json();
}
