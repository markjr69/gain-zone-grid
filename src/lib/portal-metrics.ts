import { engagement } from './portal-schema';
export function traineeProgress(userId: string, workouts: { user_id: string; completed: boolean; duration_minutes: number }[]) {
  const own = workouts.filter(w => w.user_id === userId);
  const completed = own.filter(w => w.completed);
  return { planned: own.length, done: completed.length, minutes: completed.reduce((sum, w) => sum + w.duration_minutes, 0), engagement: engagement(completed.length, own.length) };
}