import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";

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

function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ contact</p>
      <h1 className="mt-3 font-display text-6xl tracking-tight md:text-8xl">Talk to a <span className="text-primary">Titan</span>.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">Orders, partnerships, wholesale or coaching — we're on it within 24 hours.</p>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <form className="space-y-4">
          {["Your name", "Email", "Subject"].map((p) => (
            <input key={p} placeholder={p} className="w-full border border-border bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-primary" />
          ))}
          <textarea placeholder="Message" rows={6} className="w-full border border-border bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-primary" />
          <button type="button" className="bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            Send it
          </button>
        </form>
        <div className="space-y-6">
          {[
            { icon: Mail, t: "Email", d: "support@gymtitan.co" },
            { icon: MessageCircle, t: "Live chat", d: "Mon–Sat · 9am–9pm" },
            { icon: MapPin, t: "HQ", d: "Worldwide dropship · ships in 24h" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 border border-border bg-[var(--surface)] p-6">
              <c.icon className="mt-1 h-6 w-6 text-primary" />
              <div>
                <div className="font-display text-xl tracking-wider">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
