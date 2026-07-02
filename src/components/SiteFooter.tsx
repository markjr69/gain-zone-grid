import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useState } from "react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1.84-.41z" />
    </svg>
  );
}

export function SiteFooter() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mnjkgjrr", {
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
    <footer className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center bg-primary font-display text-xl text-primary-foreground">G</span>
            <span className="font-display text-2xl tracking-wider">GYM<span className="text-primary">TITAN</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Forged for the relentless. Built for the ones who refuse to quit.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/gym_.titan_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@gymtitan54"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="grid h-9 w-9 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-primary">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/weights" className="hover:text-foreground">Weights</Link></li>
            <li><Link to="/apparel" className="hover:text-foreground">Gym wear</Link></li>
            <li><Link to="/accessories" className="hover:text-foreground">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-primary">Train</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/programs" className="hover:text-foreground">Programs</Link></li>
            <li><Link to="/wholesale" className="hover:text-foreground">Wholesale</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-primary">Join the pack</h4>
          <p className="mt-4 text-sm text-muted-foreground">Drops, programs, and PR-worthy gear.</p>
          <form onSubmit={handleSubscribe} className="mt-4 flex">
            <input
              type="email"
              name="email"
              required
              placeholder="email@titan.gym"
              className="w-full bg-[var(--surface-2)] px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-primary px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-60"
            >
              {status === "sending" ? "…" : "Join"}
            </button>
          </form>
          {status === "ok" && <p className="mt-2 text-xs text-primary">You're in. Watch your inbox.</p>}
          {status === "err" && <p className="mt-2 text-xs text-destructive">Something failed. Try again.</p>}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs uppercase tracking-wider text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} GymTitan. Iron sharpens iron.</p>
          <p>Worldwide shipping • Built different</p>
        </div>
      </div>
    </footer>
  );
}
