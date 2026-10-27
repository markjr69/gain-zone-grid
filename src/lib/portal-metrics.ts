import { engagement } from './portal-schema';
export const WEEKLY_WORKOUT_TARGET = 2;
export function traineeProgress(userId: string, workouts: { user_id: string; completed: boolean; duration_minutes: number }[]) {
  const own = workouts.filter(w => w.user_id === userId);
  const completed = own.filter(w => w.completed);
  return { planned: own.length, done: completed.length, minutes: completed.reduce((sum, w) => sum + w.duration_minutes, 0), engagement: engagement(completed.length, own.length) };
}

export function weeklyProgress(userId: string, workouts: { user_id: string; completed: boolean; duration_minutes: number; workout_date: string }[], today: string) {
  const start = new Date(`${today}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 6);
  const firstDay = start.toISOString().slice(0, 10);
  return traineeProgress(userId, workouts.filter(w => w.workout_date >= firstDay && w.workout_date <= today));
}

export function weeklyTarget(userId: string, workouts: { user_id: string; completed: boolean; duration_minutes: number; workout_date: string }[], today: string) {
  const week = weeklyProgress(userId, workouts, today);
  return { done: week.done, target: WEEKLY_WORKOUT_TARGET };
}

export function monthlySessions<T extends { user_id: string; workout_date: string }>(userId: string, workouts: T[], today: string): T[] {
  const month = today.slice(0, 7);
  return workouts.filter(w => w.user_id === userId && w.workout_date.startsWith(month)).sort((a, b) => b.workout_date.localeCompare(a.workout_date));
}