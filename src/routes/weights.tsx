import { createFileRoute } from "@tanstack/react-router";
import { CategoryHero, ProductGrid } from "@/components/ProductGrid";
import img from "@/assets/cat-weights.jpg";

export const Route = createFileRoute("/weights")({
  head: () => ({
    meta: [
      { title: "Weights — Dumbbells, Barbells & Plates | GymTitan" },
      { name: "description", content: "Hex dumbbells, olympic barbells, bumper plates, kettlebells. Forged to outlast your goals." },
      { property: "og:title", content: "Weights — GymTitan" },
      { property: "og:description", content: "Dumbbells, barbells, plates and kettlebells." },
      { property: "og:url", content: "/weights" },
    ],
    links: [{ rel: "canonical", href: "/weights" }],
  }),
  component: WeightsPage,
});

const products = [
  { name: "Titan Hex Dumbbell Pair 25lb", price: "$89", blurb: "Rubber-coated, chrome handle", tag: "Best seller" },
  { name: "Olympic Barbell 20kg", price: "$219", blurb: "190k PSI · 28mm shaft" },
  { name: "Bumper Plate Set 230lb", price: "$439", blurb: "IWF spec · 50mm hole" },
  { name: "Competition Kettlebell 24kg", price: "$129", blurb: "Single-cast iron", tag: "New" },
  { name: "Adjustable Dumbbell 5-90lb", price: "$549", blurb: "Dial system, single hand" },
  { name: "Iron Plate Tower 300lb", price: "$629", blurb: "Cast iron · color-coded" },
  { name: "Trap Bar Pro", price: "$249", blurb: "Open-end · dual handles" },
  { name: "Powerlifting Bar 25mm", price: "$389", blurb: "Stiff whip, aggressive knurl" },
  { name: "Wrist & Ankle Weights", price: "$39", blurb: "Adjustable 1-5lb" },
];

function WeightsPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 01 — weights"
        title="Forge the body. Lift the iron."
        blurb="From precision-balanced dumbbells to competition-spec barbells. Every plate is built to last decades, not seasons."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
