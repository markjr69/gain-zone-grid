import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import img from "@/assets/cat-programs.jpg";
import { CategoryHero } from "@/components/ProductGrid";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Training & Diet Programs | GymTitan" },
      { name: "description", content: "Personalized training programs and diet plans built by coaches. From strength and hypertrophy to body recomp and conditioning." },
      { property: "og:title", content: "Programs — GymTitan" },
      { property: "og:description", content: "Personalized training and diet programs." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

const plans = [
  {
    name: "Starter",
    price: "$29",
    cadence: "one-time",
    blurb: "A 4-week template to break the plateau.",
    features: ["Full 4-week plan", "PDF + app access", "Form video library", "Email support"],
  },
  {
    name: "Personalized",
    price: "$129",
    cadence: "/ month",
    blurb: "Built around your body, schedule and goals.",
    features: ["Custom training split", "Macros + meal plan", "Weekly check-ins", "Coach chat 7d/wk", "Program adjustments"],
    featured: true,
  },
  {
    name: "1:1 Coaching",
    price: "$349",
    cadence: "/ month",
    blurb: "Direct line to a Titan coach. Comp prep ready.",
    features: ["Everything in Personalized", "Weekly video call", "Comp prep peaking", "Bloodwork review", "Priority support"],
  },
];

function ProgramsPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 04 — programs"
        title="The work works. We write the work."
        blurb="Coached programs and nutrition plans for strength, hypertrophy, recomposition and conditioning. Built by humans who compete."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col border ${p.featured ? "border-primary bg-[var(--surface)]" : "border-border"} p-8`}>
              {p.featured && (
                <span className="absolute -top-3 left-8 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-3xl tracking-wider">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-6xl text-primary">{p.price}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{p.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest ${p.featured ? "bg-primary text-primary-foreground" : "border border-foreground hover:bg-foreground hover:text-background"}`}>
                Choose plan <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3">
          {[
            { n: "01", t: "Tell us your goal", d: "Strength, hypertrophy, fat loss, comp prep — we tailor to it." },
            { n: "02", t: "Get your plan in 48h", d: "Coached training split + macro-tracked nutrition." },
            { n: "03", t: "Adjust weekly", d: "Check-ins, video reviews, and coach chat. We move with you." },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-7xl text-primary">{s.n}</div>
              <h3 className="mt-2 font-display text-2xl tracking-wider">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
