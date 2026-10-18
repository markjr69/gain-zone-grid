import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, LockKeyhole, Mail, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { fieldClass } from '@/components/BookingForm';
import { pageHead } from '@/lib/agency';

export const Route = createFileRoute('/auth')({ head: () => pageHead('Client Portal Sign In', 'Sign in to your Apex trainee or company HR portal to track workouts, nutrition and progress.'), component: AuthPage });
function AuthPage() {
  const navigate = Route.useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { data: user } = useQuery({ queryKey: ['auth-user'], queryFn: async () => (await supabase.auth.getUser()).data.user });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    const fields = new FormData(event.currentTarget);
    try {
      if (method === 'phone') {
        const normalized = phone.replace(/[\s()-]/g, '');
        if (!/^\+[1-9]\d{7,14}$/.test(normalized)) throw new Error('Enter your phone number with country code, for example +256…');
        if (!codeSent) {
          const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
          if (error) throw new Error('SMS sign-in is not available yet. Please use email, or ask Apex to enable phone sign-in.');
          setCodeSent(true); setMessage('A verification code has been sent to your phone.');
        } else {
          const { error } = await supabase.auth.verifyOtp({ phone: normalized, token: String(fields.get('code')), type: 'sms' });
          if (error) throw error;
          await navigate({ to: '/portal', replace: true });
        }
      } else {
        const email = String(fields.get('email')).trim();
        const password = String(fields.get('password') ?? '');
        if (mode === 'reset') {
          const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
          if (error) throw error;
          setMessage('If this email has an account, a password reset link is on its way.');
        } else if (mode === 'signup') {
          const { error, data } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth`, data: { display_name: String(fields.get('name')).trim() } } });
          if (error) throw error;
          if (data.session) await navigate({ to: '/portal', replace: true });
          else setMessage('Check your email and confirm your account before signing in.');
        } else {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          await navigate({ to: '/portal', replace: true });
        }
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Sign-in failed. Please try again.'); }
    finally { setBusy(false); }
  }
  return <section className="mx-auto max-w-lg px-4 py-16 sm:px-6"><LockKeyhole className="h-9 w-9 text-primary" /><p className="mt-6 text-sm text-primary">Apex Mobile Trainers</p><h1 className="mt-3 text-4xl font-bold">Client portal</h1><p className="mt-4 text-muted-foreground">Your training. Your progress. Your next level.</p>{user ? <div className="mt-8"><Button asChild className="h-12 w-full"><Link to="/portal">Open my portal <ArrowRight /></Link></Button></div> : <><div className="mt-8 grid grid-cols-2 gap-2"><Button variant={method === 'email' ? 'default' : 'outline'} onClick={() => { setMethod('email'); setError(''); setMessage(''); }}><Mail />Email</Button><Button variant={method === 'phone' ? 'default' : 'outline'} onClick={() => { setMethod('phone'); setError(''); setMessage(''); }}><Phone />Phone</Button></div><form onSubmit={submit} className="mt-6 space-y-5">{method === 'email' ? <>{mode === 'signup' && <label className="block space-y-2 text-sm">Full name<input name="name" required maxLength={100} autoComplete="name" className={fieldClass} /></label>}<label className="block space-y-2 text-sm">Email address<input name="email" type="email" required maxLength={255} autoComplete="email" className={fieldClass} /></label>{mode !== 'reset' && <label className="block space-y-2 text-sm">Password<input name="password" type="password" required minLength={8} maxLength={128} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} className={fieldClass} /></label>}</> : <><label className="block space-y-2 text-sm">Phone number<input type="tel" required value={phone} disabled={codeSent} onChange={e => setPhone(e.target.value)} placeholder="+256" autoComplete="tel" className={fieldClass} /></label>{codeSent && <label className="block space-y-2 text-sm">Verification code<input name="code" required inputMode="numeric" autoComplete="one-time-code" minLength={4} maxLength={10} className={fieldClass} /></label>}</>}<Button disabled={busy} type="submit" className="h-12 w-full font-bold">{busy ? 'Please wait…' : method === 'phone' ? codeSent ? 'Verify & sign in' : 'Send verification code' : mode === 'signup' ? 'Create trainee account' : mode === 'reset' ? 'Send reset link' : 'Sign in'}<ArrowRight /></Button>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}{message && <p role="status" className="text-sm text-primary">{message}</p>}</form>{method === 'email' && <div className="mt-5 flex flex-wrap justify-between gap-2"><Button variant="link" className="px-0" onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setMessage(''); setError(''); }}>{mode === 'signup' ? 'Already have an account? Sign in' : 'Create an account'}</Button><Button variant="link" className="px-0" onClick={() => { setMode(mode === 'reset' ? 'signin' : 'reset'); setMessage(''); setError(''); }}>{mode === 'reset' ? 'Back to sign in' : 'Forgot password?'}</Button></div>}{method === 'phone' && codeSent && <Button variant="link" onClick={() => { setCodeSent(false); setMessage(''); }}>Use another number</Button>}</>}</section>;
}