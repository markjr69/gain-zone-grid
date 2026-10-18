import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/agency';
import { Button } from '@/components/ui/button';
import { fieldClass } from '@/components/BookingForm';

export const Route = createFileRoute('/reset-password')({ head: () => pageHead('Reset Your Password', 'Securely reset the password for your Apex Mobile Trainers client account.'), component: ResetPasswordPage });
function ResetPasswordPage() {
  const [recovery, setRecovery] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => { setRecovery(new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery'); }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true);
    const fields = new FormData(e.currentTarget);
    const password = String(fields.get('password'));
    if (password !== fields.get('confirm')) { setMessage('Passwords must match.'); setBusy(false); return; }
    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error ? error.message : 'Your password has been updated.'); setDone(!error); setBusy(false);
  }
  return <section className="mx-auto max-w-lg px-4 py-16"><h1 className="text-4xl">Reset password</h1>{recovery && !done ? <form onSubmit={submit} className="mt-8 space-y-5"><label className="block space-y-2">New password<input name="password" type="password" minLength={8} maxLength={128} autoComplete="new-password" required className={fieldClass} /></label><label className="block space-y-2">Confirm password<input name="confirm" type="password" minLength={8} maxLength={128} autoComplete="new-password" required className={fieldClass} /></label><Button disabled={busy} className="w-full">{busy ? 'Saving…' : 'Set new password'}</Button></form> : <p className="mt-6 text-muted-foreground">{done ? 'Your account is ready.' : 'Open the password reset link from your email to continue.'}</p>}{message && <p role="status" className="mt-5">{message}</p>}<Button asChild variant="link" className="mt-5 px-0"><Link to="/auth">Back to client portal</Link></Button></section>;
}