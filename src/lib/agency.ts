type Pkg = { name: string; price?: string; features: readonly string[] };
export const services: readonly { id: 'corporate' | 'home' | 'couples'; name: string; short: string; description: string; cadence: string; icon: 'building' | 'home' | 'users'; packages: readonly Pkg[] }[] = [
  { id: 'corporate', name: 'Corporate Training', short: 'Stronger teams.', description: 'On-site training that fits the working day. Build energy, team connection and lasting healthy habits.', cadence: 'On-site sessions · at your office', icon: 'building', packages: [
    { name: 'Apex Starter Program', price: '$400', features: ['1x weekly on-site session', '4-week fitness plan', 'Custom nutrition plan', 'Online consultation'] },
    { name: 'Apex Exclusive Package', price: '$800', features: ['2x weekly on-site sessions', '4-week fitness plan', 'Custom nutrition plan', 'Online consultation', 'Bloodwork review'] },
  ] },
  { id: 'home', name: 'Home Personal Training', short: 'Your space. Your pace.', description: 'Dedicated coaching at home or in your compound, with workouts built around your schedule and goals.', cadence: 'Personal coaching · at your home', icon: 'home', packages: [
    { name: 'Home Starter Program', features: ['1x weekly home training session', '4-week fitness plan', 'Custom nutrition plan'] },
    { name: 'Home Exclusive Package', features: ['2x weekly home training sessions', 'Custom workout plan', 'Online consultation', 'Bloodwork review'] },
  ] },
  { id: 'couples', name: 'Couples Training', short: 'Better together.', description: 'Train side by side with joint sessions, shared goals and a coach who brings out the best in both of you.', cadence: 'Joint sessions · built for two', icon: 'users', packages: [
    { name: 'Couples Starter Program', price: '$500', features: ['1x weekly training session', 'Kegel exercises', 'Bedroom performance', 'Joint workout sessions', 'Shared nutrition plans'] },
    { name: 'Couples Exclusive Package', price: '$1000', features: ['2x weekly training sessions', 'Kegel exercises', 'Joint workout sessions', 'Bi-weekly training', 'Better bedroom performance'] },
  ] },
];

export const goals = [
  { title: 'Weight Loss & Body Recomposition', description: 'Build sustainable habits. Move towards a leaner, healthier you.', icon: 'target' },
  { title: 'Strength Training & Muscle Building', description: 'Progressive training for real-world strength and confidence.', icon: 'dumbbell' },
  { title: 'Cardio & Cardiovascular Endurance', description: 'More stamina for your workouts, your work and your life.', icon: 'heart' },
  { title: 'Posture, Flexibility & Mobility', description: 'Move freely, build balance and undo the desk-day stiffness.', icon: 'activity' },
] as const;

export const steps = [
  { title: 'Start with a conversation', text: 'Book a free 15-minute strategy call. Tell us about your goals, schedule and training space.' },
  { title: 'Get your tailored plan', text: 'Choose corporate, home or couples coaching. We shape your workouts and nutrition around you.' },
  { title: 'We come to you', text: 'Your trainer meets you at your office, home or compound. No gym commute. No equipment needed.' },
  { title: 'Build momentum', text: 'Track your goals, check in with your coach and adapt your plan as you progress.' },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Apex Mobile Trainers` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Apex Mobile Trainers` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}