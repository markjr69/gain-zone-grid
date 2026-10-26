import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { calculateBMI, calculateTDEE } from './fitness';
import { services } from './agency';
import { traineeProgress, weeklyProgress } from './portal-metrics';
import { calendarDateSchema } from './portal-schema';
const expect = (value: any) => ({ toBe: (expected: any) => assert.equal(value, expected), toEqual: (expected: any) => assert.deepEqual(value, expected), toBeNull: () => assert.equal(value, null), toContain: (expected: any) => assert.ok(value.includes(expected)), toBeCloseTo: (expected: number, digits: number) => assert.ok(Math.abs(value - expected) < 10 ** -digits) });

describe('fitness calculations', () => {
  it('calculates BMI and healthy category', () => { expect(calculateBMI(70, 175)?.value).toBeCloseTo(22.857, 2); expect(calculateBMI(70, 175)?.category).toBe('Healthy range'); });
  it('uses BMI category boundaries', () => { expect(calculateBMI(74, 200)?.category).toBe('Healthy range'); expect(calculateBMI(100, 200)?.category).toBe('Overweight'); expect(calculateBMI(120, 200)?.category).toBe('Obesity range'); });
  it('calculates Mifflin-St Jeor daily energy and macros', () => { expect(calculateTDEE(30, 70, 175, 1.55, 'male')).toEqual({ calories: 2556, protein: 192, carbs: 256, fat: 85 }); });
  it('rejects invalid inputs', () => { expect(calculateBMI(70, 0)).toBeNull(); expect(calculateTDEE(0, 70, 175, 1.55, 'male')).toBeNull(); });
});
describe('agency session rules', () => {
  it('Apex Starter costs $400 with one weekly session', () => { expect(services[0].packages[0].price).toBe('$400'); expect(services[0].packages[0].features).toContain('1x weekly on-site session'); });
  it('Apex Exclusive costs $800 with two weekly sessions', () => { expect(services[0].packages[1].name).toBe('Apex Exclusive Package'); expect(services[0].packages[1].price).toBe('$800'); });
  it('home starter includes one weekly session', () => expect(services[1].packages[0].features).toContain('1x weekly home training session'));
  it('couples prices are $500 and $1000', () => { expect(services[2].packages[0].price).toBe('$500'); expect(services[2].packages[1].price).toBe('$1000'); });
});
describe('private trainee progress', () => {
  it('counts only the selected trainee workouts', () => assert.deepEqual(traineeProgress('a', [{ user_id: 'a', completed: true, duration_minutes: 30 }, { user_id: 'a', completed: false, duration_minutes: 45 }, { user_id: 'b', completed: true, duration_minutes: 60 }]), { planned: 2, done: 1, minutes: 30, engagement: 50 }));
});
describe('weekly progress and journal dates', () => {
  it('counts the current seven days only for the selected trainee', () => {
    const workouts = [
      { user_id: 'a', completed: true, duration_minutes: 30, workout_date: '2026-10-19' },
      { user_id: 'a', completed: false, duration_minutes: 45, workout_date: '2026-10-25' },
      { user_id: 'a', completed: true, duration_minutes: 60, workout_date: '2026-10-18' },
      { user_id: 'a', completed: true, duration_minutes: 60, workout_date: '2026-10-26' },
      { user_id: 'b', completed: true, duration_minutes: 60, workout_date: '2026-10-25' },
    ];
    assert.deepEqual(weeklyProgress('a', workouts, '2026-10-25'), { planned: 2, done: 1, minutes: 30, engagement: 50 });
  });
  it('rejects impossible dates while accepting leap days', () => {
    assert.equal(calendarDateSchema.safeParse('2026-02-30').success, false);
    assert.equal(calendarDateSchema.safeParse('2024-02-29').success, true);
  });
});