import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/agency';
import { FitnessCalculators } from '@/components/FitnessCalculators';
import { CallCTA } from '@/components/AgencySections';
export const Route = createFileRoute('/calculators')({ head: () => pageHead('BMI, Daily Calories & Macro Calculators', 'Calculate your BMI and estimate daily energy needs and macros with Apex Mobile Trainers fitness tools.'), component: CalculatorsPage });
function CalculatorsPage() { return <><section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><p className="font-mono text-xs text-primary">/ CALCULATORS</p><h1 className="mt-4 text-5xl leading-tight sm:text-6xl">Know your numbers.<br /><span className="text-primary">Own your progress.</span></h1><p className="mt-6 max-w-2xl text-muted-foreground">A starting point for your training and nutrition—not a substitute for personalized advice.</p><FitnessCalculators /></section><CallCTA /></>; }