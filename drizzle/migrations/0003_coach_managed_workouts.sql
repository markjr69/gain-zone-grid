ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'coach';
ALTER TABLE public.workout_logs ADD COLUMN IF NOT EXISTS feedback text NOT NULL DEFAULT '';
CREATE OR REPLACE FUNCTION public.is_coach() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'coach')
$$;
REVOKE EXECUTE ON FUNCTION public.is_coach() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_coach() TO authenticated, service_role;
DROP POLICY IF EXISTS own_workouts ON public.workout_logs;
CREATE POLICY own_workouts_read ON public.workout_logs FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY coach_workouts ON public.workout_logs FOR ALL TO authenticated USING (public.is_coach()) WITH CHECK (public.is_coach());
CREATE POLICY coach_profiles ON public.profiles FOR SELECT TO authenticated USING (public.is_coach());
CREATE POLICY coach_fitness ON public.fitness_entries FOR SELECT TO authenticated USING (public.is_coach());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workout_logs TO authenticated;