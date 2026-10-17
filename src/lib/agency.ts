export const services = [
  { id: 'corporate', name: 'Corporate Training', short: 'Stronger teams.', description: 'On-site training that fits the working day. Build energy, team connection and lasting healthy habits.', cadence: '2 times a week · at your office', icon: 'building', packages: [
    { name: 'Apex Starter Program', features: ['2x weekly on-site team sessions', '4-week structured fitness plan', 'Online consultation', 'Custom nutrition plan'] },
    { name: '1:1 Corporate Training', features: ['2x weekly 1:1 on-site coaching', 'Tailored individual workout plan', '3 weekly consultation calls', 'Comprehensive bloodwork review', 'Personalized high-performance nutrition plan'] },
  ] },
  { id: 'home', name: 'Home Personal Training', short: 'Your space. Your pace.', description: 'Dedicated coaching at home or in your compound, with workouts built around your schedule and goals.', cadence: 'Personal coaching · at your home', icon: 'home', packages: [
    { name: 'Home Starter Program', features: ['1x weekly on-site home training session', '4-week workout plan', 'Online consultation', 'Nutrition plan'] },
    { name: '1:1 Home Coaching', features: ['1:1 dedicated home coaching', 'Custom workout plan', '3 weekly consultation calls', 'Comprehensive bloodwork review', 'Personalized nutrition plan'] },
  ] },
  { id: 'couples', name: 'Couples Training', short: 'Better together.', description: 'Train side by side with joint sessions, shared goals and a coach who brings out the best in both of you.', cadence: 'Joint sessions · built for two', icon: 'users', packages: [
    { name: 'Couples Personal Training', features: ['Customized on-site joint workout sessions', 'Partner accountability', 'Shared nutrition plans', 'Individual and shared goal tracking'] },
  ] },
] as const;

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