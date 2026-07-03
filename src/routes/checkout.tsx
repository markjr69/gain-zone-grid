import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatShs } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — GymTitan" },
      { name: "description", content: "Complete your GymTitan order. Mobile Money, Credit Card, or Cash on Delivery." },
    ],
  }),
  component: CheckoutPage,
});

// Point this at wherever pesapal-server.js is running.
// e.g. "http://localhost:5050" locally, or your deployed server URL in production.
const PAYMENT_API_BASE = "http://localhost:5050";

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") || "");
    const phone = String(fd.get("phone") || "");
    const zone = String(fd.get("zone") || "");
    const payment = String(fd.get("payment") || "");
    const notes = String(fd.get("notes") || "");

    const itemLines = items
      .map((i) => `- ${i.name} x${i.qty} @ ${formatShs(i.price)} = ${formatShs(i.price * i.qty)} [SKU: ${i.id}]`)
      .join("\n");

    setStatus("sending");
    setErrorMsg("");

    // Log the order to Formspree in the background (fire & forget)
    const orderFd = new FormData();
    orderFd.append("name", name);
    orderFd.append("phone", phone);
    orderFd.append("zone", zone);
    orderFd.append("payment", payment);
    orderFd.append("notes", notes);
    orderFd.append("items", itemLines);
    orderFd.append("total", formatShs(subtotal));
    fetch("https://formspree.io/f/xbdvzdbw", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: orderFd,
    }).catch(() => {});

    // Cash on Delivery: skip Pesapal, go straight to success.
    if (payment === "Cash on Delivery") {
      clear();
      setStatus("ok");
      return;
    }

    // Mobile Money or Credit Card: open Pesapal hosted checkout inside the iframe.
    try {
      const res = await fetch(`${PAYMENT_API_BASE}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: "",
          phone,
          amount: subtotal || 50000,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.redirect_url) {
        setErrorMsg(data.error || "Could not start payment. Try again.");
        setStatus("err");
        return;
      }
      setIframeUrl(data.redirect_url);
      setStatus("idle");
    } catch {
      setErrorMsg("Network error reaching payment server.");
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="mt-8 font-display text-5xl tracking-tight md:text-7xl">
          Order <span className="text-primary">locked in</span>.
        </h1>
        <p className="mt-4 text-muted-foreground">
          A Titan agent will confirm your order and delivery details on WhatsApp within the hour.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            Back to base
          </Link>
          <Link to="/weights" className="border border-border px-8 py-4 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary">
            Keep shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-3 w-3" /> Continue shopping
      </Link>

      <h1 className="mt-6 font-display text-5xl tracking-tight md:text-7xl">
        Check<span className="text-primary">out</span>.
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        {/* Left — Form or Payment iframe */}
        <div className="lg:col-span-3">
          {iframeUrl ? (
            <div className="border border-border bg-[var(--surface)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-2xl tracking-wider">Secure payment</h2>
                <button
                  onClick={() => { setIframeUrl(null); setIframeLoaded(false); }}
                  className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
                >
                  ← Back to form
                </button>
              </div>
              <div className="relative h-[720px] w-full overflow-hidden bg-white">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--surface-2)]">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Connecting to Pesapal…
                    </p>
                  </div>
                )}
                <iframe
                  title="Pesapal Checkout"
                  src={iframeUrl}
                  onLoad={() => setIframeLoaded(true)}
                  className="h-full w-full border-0 bg-white"
                  allow="payment *"
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                Encrypted · Powered by Pesapal
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 border border-border bg-[var(--surface)] p-6">
              <h2 className="font-display text-2xl tracking-wider">Delivery details</h2>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Name</label>
                <input name="name" required className="w-full bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Phone (MTN / Airtel)</label>
                <input name="phone" required placeholder="+256 7XX XXX XXX" className="w-full bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Kampala delivery zone</label>
                <input name="zone" required placeholder="Ntinda, Kololo, Nakawa, Bugolobi…" className="w-full bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Payment method</label>
                <select name="payment" required defaultValue="" className="w-full bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary">
                  <option value="" disabled>Select payment method</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Credit Card">Credit Card (Visa / Mastercard)</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Notes (optional)</label>
                <textarea name="notes" rows={3} className="w-full bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || items.length === 0}
                className="flex w-full items-center justify-center gap-2 bg-primary py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-40"
              >
                {status === "sending" ? "Processing…" : (<><ShoppingBag className="h-4 w-4" /> Pay — {formatShs(subtotal)}</>)}
              </button>

              {status === "err" && (
                <div className="border border-destructive bg-destructive/10 p-3 text-xs text-destructive">
                  {errorMsg || "Network error. Check connection or contact support directly."}
                </div>
              )}
              {items.length === 0 && (
                <p className="text-xs text-muted-foreground">Your cart is empty. Add some iron first.</p>
              )}
            </form>
          )}
        </div>

        {/* Right — Summary */}
        <aside className="border border-border bg-[var(--surface)] p-6 lg:col-span-2">
          <h2 className="font-display text-2xl tracking-wider">Order summary</h2>
          {items.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No items yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {items.map((i) => (
                <li key={i.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <div className="font-display text-sm tracking-wider">{i.name}</div>
                    <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {i.qty} × {i.price.toLocaleString()} Shs
                    </div>
                  </div>
                  <div className="whitespace-nowrap font-mono text-sm text-primary">
                    {formatShs(i.price * i.qty)}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Total</span>
            <span className="font-display text-3xl text-primary">{formatShs(subtotal)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
