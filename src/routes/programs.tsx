import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ShoppingBag } from "lucide-react";
import img from "@/assets/cat-programs.jpg";
import { CategoryHero } from "@/components/ProductGrid";
import { getByCategory } from "@/lib/products";
import { formatShs } from "@/lib/format";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Training & Diet Programs | GymTitan" },
      { name: "description", content: "Starter, personalized, and 1:1 coaching programs. Priced in UGX." },
      { property: "og:title", content: "Programs — GymTitan" },
      { property: "og:description", content: "Coached training and nutrition programs." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

const featureMap: Record<string, { features: string[]; featured?: boolean; cadence: string }> = {
  "program-starter": {
    cadence: "one-time",
    features: ["Full 4-week plan", "PDF + app access", "Form video library", "Email support"],
  },
  "program-personalized": {
    cadence: "/ month",
    featured: true,
    features: ["Custom training split", "Macros + meal plan", "Weekly check-ins", "Coach chat 7d/wk", "Program adjustments"],
  },
  "program-1-1-coaching": {
    cadence: "/ month",
    features: ["Everything in Personalized", "Weekly video call", "Comp prep peaking", "Bloodwork review", "Priority support"],
  },
};

function ProgramsPage() {
  const cart = useCart();
  const plans = getByCategory("programs");

  return (
    <>
      <CategoryHero
        eyebrow="/ category 04 — programs"
        title="The work works. We write the work."
        blurb="Coached programs for strength, hypertrophy, recomp and conditioning. Add to cart to lock in your tier."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const meta = featureMap[p.slug];
            const price = (p.variant as { kind: "plain"; price: number }).price;
            return (
              <div key={p.slug} className={`relative flex flex-col border ${meta.featured ? "border-primary bg-[var(--surface)]" : "border-border"} p-8`}>
                {meta.featured && (
                  <span className="absolute -top-3 left-8 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-3xl tracking-wider">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-primary">{formatShs(price)}</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{meta.cadence}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {meta.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-2">
                  <button
                    onClick={() => cart.add({ id: p.slug, name: p.name, price })}
                    className={`inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest ${meta.featured ? "bg-primary text-primary-foreground" : "border border-foreground hover:bg-foreground hover:text-background"}`}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </button>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="text-center text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary"
                  >
                    View details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
