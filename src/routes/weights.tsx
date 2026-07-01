import { createFileRoute } from "@tanstack/react-router";
import { CategoryHero, ProductGrid } from "@/components/ProductGrid";
import { getByCategory } from "@/lib/products";
import img from "@/assets/cat-weights.jpg";

export const Route = createFileRoute("/weights")({
  head: () => ({
    meta: [
      { title: "Weights & Strength Gear | GymTitan" },
      { name: "description", content: "Dumbbells, kettlebells, plates, barbells, home gyms, slam balls and more — priced in UGX." },
      { property: "og:title", content: "Weights — GymTitan" },
      { property: "og:description", content: "Weights & strength gear priced in UGX." },
      { property: "og:url", content: "/weights" },
    ],
    links: [{ rel: "canonical", href: "/weights" }],
  }),
  component: WeightsPage,
});

function WeightsPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 01 — weights"
        title="Forge the body. Lift the iron."
        blurb="Dumbbells, kettlebells, plates and full home-gym systems. Pick your weight, pick your build."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ProductGrid products={getByCategory("weights")} />
      </section>
    </>
  );
}
