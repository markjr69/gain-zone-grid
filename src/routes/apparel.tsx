import { createFileRoute } from "@tanstack/react-router";
import { CategoryHero, ProductGrid } from "@/components/ProductGrid";
import { getByCategory } from "@/lib/products";
import img from "@/assets/cat-apparel.jpg";

export const Route = createFileRoute("/apparel")({
  head: () => ({
    meta: [
      { title: "Gym Wear — Performance Apparel | GymTitan" },
      { name: "description", content: "Leggings, shorts, tights, tanks, tracksuits and bundles. Sizes S–XXL with premium size-scaled pricing." },
      { property: "og:title", content: "Gym wear — GymTitan" },
      { property: "og:description", content: "Performance gym wear, sizes S–XXL." },
      { property: "og:url", content: "/apparel" },
    ],
    links: [{ rel: "canonical", href: "/apparel" }],
  }),
  component: GymWearPage,
});

function GymWearPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 02 — gym wear"
        title="Wear the work."
        blurb="Squat-proof leggings, 2-in-1 shorts and full bundles. Every piece scales in sizes S through XXL."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ProductGrid products={getByCategory("gymwear")} />
      </section>
    </>
  );
}
