import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Smartphone, User, ArrowLeft, ShoppingBag, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/payment-instructions")({
  head: () => ({
    meta: [
      { title: "Payment Instructions — GymTitan" },
      { name: "description", content: "Complete your GymTitan order via Mobile Money." },
    ],
  }),
  component: PaymentInstructionsPage,
});

function PaymentInstructionsPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      {/* Main card */}
      <div className="relative overflow-hidden border border-border bg-[var(--surface)] p-8 shadow-2xl sm:p-10">
        {/* Subtle top accent line */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-primary" />

        {/* Icon */}
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-voltage)]">
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-center font-display text-4xl tracking-tight text-foreground md:text-5xl">
          Order <span className="text-primary">Initiated!</span>
        </h1>

        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
          Your GymTitan order has been logged and reserved. To activate your plan, complete the payment using the details below.
        </p>

        {/* Instruction card */}
        <div className="mt-8 space-y-5 border border-border bg-background p-6">
          <div className="flex items-start gap-4">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                MTN Mobile Money Number
              </div>
              <div className="mt-1 font-display text-2xl tracking-wider text-foreground">
                0785546219
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <User className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Account Name
              </div>
              <div className="mt-1 font-display text-lg tracking-wider text-foreground">
                Ainamani Mark
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Amount to Send
            </div>
            <div className="mt-2 font-display text-4xl text-primary md:text-5xl">
              25,000 <span className="text-xl text-muted-foreground md:text-2xl">Shs</span>
            </div>
          </div>
        </div>

        {/* Trust strips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Secure manual confirmation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Verified within 1 hour
          </span>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Once your payment is received, a Titan agent will confirm your activation and delivery details via WhatsApp or SMS.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-3 w-3" /> Back to base
          </Link>
          <Link
            to="/weights"
            className="inline-flex items-center gap-2 border border-border px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingBag className="h-3 w-3" /> Keep shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
