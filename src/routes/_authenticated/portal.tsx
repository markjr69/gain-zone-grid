import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState, type FormEvent } from 'react';
import { Activity, Check, Dumbbell, Flame, LogOut, Users } from 'lucide-react';
import { getPortal, saveFitnessEntry, saveProfile } from '@/lib/portal.functions';
import { traineeProgress, weeklyTarget, monthlySessions, WEEKLY_WORKOUT_TARGET } from '@/lib/portal-metrics';
import { calculateBMI } from '@/lib/fitness';
import { pageHead } from '@/lib/agency';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { fieldClass } from '@/components/BookingForm';
import { FitnessCalculators } from '@/components/FitnessCalculators';
const portalQuery = queryOptions({ queryKey: ['portal'], queryFn: () => getPortal() });
export const Route = createFileRoute('/_authenticated/portal')({
  head: () => pageHead('Client Fitness Portal', 'Your private Apex workout, nutrition and company wellness progress.'),
  loader: ({ context }) => context.queryClient.ensureQueryData(portalQuery),
  pendingComponent: () => <section role="status" className="mx-auto max-w-7xl px-4 py-16"><Activity className="h-7 w-7 animate-pulse text-primary" /><p className="mt-4 text-muted-foreground">Loading your training progress…</p></section>,
  errorComponent: ({ reset }) => <section className="mx-auto max-w-xl px-4 py-16"><h1 className="text-3xl">Your progress is temporarily unavailable.</h1><p role="alert" className="mt-4 text-muted-foreground">Please retry. Your saved records have not been changed.</p><div className="mt-6 flex gap-3"><Button onClick={reset}>Try again</Button><Button asChild variant="outline"><Link to="/auth">Client sign in</Link></Button></div></section>,
  component: PortalPage,
});
function PortalPage() {
  const { data } = useSuspenseQuery(portalQuery);
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();
  const addEntry = useServerFn(saveFitnessEntry);
  const updateProfile = useServerFn(saveProfile);
  const [view, setView] = useState<'trainee' | 'hr'>('trainee');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kampala' }).format(new Date());
  const profile = data.profiles.find(p => p.id === data.userId);
  const workouts = data.workouts.filter(w => w.user_id === data.userId);
  const entries = data.entries.filter(e => e.user_id === data.userId);
  const latest = entries[0];
  const stats = traineeProgress(data.userId, workouts);
  const target = weeklyTarget(data.userId, workouts, today);
  const monthSessions = monthlySessions(data.userId, workouts, today);
  const bmi = latest ? calculateBMI(latest.weight_kg, latest.height_cm) : null;
  async function run(action: () => Promise<unknown>) {
    setBusy(true); setError(''); setMessage('');
    try { await action(); await queryClient.invalidateQueries({ queryKey: ['portal'] }); setMessage('Saved successfully.'); }
    catch { setError('Unable to save. Check your details and try again.'); }
    finally { setBusy(false); }
  }
    function submitEntry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    void run(() => addEntry({ data: { weight_kg: Number(f.get('weight')), height_cm: Number(f.get('height')), calories: Number(f.get('calories')), entry_date: String(f.get('date')) } }));
  }
  async function signOut() {
    setBusy(true);
    try { await queryClient.cancelQueries(); queryClient.clear(); const { error } = await supabase.auth.signOut(); if (error) throw error; await navigate({ to: '/auth', replace: true }); }
    catch { setError('Sign-out failed. Please try again.'); }
    finally { setBusy(false); }
  }
  const traineeIds = Array.from(new Set(data.members.map(m => m.user_id))).filter(id => data.profiles.some(p => p.id === id));
  const ranked = traineeIds.map(id => ({ id, name: data.profiles.find(p => p.id === id)?.display_name || 'Trainee', ...traineeProgress(id, data.workouts) })).sort((a, b) => b.done - a.done);
  return <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-sm font-semibold text-primary">Apex client portal</p><h1 className="mt-3 text-3xl sm:text-4xl">Welcome{profile?.display_name ? `, ${profile.display_name}` : ' to your training space'}.</h1></div><Button variant="outline" disabled={busy} onClick={signOut}><LogOut />Sign out</Button></div><div className="mt-8 flex gap-2"><Button variant={view === 'trainee' ? 'default' : 'outline'} onClick={() => setView('trainee')}><Dumbbell />Trainee</Button>{data.isHR && <Button variant={view === 'hr' ? 'default' : 'outline'} onClick={() => setView('hr')}><Users />HR</Button>}</div>{error && <p role="alert" className="mt-5 text-destructive">{error}</p>}{message && <p role="status" className="mt-5 text-primary">{message}</p>}
  {view === 'trainee' ? <><div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{[{ title: 'Workouts trained', value: stats.planned, icon: Dumbbell }, { title: 'Workouts done', value: stats.done, icon: Check }, { title: 'Latest BMI', value: bmi?.value.toFixed(1) ?? '—', icon: Activity }, { title: 'Latest calories', value: latest ? `${latest.calories} kcal` : '—', icon: Flame }].map(m => <div key={m.title} className="border border-border bg-surface p-5"><m.icon className="h-5 w-5 text-primary" /><p className="mt-4 break-words text-2xl font-bold">{m.value}</p><p className="mt-2 text-xs text-muted-foreground">{m.title}</p></div>)}</div>
  <section className="mt-8 border-y border-border py-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl">Weekly target</h2><p className="mt-1 text-sm text-muted-foreground">Hit {WEEKLY_WORKOUT_TARGET} workouts every week to keep momentum.</p></div><p className="text-3xl font-bold text-primary">{target.done}<span className="text-muted-foreground">/{target.target}</span> <span className="text-sm font-normal text-muted-foreground">workouts this week</span></p></div><progress value={target.done} max={target.target} aria-label="Weekly workout target progress" className="mt-4 h-2 w-full accent-primary" /></section><div className="mt-10 grid gap-10 lg:grid-cols-2"><section><h2 className="text-2xl">Session history</h2><p className="mt-2 text-sm text-muted-foreground">This month’s sessions and your trainer’s notes.</p><div className="mt-6 divide-y divide-border">{monthSessions.length ? monthSessions.map(w => <div key={w.id} className="py-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{w.title}</p><span className={`text-xs font-semibold ${w.completed ? 'text-primary' : 'text-muted-foreground'}`}>{w.completed ? 'Completed' : 'Planned'}</span></div><p className="mt-1 text-xs text-muted-foreground">{w.workout_date} · {w.duration_minutes} min</p>{w.feedback && <p className="mt-2 border-l-2 border-primary pl-3 text-sm"><span className="font-semibold">Trainer’s notes: </span>{w.feedback}</p>}</div>) : <p className="py-5 text-sm text-muted-foreground">No sessions recorded this month yet.</p>}</div></section>
  <section><h2 className="text-2xl">Body & calorie journal</h2><form onSubmit={submitEntry} className="mt-5 grid grid-cols-2 gap-4"><label className="text-sm">Weight (kg)<input name="weight" type="number" step="0.1" min={20} max={350} defaultValue={latest?.weight_kg} required className={fieldClass} /></label><label className="text-sm">Height (cm)<input name="height" type="number" step="0.1" min={100} max={250} defaultValue={latest?.height_cm} required className={fieldClass} /></label><label className="text-sm">Calories consumed<input name="calories" type="number" min={0} max={20000} required className={fieldClass} /></label><label className="text-sm">Date<input name="date" type="date" required defaultValue={today} className={fieldClass} /></label><Button type="submit" disabled={busy} className="col-span-2 justify-self-start"><Flame />Save daily entry</Button></form><div className="mt-6 divide-y divide-border">{entries.length ? entries.map(e => <div key={e.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span>{e.entry_date}</span><span className="text-muted-foreground">{e.weight_kg} kg · {e.calories} kcal · BMI {calculateBMI(e.weight_kg, e.height_cm)?.value.toFixed(1)}</span></div>) : <p className="py-5 text-sm text-muted-foreground">No daily entries recorded yet.</p>}</div></section></div><section className="mt-10 border-t border-border pt-8"><h2 className="text-2xl">Fitness calculators</h2><FitnessCalculators /></section><form className="mt-10 max-w-md border-t border-border pt-8" onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); void run(() => updateProfile({ data: { display_name: String(f.get('name')) } })); }}><label className="block text-sm">Profile name<input name="name" defaultValue={profile?.display_name} required maxLength={100} className={fieldClass} /></label><Button type="submit" disabled={busy} variant="outline" className="mt-4">Save profile</Button></form></>
  : <section className="mt-8"><h2 className="text-2xl">HR department — company wellness</h2><p className="mt-2 text-sm text-muted-foreground">{data.companies.map(c => c.name).join(' · ') || 'No company assigned'}</p><div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{[['Trainees', ranked.length], ['Completed workouts', ranked.reduce((s, r) => s + r.done, 0)], ['Active trainees', ranked.filter(r => r.done > 0).length], ['Training minutes', ranked.reduce((s, r) => s + r.minutes, 0)]].map(([label, value]) => <div key={label} className="border border-border bg-surface p-5"><p className="text-2xl font-bold text-primary">{value}</p><p className="mt-2 text-xs text-muted-foreground">{label}</p></div>)}</div><h3 className="mt-10 text-xl">Most active trainees</h3><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[540px] text-left text-sm"><thead className="border-b border-border text-muted-foreground"><tr>{['Trainee', 'Workouts', 'Completed', 'Engagement', 'Minutes'].map(t => <th key={t} className="p-3 font-medium">{t}</th>)}</tr></thead><tbody>{ranked.map(r => <tr key={r.id} className="border-b border-border"><td className="p-3 font-semibold">{r.name}</td><td className="p-3">{r.planned}</td><td className="p-3">{r.done}</td><td className="p-3 text-primary"><span>{r.engagement}%</span><progress value={r.engagement} max={100} aria-label={`${r.name} engagement`} className="mt-2 block h-1 w-20 accent-primary" /></td><td className="p-3">{r.minutes}</td></tr>)}</tbody></table></div>{!ranked.length && <p className="mt-5 text-sm text-muted-foreground">No trainees assigned to your company yet.</p>}</section>}</section>;
}