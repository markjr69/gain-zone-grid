import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { formatShs } from "./format";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: { id: string; name: string; price: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add: CartCtx["add"] = ({ id, name, price }) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, name, price, qty: 1 }];
    });
    setOpen(true);
  };

  const remove: CartCtx["remove"] = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { items, count, subtotal, add, remove, setQty, clear, open, setOpen };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export function CartDrawer() {
  const { items, subtotal, setQty, remove, open, setOpen, clear } = useCart();
  const navigate = useNavigate();
  if (!open) return null;

  const goCheckout = () => {
    setOpen(false);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 font-display text-2xl tracking-wider">
            <ShoppingBag className="h-5 w-5 text-primary" /> Cart
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Your cart is empty. Time to add some iron.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.id} className="flex items-start gap-3 border border-border p-3">
                  <div className="flex-1">
                    <div className="font-display text-sm tracking-wider">{i.name}</div>
                    <div className="mt-1 font-mono text-xs text-primary">{formatShs(i.price)}</div>
                    <div className="mt-2 inline-flex items-center border border-border">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="p-1.5" aria-label="Decrease">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-8 px-2 text-center font-mono text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="p-1.5" aria-label="Increase">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{formatShs(i.qty * i.price)}</div>
                    <button onClick={() => remove(i.id)} className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="uppercase tracking-wider text-muted-foreground">Subtotal</span>
            <span className="font-mono text-xl text-primary">{formatShs(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={goCheckout}
            className="mt-4 w-full bg-primary py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-40"
          >
            Proceed to Checkout
          </button>
          {items.length > 0 && (
            <button onClick={clear} className="mt-2 w-full py-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
              Clear cart
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
