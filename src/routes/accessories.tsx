import { createFileRoute } from "@tanstack/react-router";
import { CategoryHero, ProductGrid } from "@/components/ProductGrid";
import { getByCategory } from "@/lib/products";
import img from "@/assets/cat-accessories.jpg";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Watches, Mats, Gloves & More | GymTitan" },
      { name: "description", content: "Resistance bands, gloves, yoga mats, jump ropes, waist trainers, bottles, smart watches, massage guns and lifting belts." },
      { property: "og:title", content: "Accessories — GymTitan" },
      { property: "og:description", content: "High-demand gym accessories." },
      { property: "og:url", content: "/accessories" },
    ],
    links: [{ rel: "canonical", href: "/accessories" }],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 03 — accessories"
        title="The edge in the details."
        blurb="Everything from bands and gloves to smart watches and recovery guns. Configure your variant on the product page."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ProductGrid products={getByCategory("accessories")} />
      </section>
    </>
  );
}
