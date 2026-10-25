import { engagement } from './portal-schema';
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