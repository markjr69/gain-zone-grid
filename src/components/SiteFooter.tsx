import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
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
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center border border-border transition-colors hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
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
          <form className="mt-4 flex">
            <input type="email" placeholder="email@titan.gym" className="w-full bg-[var(--surface-2)] px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" />
            <button className="bg-primary px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground">Join</button>
          </form>
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
