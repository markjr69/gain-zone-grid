import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { getProduct, type Product } from "@/lib/products";
import { formatShs } from "@/lib/format";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — GymTitan` : "Product — GymTitan";
    return {
      meta: [
        { title },
        { name: "description", content: p?.blurb ?? "GymTitan product" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.blurb ?? "" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl">Product not found</h1>
      <Link to="/" className="mt-6 inline-block underline">Back home</Link>
    </div>
  ),
});

const CATEGORY_LINK: Record<Product["category"], { to: string; label: string }> = {
  weights: { to: "/weights", label: "Weights" },
  gymwear: { to: "/apparel", label: "Gym wear" },
  accessories: { to: "/accessories", label: "Accessories" },
  programs: { to: "/programs", label: "Programs" },
};

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // variant state
  const v = product.variant;
  const [selectedKg, setSelectedKg] = useState<number | null>(v.kind === "weight-kg" ? v.kgs[0] : null);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);

  let unitPrice = 0;
  let variantLabel = "";
  let variantSuffix = "";
  switch (v.kind) {
    case "weight-kg":
      unitPrice = (selectedKg ?? v.kgs[0]) * v.ratePerKg;
      variantLabel = `${selectedKg}kg`;
      variantSuffix = `-${selectedKg}kg`;
      break;
    case "options":
      unitPrice = v.options[selectedOption].price;
      variantLabel = v.options[selectedOption].label;
      variantSuffix = `-${v.options[selectedOption].label.toLowerCase().replace(/\s+/g, "-")}`;
      break;
    case "size":
      unitPrice = v.sizes[selectedSize].price;
      variantLabel = `Size ${v.sizes[selectedSize].label}`;
      variantSuffix = `-${v.sizes[selectedSize].label}`;
      break;
    case "color":
      unitPrice = v.price;
      variantLabel = v.colors[selectedColor];
      variantSuffix = `-${v.colors[selectedColor].toLowerCase().replace(/\s+/g, "-")}`;
      break;
    case "plain":
      unitPrice = v.price;
      break;
  }

  const compoundId = `${product.slug}${variantSuffix}`;
  const displayName = variantLabel ? `${product.name} — ${variantLabel}` : product.name;
  const cat = CATEGORY_LINK[product.category];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      cart.add({ id: compoundId, name: displayName, price: unitPrice });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <Link to={cat.to} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-3 w-3" /> Back to {cat.label}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Media */}
        <div className="relative aspect-square overflow-hidden border border-border bg-[var(--surface-2)]">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 grid place-items-center font-display text-[10rem] leading-none text-border/80">
            {product.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          {product.tag && (
            <span className="absolute left-4 top-4 bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
              {product.tag}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ {cat.label}</p>
          <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">{product.blurb}</p>

          <div className="mt-8 font-display text-5xl text-primary">{formatShs(unitPrice)}</div>

          {/* Variant selectors */}
          {v.kind === "weight-kg" && (
            <VariantBlock label={`Weight — ${(v as any).ratePerKg.toLocaleString()} Shs per kg`}>
              <div className="flex flex-wrap gap-2">
                {v.kgs.map((k) => (
                  <button
                    key={k}
                    onClick={() => setSelectedKg(k)}
                    className={`min-w-[70px] border px-4 py-2 font-mono text-sm transition-colors ${
                      selectedKg === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}
                  >
                    {k}kg
                  </button>
                ))}
              </div>
            </VariantBlock>
          )}

          {v.kind === "options" && (
            <VariantBlock label={v.label}>
              <div className="grid gap-2 sm:grid-cols-2">
                {v.options.map((o, i) => (
                  <button
                    key={o.label}
                    onClick={() => setSelectedOption(i)}
                    className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                      selectedOption === i ? "border-primary bg-[var(--surface)]" : "border-border hover:border-primary"
                    }`}
                  >
                    <span className="font-display text-sm tracking-wider">{o.label}</span>
                    <span className="font-mono text-xs text-primary">{o.price.toLocaleString()} Shs</span>
                  </button>
                ))}
              </div>
            </VariantBlock>
          )}

          {v.kind === "size" && (
            <VariantBlock label="Size">
              <div className="flex flex-wrap gap-2">
                {v.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(i)}
                    className={`flex min-w-[60px] flex-col items-center border px-4 py-2 transition-colors ${
                      selectedSize === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}
                  >
                    <span className="font-display text-lg tracking-wider">{s.label}</span>
                    <span className="font-mono text-[10px] opacity-80">{s.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </VariantBlock>
          )}

          {v.kind === "color" && (
            <VariantBlock label="Color / Style">
              <div className="flex flex-wrap gap-2">
                {v.colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(i)}
                    className={`border px-4 py-2 text-sm transition-colors ${
                      selectedColor === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </VariantBlock>
          )}

          {/* Quantity */}
          <VariantBlock label="Quantity">
            <div className="inline-flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 px-3 text-center font-mono">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </VariantBlock>

          <div className="mt-8 flex items-center gap-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Total</div>
            <div className="font-mono text-xl text-primary">{formatShs(unitPrice * qty)}</div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-primary py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01] sm:w-auto sm:px-12"
          >
            {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to cart</>}
          </button>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">SKU: {compoundId}</p>
        </div>
      </div>
    </section>
  );
}

function VariantBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
