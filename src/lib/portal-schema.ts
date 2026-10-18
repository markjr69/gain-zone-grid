import { z } from 'zod';

export const workoutSchema = z.object({
  title: z.string().trim().min(1).max(120),
  duration_minutes: z.coerce.number().int().min(1).max(600),
  completed: z.boolean(),
  workout_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export const fitnessEntrySchema = z.object({
  weight_kg: z.coerce.number().min(20).max(350),
  height_cm: z.coerce.number().min(100).max(250),
  calories: z.coerce.number().int().min(0).max(20000),
  entry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export function engagement(completed: number, planned: number) {
  return planned > 0 ? Math.round(completed / planned * 100) : 0;
}