import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bookingSchema } from '@/lib/booking-schema';
import { submitBooking } from '@/lib/booking.functions';

export const fieldClass = 'w-full min-w-0 border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary';

export function BookingForm({ pilot = false, service = 'Home Personal Training' }: { pilot?: boolean; service?: string }) {
  const submit = useServerFn(submitBooking);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const localTime = String(fields.preferred_at || '');
    const date = new Date(`${localTime}:00+03:00`);
    const parsed = bookingSchema.safeParse({ ...fields, kind: pilot ? 'pilot' : 'strategy', service: pilot ? 'Corporate Training' : fields.service, preferred_at: Number.isNaN(date.getTime()) ? '' : date.toISOString() });
    if (!parsed.success) { setStatus('error'); setMessage(parsed.error.issues[0]?.message || 'Check your details.'); return; }
    setStatus('sending');
    try {
      const result = await submit({ data: parsed.data });
      setMessage(result.message);
      setStatus(result.ok ? 'success' : 'error');
      if (result.ok) form.reset();
    } catch { setStatus('error'); setMessage('Connection interrupted. Please try again.'); }
  }
  if (status === 'success') return <div role="status" className="border border-primary/40 bg-primary/5 p-8"><CheckCircle2 className="h-9 w-9 text-primary" /><h3 className="mt-5 text-2xl">Your next chapter starts here.</h3><p className="mt-3 text-sm text-muted-foreground">{message}</p><Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>Send another request</Button></div>;
  return <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
    <label className="space-y-2 text-sm">Name<input name="name" autoComplete="name" required maxLength={100} className={fieldClass} /></label>
    <label className="space-y-2 text-sm">Phone / WhatsApp Number<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} className={fieldClass} /></label>
    <label className="space-y-2 text-sm sm:col-span-2">Email Address<input name="email" type="email" autoComplete="email" required maxLength={255} className={fieldClass} /></label>
    {pilot ? <label className="space-y-2 text-sm sm:col-span-2">Company / Organization<input name="company" required maxLength={150} className={fieldClass} /></label> : <label className="space-y-2 text-sm">Service Interested In<select name="service" defaultValue={service} className={fieldClass}><option>Corporate Training</option><option>Home Personal Training</option><option>Couples Training</option></select></label>}
    <label className={`space-y-2 text-sm ${pilot ? 'sm:col-span-2' : ''}`}>Primary Fitness Goal<select name="goal" className={fieldClass}><option>Weight Loss</option><option>Strength Training</option><option>Cardio</option><option>Flexibility</option></select></label>
    <label className="space-y-2 text-sm sm:col-span-2">{pilot ? 'Preferred Pilot Date/Time' : 'Preferred Call Date/Time'}<input name="preferred_at" type="datetime-local" required className={fieldClass} /><span className="block text-xs text-muted-foreground">Kampala time (EAT / UTC+3). Subject to confirmation.</span></label>
    {pilot && <label className="space-y-2 text-sm sm:col-span-2">Office Location & Team Size<textarea name="message" rows={3} maxLength={1500} className={fieldClass} /></label>}
    <label className="flex items-start gap-2 text-xs text-muted-foreground sm:col-span-2"><input type="checkbox" required className="mt-0.5 accent-primary" />I agree to be contacted about this request. My details will not be displayed publicly.</label>
    <Button type="submit" disabled={status === 'sending'} className="h-auto min-h-12 whitespace-normal rounded-none px-6 py-4 text-xs font-bold uppercase sm:col-span-2">{status === 'sending' ? <><LoaderCircle className="animate-spin" /> Sending request…</> : <>{pilot ? 'Request My Free Corporate Pilot' : 'Schedule My Free Call'}<ArrowRight /></>}</Button>
    {status === 'error' && <p role="alert" className="text-sm text-destructive sm:col-span-2">{message}</p>}
  </form>;
}