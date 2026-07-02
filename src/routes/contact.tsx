import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact GymTitan" },
      { name: "description", content: "Get in touch with the GymTitan team for orders, support, partnerships and wholesale." },
      { property: "og:title", content: "Contact — GymTitan" },
      { property: "og:description", content: "Reach out for orders, support and partnerships." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1.84-.41z" />
    </svg>
  );
}

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mdarwajr", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else setStatus("err");
    } catch {
      setStatus("err");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ contact</p>
      <h1 className="mt-3 font-display text-6xl tracking-tight md:text-8xl">Talk to a <span className="text-primary">Titan</span>.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">Orders, partnerships, wholesale or coaching — we're on it within 24 hours.</p>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full border border-border bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <input
            name="email"
            type="email"
            placeholder="Email (optional)"
            className="w-full border border-border bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            rows={6}
            className="w-full border border-border bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send it"}
          </button>
          {status === "ok" && (
            <p className="text-sm text-primary">Message received. A Titan will reply within 24h.</p>
          )}
          {status === "err" && (
            <p className="text-sm text-destructive">Send failed. Check your connection and retry.</p>
          )}
        </form>
        <div className="space-y-6">
          {[
            { icon: Mail, t: "Email", d: "support@gymtitan.co" },
            { icon: MessageCircle, t: "Live chat", d: "Mon–Sat · 9am–9pm" },
            { icon: MapPin, t: "HQ", d: "Kampala · Countrywide delivery" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 border border-border bg-[var(--surface)] p-6">
              <c.icon className="mt-1 h-6 w-6 text-primary" />
              <div>
                <div className="font-display text-xl tracking-wider">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            </div>
          ))}

          <div className="border border-border bg-[var(--surface)] p-6">
            <div className="font-display text-xl tracking-wider">Follow the Pack</div>
            <p className="mt-1 text-sm text-muted-foreground">Drops, PRs, and behind the iron.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.instagram.com/gym_.titan_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href="https://www.tiktok.com/@gymtitan54"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
              >
                <TikTokIcon className="h-4 w-4" /> TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
