import { Link } from '@tanstack/react-router';
import { Activity, ArrowRight, Building2, Dumbbell, Heart, Home, MapPin, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { goals, services, steps } from '@/lib/agency';

const icons = { building: Building2, home: Home, users: Users, target: Target, dumbbell: Dumbbell, heart: Heart, activity: Activity };
export function SectionTitle({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return <div><p className="font-mono text-xs uppercase text-primary">/ {eyebrow}</p><h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{title} {accent && <span className="text-primary">{accent}</span>}</h2></div>;
}
export function ServicesGrid() {
  return <div className="mt-10 grid gap-5 lg:grid-cols-3">{services.map((service, i) => { const Icon = icons[service.icon]; return <Link key={service.id} to="/packages" search={{ service: service.id }} className="group flex flex-col border border-border bg-surface p-7 transition-colors hover:border-primary"><div className="flex items-center justify-between"><Icon className="h-8 w-8 text-primary" /><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div><p className="mt-8 text-xs uppercase text-primary">{service.name}</p><h3 className="mt-3 text-3xl">{service.short}</h3><p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p><div className="mt-7 border-t border-border pt-5"><p className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-4 w-4" />{service.cadence}</p><span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase text-primary">Explore packages <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>; })}</div>;
}
export function GoalsGrid() {
  return <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{goals.map(goal => { const Icon = icons[goal.icon]; return <div key={goal.title} className="border border-border p-6"><Icon className="h-7 w-7 text-primary" /><h3 className="mt-6 text-xl leading-snug">{goal.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{goal.description}</p></div>; })}</div>;
}
export function StepsGrid() {
  return <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, i) => <div key={step.title} className="border-t border-border pt-5"><span className="font-display text-5xl text-primary">0{i + 1}</span><h3 className="mt-5 text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></div>)}</div>;
}
export function CallCTA() {
  return <section className="border-y border-border bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center"><div><p className="font-mono text-xs uppercase">Your next move</p><h2 className="mt-3 text-4xl sm:text-5xl">Make room for a stronger you.</h2></div><Button asChild className="h-12 shrink-0 rounded-none bg-background px-6 text-foreground hover:bg-surface"><Link to="/contact" search={{ type: 'strategy' }}>Schedule a Free Call <ArrowRight /></Link></Button></div></section>;
}