import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { priceLabel, type Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link
          key={p.slug}
          to="/product/$slug"
          params={{ slug: p.slug }}
          className="group relative flex flex-col bg-background p-6 transition-colors hover:bg-[var(--surface)]"
        >
          <div className="relative aspect-square overflow-hidden bg-[var(--surface-2)]">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover opacity-40 transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 grid place-items-center font-display text-6xl text-border/80">
              {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            {p.tag && (
              <span className="absolute left-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                {p.tag}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl leading-tight tracking-wider">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.blurb}</p>
            </div>
            <span className="whitespace-nowrap font-mono text-sm text-primary">{priceLabel(p)}</span>
          </div>
          <span className="mt-4 inline-flex items-center justify-center gap-2 border border-border py-2 text-xs font-bold uppercase tracking-widest transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            View product <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function CategoryHero({ eyebrow, title, blurb, image }: { eyebrow: string; title: string; blurb: string; image: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">{blurb}</p>
      </div>
    </section>
  );
}
