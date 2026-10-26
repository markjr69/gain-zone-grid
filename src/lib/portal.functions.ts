import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { fitnessEntrySchema, workoutSchema } from './portal-schema';
import { z } from 'zod';

export const getPortal = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context: { supabase, userId } }) => {
    const [profiles, workouts, entries, roles, members, companies] = await Promise.all([
      supabase.from('profiles').select('id,display_name'),
      supabase.from('workout_logs').select('*').order('workout_date', { ascending: false }),
      supabase.from('fitness_entries').select('*').order('entry_date', { ascending: false }),
      supabase.from('user_roles').select('role').eq('user_id', userId),
      supabase.from('company_members').select('*'),
      supabase.from('companies').select('*'),
    ]);
    for (const result of [profiles, workouts, entries, roles, members, companies]) {
      if (result.error) throw new Error('Unable to load your portal. Please try again.');
    }
    const roleList = (roles.data ?? []).map(r => String(r.role));
    return { userId, profiles: profiles.data ?? [], workouts: workouts.data ?? [], entries: entries.data ?? [], isHR: roleList.includes('hr'), isCoach: roleList.includes('coach'), members: members.data ?? [], companies: companies.data ?? [] };
  });

// Coach-only: row-level policies reject writes from non-coach accounts.
export const saveWorkout = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(workoutSchema.extend({ user_id: z.string().uuid(), feedback: z.string().trim().max(2000).default('') }))
  .handler(async ({ data, context: { supabase } }) => {
    const { error } = await supabase.from('workout_logs').insert(data);
    if (error) throw new Error('Only your coach can record workouts.');
    return { ok: true };
  });
export const updateWorkout = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid(), completed: z.boolean(), feedback: z.string().trim().max(2000) }))
  .handler(async ({ data, context: { supabase } }) => {
    const { data: rows, error } = await supabase.from('workout_logs').update({ completed: data.completed, feedback: data.feedback }).eq('id', data.id).select('id');
    if (error || !rows?.length) throw new Error('Unable to update this workout.');
    return { ok: true };
  });
export const saveFitnessEntry = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(fitnessEntrySchema)
  .handler(async ({ data, context: { supabase, userId } }) => {
    const { error } = await supabase.from('fitness_entries').upsert({ ...data, user_id: userId }, { onConflict: 'user_id,entry_date' });
    if (error) throw new Error('Your daily entry could not be saved. Please try again.');
    return { ok: true };
  });
export const saveProfile = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ display_name: z.string().trim().min(1).max(100) }))
  .handler(async ({ data, context: { supabase, userId } }) => {
    const { error } = await supabase.from('profiles').update(data).eq('id', userId);
    if (error) throw new Error('Your name could not be saved.');
    return { ok: true };
  });
