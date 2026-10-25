import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const answers = [
  ['Where do sessions take place?', 'At your office, home or compound in Kampala. Share your location when you request a call so Apex can confirm arrangements.'],
  ['Do I need gym equipment?', 'No equipment is needed to get started. Your coach adapts the session to your space and training goals.'],
  ['Which package should I choose?', 'Choose corporate coaching for your team, home coaching for individual attention, or couples training to work towards goals together. A free 15-minute strategy call helps you discuss the right fit.'],
  ['How much does training cost?', 'Pricing is tailored to your location, goals and team size. Discuss your preferred package with Apex before making a commitment.'],
  ['Can our company try a session first?', 'Yes. Request a free 30-minute on-site corporate pilot. Your preferred time is subject to confirmation.'],
  ['Who can see my fitness progress?', 'Your portal is private. You can view your own records, and privately assigned company HR can view progress only for trainees in their company.'],
] as const;

export function TrainingFAQ() {
  return <section className="mt-16 border-t border-border pt-10"><p className="text-sm font-semibold text-primary">Before you start</p><h2 className="mt-3 text-3xl">Your training questions, answered.</h2><Accordion type="single" collapsible className="mt-6 max-w-3xl">{answers.map(([question, answer], index) => <AccordionItem key={question} value={`question-${index}`}><AccordionTrigger className="gap-4 py-5 text-base">{question}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></section>;
}