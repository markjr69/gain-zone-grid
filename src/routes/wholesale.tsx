import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, Truck, Factory, BadgePercent } from "lucide-react";
import img from "@/assets/cat-wholesale.jpg";
import { CategoryHero } from "@/components/ProductGrid";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Gym Equipment | GymTitan" },
      { name: "description", content: "Outfit your gym with racks, machines, plates and dumbbells direct from the factory. Bulk pricing, worldwide freight." },
      { property: "og:title", content: "Wholesale — GymTitan" },
      { property: "og:description", content: "Bulk gym equipment, direct from the factory." },
      { property: "og:url", content: "/wholesale" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: WholesalePage,
});

const lineup = [
  { name: "Power Rack — Commercial 3x3", moq: "MOQ 10", lead: "30 days" },
  { name: "Functional Trainer Pro", moq: "MOQ 5", lead: "45 days" },
  { name: "Bumper Plate Pallet 5,000lb", moq: "MOQ 1 pallet", lead: "20 days" },
  { name: "Hex Dumbbell Set 5-100lb x10", moq: "MOQ 10 sets", lead: "30 days" },
  { name: "Flat / Incline Bench", moq: "MOQ 20", lead: "30 days" },
  { name: "Cardio: Air Bike", moq: "MOQ 10", lead: "40 days" },
];

function WholesalePage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 05 — wholesale"
        title="Starting a new gym? 50% payment installment"
        blurb="Racks, machines, plates, dumbbells — direct from the factory. Bulk discounts, freight worldwide, no middlemen."
        image={img}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Factory, t: "Direct from factory", d: "No middlemen, no markup" },
            { icon: BadgePercent, t: "Bulk discounts", d: "Up to 45% off retail" },
            { icon: Truck, t: "Global freight", d: "Sea & air, DDP available" },
            { icon: Building2, t: "Private label", d: "Brand it as your own" },
          ].map((f) => (
            <div key={f.t} className="border border-border bg-[var(--surface)] p-6">
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-xl tracking-wider">{f.t}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-display text-4xl tracking-wider md:text-5xl">Available lineup</h2>
            <div className="mt-6 divide-y divide-border border border-border">
              {lineup.map((l) => (
                <div key={l.name} className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <div className="font-display text-lg tracking-wider">{l.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{l.moq} · Lead time {l.lead}</div>
                  </div>
                  <button className="border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary">
                    Quote
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-4 border border-border bg-[var(--surface)] p-6 lg:col-span-2">
            <h3 className="font-display text-2xl tracking-wider">Request a bulk quote</h3>
            <p className="text-xs text-muted-foreground">Tell us what you need. We reply within 24h.</p>
            {["Business name", "Email", "Country", "What & quantity"].map((p) => (
              <input key={p} placeholder={p} className="w-full bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            ))}
            <button type="button" className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground">
              Send inquiry <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
