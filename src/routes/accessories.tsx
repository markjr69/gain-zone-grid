import { createFileRoute } from "@tanstack/react-router";
import { CategoryHero, ProductGrid } from "@/components/ProductGrid";
import img from "@/assets/cat-accessories.jpg";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Watches, Mats, Ropes, Rollers | GymTitan" },
      { name: "description", content: "Bluetooth smart watches, yoga mats, jump ropes, ab rollers, bottles and more." },
      { property: "og:title", content: "Accessories — GymTitan" },
      { property: "og:description", content: "Smart wearables, mats, ropes, rollers and bottles." },
      { property: "og:url", content: "/accessories" },
    ],
    links: [{ rel: "canonical", href: "/accessories" }],
  }),
  component: AccessoriesPage,
});

const products = [
  { name: "Titan Pulse Smart Watch", price: "$149", blurb: "HRV, SpO2, GPS, 14-day battery", tag: "Bestseller" },
  { name: "Speed Rope — Steel Cable", price: "$29", blurb: "Bearing handles, sub-second cycle" },
  { name: "Pro Yoga Mat 6mm", price: "$59", blurb: "Natural rubber, alignment grid" },
  { name: "Dual-Wheel Ab Roller", price: "$34", blurb: "Knee pad included" },
  { name: "Insulated Bottle 1L", price: "$32", blurb: "24h cold · 12h hot · matte black" },
  { name: "Foam Roller 36\"", price: "$45", blurb: "High-density EVA" },
  { name: "Resistance Band Set", price: "$39", blurb: "5 levels, door anchor" },
  { name: "Lifting Straps — Cotton", price: "$22", blurb: "Heavy-duty, 21\"" },
  { name: "Massage Gun Mini", price: "$119", blurb: "4 heads · 5 speeds", tag: "New" },
];

function AccessoriesPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 03 — accessories"
        title="The edge in the details."
        blurb="Smart wearables, recovery tools, mats, ropes, bottles. The small kit that compounds into big results."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
