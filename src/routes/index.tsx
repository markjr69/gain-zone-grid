import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Dumbbell, Shirt, Watch, Package, BookOpen, Truck, Zap, ShieldCheck, Globe } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catWeights from "@/assets/cat-weights.jpg";
import catApparel from "@/assets/cat-apparel.jpg";
import catPrograms from "@/assets/cat-programs.jpg";
import catWholesale from "@/assets/cat-wholesale.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GymTitan — Forged for the Relentless" },
      { name: "description", content: "Premium dumbbells, barbells, apparel, accessories, smart wearables, personalized programs and wholesale equipment. Built for those who refuse to quit." },
      { property: "og:title", content: "GymTitan — Forged for the Relentless" },
      { property: "og:description", content: "Premium gym gear, apparel and training programs. Built different." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categories = [
  { to: "/weights", title: "Weights", count: "Dumbbells • Barbells • Plates", img: catWeights, icon: Dumbbell },
  { to: "/apparel", title: "Apparel", count: "Hoodies • Tees • Shorts • Merch", img: catApparel, icon: Shirt },
  { to: "/accessories", title: "Accessories", count: "Watches • Ropes • Mats • Bottles", img: catAccessories, icon: Watch },
  { to: "/programs", title: "Programs", count: "Training • Diet • 1:1 Coaching", img: catPrograms, icon: BookOpen },
  { to: "/wholesale", title: "Wholesale", count: "Racks • Machines • Bulk Orders", img: catWholesale, icon: Truck },
] as const;

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" width={1920} height={1280} className="h-full w-full object-cover object-center opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              <Zap className="h-3 w-3" /> New drop · Titan series
            </div>
            <h1 className="mt-6 font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
              Iron <span className="text-primary">sharpens</span><br/>
              <span className="text-stroke">iron.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              GymTitan ships the gear, the wearables, and the programs that turn ordinary days into PR days. Worldwide. No excuses.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/weights" className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]">
                Shop weights <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 border border-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background">
                Get a program
              </Link>
            </div>
          </div>
          <div className="hidden flex-col justify-end gap-4 lg:col-span-4 lg:flex">
            {[
              { k: "10K+", v: "Athletes equipped" },
              { k: "60+", v: "Countries shipping" },
              { k: "4.9★", v: "Avg. rating" },
            ].map((s) => (
              <div key={s.k} className="border border-border bg-background/60 p-6 backdrop-blur">
                <div className="font-display text-5xl text-primary">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="marquee flex w-max items-center gap-12 whitespace-nowrap font-display text-2xl tracking-wider">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            ["Free shipping over $99", "★", "30-day returns", "★", "Worldwide delivery", "★", "Wholesale inquiries open", "★", "New drops weekly", "★"].map((t, j) => (
              <span key={`${i}-${j}`}>{t}</span>
            ))
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ shop the arsenal</p>
            <h2 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Every category. <br/><span className="text-primary">Zero compromises.</span></h2>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className={`group relative overflow-hidden border border-border ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[16/12]" : "aspect-[4/3]"}`}>
                <img src={c.img} alt={c.title} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    <c.icon className="h-3 w-3" /> Category
                  </div>
                  <h3 className={`mt-1 font-display ${i === 0 ? "text-5xl md:text-6xl" : "text-3xl"} tracking-wider`}>{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.count}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-y border-border bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">/ manifesto</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              We don't sell <span className="text-primary">equipment.</span><br/>
              We arm <span className="text-stroke">titans.</span>
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground">
            <p>Every plate, every stitch, every program — engineered for the person who shows up when nobody's watching. We test on competitive lifters and weekend warriors alike, then ship worldwide so the iron always finds you.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: ShieldCheck, label: "Lifetime warranty on iron" },
                { icon: Globe, label: "60+ countries shipped" },
                { icon: Truck, label: "Free over $99" },
                { icon: Package, label: "30-day returns" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 border border-border bg-background p-4">
                  <f.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden border border-border bg-gradient-to-br from-primary to-[oklch(0.78_0.2_70)] p-10 text-primary-foreground md:p-20">
          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em]">/ wholesale</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">Outfit your gym. <br/>By the pallet.</h2>
            <p className="mt-6 max-w-lg text-base opacity-80">Racks, machines, plates, dumbbells — direct from the factory floor. Bulk discounts, freight worldwide, no middlemen.</p>
            <Link to="/wholesale" className="mt-8 inline-flex items-center gap-2 bg-background px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-32 -right-32 font-display text-[20rem] leading-none opacity-10">
            BULK
          </div>
        </div>
      </section>
    </>
  );
}
