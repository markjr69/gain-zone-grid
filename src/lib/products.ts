export type Category = "weights" | "gymwear" | "accessories" | "programs";

export type VariantSpec =
  | { kind: "weight-kg"; kgs: number[]; ratePerKg: number }
  | { kind: "options"; label: string; options: { label: string; price: number }[] }
  | { kind: "size"; sizes: { label: string; price: number }[] }
  | { kind: "color"; colors: string[]; price: number }
  | { kind: "plain"; price: number };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  blurb: string;
  tag?: string;
  image: string;
  variant: VariantSpec;
};

export function basePrice(p: Product): number {
  const v = p.variant;
  switch (v.kind) {
    case "weight-kg":
      return v.kgs[0] * v.ratePerKg;
    case "options":
      return Math.min(...v.options.map((o) => o.price));
    case "size":
      return Math.min(...v.sizes.map((s) => s.price));
    case "color":
    case "plain":
      return v.price;
  }
}

export function priceLabel(p: Product): string {
  const v = p.variant;
  if (v.kind === "plain" || v.kind === "color") return `${v.price.toLocaleString()} Shs`;
  return `From ${basePrice(p).toLocaleString()} Shs`;
}

export const PRODUCTS: Product[] = [
  // WEIGHTS
  {
    slug: "rubber-hex-dumbbells",
    name: "Rubber Hex Dumbbells",
    category: "weights",
    blurb: "Rubber-coated hex head, chrome contour handle. Sold per dumbbell.",
    tag: "Bestseller",
    image: "/images/hex-dumbbells.png",
    variant: { kind: "weight-kg", kgs: [2.5, 5, 7.5, 10, 12.5, 15, 20, 25, 30], ratePerKg: 10000 },
  },
  {
    slug: "vinyl-dumbbells",
    name: "Vinyl Dumbbells",
    category: "weights",
    blurb: "Vinyl-coated, cement filled. Grippy and floor-safe.",
    image: "/images/vinyl-dumbbells.png",
    variant: { kind: "weight-kg", kgs: [1, 2, 5], ratePerKg: 12000 },
  },
  {
    slug: "kettlebells",
    name: "Cast Iron Kettlebells",
    category: "weights",
    blurb: "Single-cast iron, powder-coated grip.",
    image: "/images/kettlebells.png",
    variant: { kind: "weight-kg", kgs: [5, 10, 14, 16, 20], ratePerKg: 12500 },
  },
  {
    slug: "weight-plates",
    name: "Weight Plates",
    category: "weights",
    blurb: "Standard bore plates. Sold each.",
    image: "/images/weight-plates.png",
    variant: { kind: "weight-kg", kgs: [5, 10, 15, 20], ratePerKg: 11000 },
  },
  {
    slug: "barbells-bars",
    name: "Barbells & Bars",
    category: "weights",
    blurb: "Choose your bar spec — EZ, standard, or full olympic.",
    image: "/images/barbells.png",
    variant: {
      kind: "options",
      label: "Bar type",
      options: [
        { label: "EZ Bar", price: 250000 },
        { label: "Standard Bar", price: 350000 },
        { label: "Olympic Barbell", price: 550000 },
      ],
    },
  },
  {
    slug: "adjustable-home-gyms",
    name: "Adjustable Home Gyms",
    category: "weights",
    blurb: "Integrated weight-stack home gym systems.",
    tag: "Premium",
    image: "/images/home-gym.png",
    variant: {
      kind: "options",
      label: "Stack size",
      options: [
        { label: "10kg Stack", price: 3500000 },
        { label: "20kg Stack", price: 4500000 },
        { label: "30kg Stack", price: 5500000 },
        { label: "40kg Stack", price: 6500000 },
        { label: "50kg Stack", price: 7500000 },
      ],
    },
  },
  {
    slug: "slam-balls",
    name: "Slam Balls",
    category: "weights",
    blurb: "No-bounce shell for maximum-effort throws.",
    image: "/images/slam-balls.png",
    variant: { kind: "color", colors: ["Stealth Black", "Slate Grey", "Crimson Red"], price: 90000 },
  },
  {
    slug: "ab-roller-wheels",
    name: "Ab Roller Wheels",
    category: "weights",
    blurb: "Dual-wheel core roller with knee pad.",
    image: "/images/ab-roller.png",
    variant: { kind: "plain", price: 55000 },
  },
  {
    slug: "push-up-boards",
    name: "Push-up Boards",
    category: "weights",
    blurb: "Color-coded push-up board with multi-grip system.",
    image: "/images/push-up-board.png",
    variant: { kind: "plain", price: 65000 },
  },

  // GYM WEAR
  {
    slug: "womens-high-waist-leggings",
    name: "Women's High Waist Leggings",
    category: "gymwear",
    blurb: "Squat-proof compression, high-rise waistband.",
    image: "/images/womens-leggings.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 85000 },
        { label: "M", price: 85000 },
        { label: "L", price: 90000 },
        { label: "XL", price: 95000 },
        { label: "XXL", price: 100000 },
      ],
    },
  },
  {
    slug: "mens-2-in-1-shorts",
    name: "Men's 2-in-1 Shorts",
    category: "gymwear",
    blurb: "Lined compression under a lightweight training short.",
    image: "/images/mens-shorts.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 65000 },
        { label: "M", price: 65000 },
        { label: "L", price: 70000 },
        { label: "XL", price: 75000 },
        { label: "XXL", price: 80000 },
      ],
    },
  },
  {
    slug: "mens-2-in-1-full-length-tights",
    name: "Men's 2-in-1 Full Length Tights",
    category: "gymwear",
    blurb: "Full-length compression + short overlay.",
    image: "/images/mens-tights.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 95000 },
        { label: "M", price: 95000 },
        { label: "L", price: 100000 },
        { label: "XL", price: 105000 },
        { label: "XXL", price: 110000 },
      ],
    },
  },
  {
    slug: "womens-biker-shorts",
    name: "Women's High Waist Biker Shorts",
    category: "gymwear",
    blurb: "7\" high-rise biker short, buttery compression.",
    image: "/images/biker-shorts.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 55000 },
        { label: "M", price: 55000 },
        { label: "L", price: 60000 },
        { label: "XL", price: 65000 },
        { label: "XXL", price: 70000 },
      ],
    },
  },
  {
    slug: "mens-5-piece-bundle",
    name: "Men's 5-Piece Gym Performance Bundle Set",
    category: "gymwear",
    blurb: "Long sleeve, tee, tights, shorts, tank — full kit.",
    tag: "Bundle",
    image: "/images/mens-bundle.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 220000 },
        { label: "M", price: 220000 },
        { label: "L", price: 230000 },
        { label: "XL", price: 240000 },
        { label: "XXL", price: 250000 },
      ],
    },
  },
  {
    slug: "athletic-tank-tops",
    name: "Athletic Tank Tops",
    category: "gymwear",
    blurb: "Dropped armhole, breathable performance knit.",
    image: "/images/tank-tops.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 45000 },
        { label: "M", price: 45000 },
        { label: "L", price: 48000 },
        { label: "XL", price: 52000 },
        { label: "XXL", price: 55000 },
      ],
    },
  },
  {
    slug: "premium-zip-up-tracksuits",
    name: "Premium Zip-Up Tracksuits",
    category: "gymwear",
    blurb: "Full-zip jacket + tapered pant. Warm-up ready.",
    image: "/images/tracksuit.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 180000 },
        { label: "M", price: 180000 },
        { label: "L", price: 190000 },
        { label: "XL", price: 200000 },
        { label: "XXL", price: 210000 },
      ],
    },
  },
  {
    slug: "premium-football-vests",
    name: "Premium Football Vests",
    category: "gymwear",
    blurb: "Breathable training vest for football & pitch drills.",
    image: "/images/football-vest.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 40000 },
        { label: "M", price: 40000 },
        { label: "L", price: 42000 },
        { label: "XL", price: 45000 },
        { label: "XXL", price: 48000 },
      ],
    },
  },
  {
    slug: "xim-ladies-high-performance-leggings",
    name: "Xim Ladies High-Performance Leggings",
    category: "gymwear",
    blurb: "Xim signature high-rise, sculpting compression fabric.",
    image: "/images/xim-leggings.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 85000 },
        { label: "M", price: 85000 },
        { label: "L", price: 90000 },
        { label: "XL", price: 95000 },
        { label: "XXL", price: 100000 },
      ],
    },
  },

  // ACCESSORIES
  {
    slug: "resistance-bands",
    name: "Heavy-Duty Resistance Bands",
    category: "accessories",
    blurb: "Latex loop bands, progressive tension.",
    image: "/images/resistance-bands.png",
    variant: { kind: "color", colors: ["Volt Yellow", "Crimson Red", "Stealth Black"], price: 45000 },
  },
  {
    slug: "gym-gloves",
    name: "Ergonomic Gym Gloves",
    category: "accessories",
    blurb: "Padded palm, wrist wrap support.",
    image: "/images/gym-gloves.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 35000 },
        { label: "M", price: 35000 },
        { label: "L", price: 35000 },
        { label: "XL", price: 35000 },
      ],
    },
  },
  {
    slug: "yoga-mats",
    name: "Premium Foam Yoga Mats",
    category: "accessories",
    blurb: "6mm high-density foam, non-slip surface.",
    image: "/images/yoga-mat.png",
    variant: { kind: "color", colors: ["Charcoal", "Ocean Blue", "Sunset Orange"], price: 75000 },
  },
  {
    slug: "jump-ropes",
    name: "Speed Jump Ropes",
    category: "accessories",
    blurb: "Bearing handles, adjustable steel cable.",
    image: "/images/jump-rope.png",
    variant: { kind: "plain", price: 30000 },
  },
  {
    slug: "waist-trainers",
    name: "Neoprene Waist Trainers",
    category: "accessories",
    blurb: "Compression waist trainer, sweat-boosting.",
    image: "/images/waist-trainer.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 60000 },
        { label: "M", price: 60000 },
        { label: "L", price: 60000 },
        { label: "XL", price: 60000 },
      ],
    },
  },
  {
    slug: "water-bottles",
    name: "Insulated Water Bottles",
    category: "accessories",
    blurb: "1L stainless, 24h cold / 12h hot.",
    image: "/images/water-bottle.png",
    variant: { kind: "color", colors: ["Matte Black", "Titan White", "Volt Yellow"], price: 45000 },
  },
  {
    slug: "smart-watch",
    name: "Bluetooth Smart Watch",
    category: "accessories",
    blurb: "HRV, SpO2, notifications, 14-day battery.",
    tag: "New",
    image: "/images/smart-watch.png",
    variant: { kind: "color", colors: ["Obsidian", "Silver Steel", "Rose Gold"], price: 250000 },
  },
  {
    slug: "massage-gun",
    name: "Deep Tissue Massage Gun",
    category: "accessories",
    blurb: "5 speeds, 4 interchangeable heads.",
    image: "/images/massage-gun.png",
    variant: { kind: "plain", price: 300000 },
  },
  {
    slug: "lifting-belts",
    name: "Pro Leather Lifting Belts",
    category: "accessories",
    blurb: "10mm genuine leather, single-prong buckle.",
    image: "/images/lifting-belt.png",
    variant: {
      kind: "size",
      sizes: [
        { label: "S", price: 120000 },
        { label: "M", price: 120000 },
        { label: "L", price: 120000 },
        { label: "XL", price: 120000 },
      ],
    },
  },

  // PROGRAMS
  {
    slug: "program-starter",
    name: "Starter Program",
    category: "programs",
    blurb: "4-week template to break the plateau.",
    image: "/images/program-starter.png",
    variant: { kind: "plain", price: 10000 },
  },
  {
    slug: "program-personalized",
    name: "Personalized Program",
    category: "programs",
    blurb: "Custom training + macros. Monthly.",
    tag: "Popular",
    image: "/images/program-personalized.png",
    variant: { kind: "plain", price: 50000 },
  },
  {
    slug: "program-1-1-coaching",
    name: "1:1 Coaching",
    category: "programs",
    blurb: "Direct-line Titan coach. Comp prep ready.",
    image: "/images/program-coaching.png",
    variant: { kind: "plain", price: 150000 },
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}
