import { createFileRoute } from "@tanstack/react-router";
import { CategoryHero, ProductGrid } from "@/components/ProductGrid";
import img from "@/assets/cat-apparel.jpg";

export const Route = createFileRoute("/apparel")({
  head: () => ({
    meta: [
      { title: "Apparel & Merch — Hoodies, Tees, Bags | GymTitan" },
      { name: "description", content: "Performance hoodies, oversized tees, shorts, workout bags and merch. Built to train, designed to live in." },
      { property: "og:title", content: "Apparel — GymTitan" },
      { property: "og:description", content: "Performance apparel, merch and workout bags." },
      { property: "og:url", content: "/apparel" },
    ],
    links: [{ rel: "canonical", href: "/apparel" }],
  }),
  component: ApparelPage,
});

const products = [
  { name: "Titan Heavyweight Hoodie", price: "$79", blurb: "450gsm fleece, oversized fit", tag: "Drop 04" },
  { name: "Oversized Training Tee", price: "$39", blurb: "Dropped shoulder, 220gsm" },
  { name: "Performance Joggers", price: "$69", blurb: "Tapered, 4-way stretch" },
  { name: "Mesh Lifting Stringer", price: "$32", blurb: "Breathable, low-cut arm" },
  { name: "Titan Workout Bag 45L", price: "$95", blurb: "Shoe compartment, water resistant" },
  { name: "Compression Shorts 7\"", price: "$45", blurb: "Sweat-wicking, side pocket" },
  { name: "Snapback — Titan Logo", price: "$28", blurb: "Embroidered, flat brim" },
  { name: "Crew Socks 3-pack", price: "$24", blurb: "Cushioned heel, arch support" },
  { name: "Lifting Belt 10mm", price: "$59", blurb: "Genuine leather, single prong" },
];

function ApparelPage() {
  return (
    <>
      <CategoryHero
        eyebrow="/ category 02 — apparel"
        title="Wear the work."
        blurb="Heavyweight fabrics, athletic cuts, zero filler. Designed for the gym, lived in everywhere else."
        image={img}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
