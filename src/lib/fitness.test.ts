import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { calculateBMI, calculateTDEE } from './fitness';
import { services } from './agency';
import { traineeProgress } from './portal-metrics';
const expect = (value: any) => ({ toBe: (expected: any) => assert.equal(value, expected), toEqual: (expected: any) => assert.deepEqual(value, expected), toBeNull: () => assert.equal(value, null), toContain: (expected: any) => assert.ok(value.includes(expected)), toBeCloseTo: (expected: number, digits: number) => assert.ok(Math.abs(value - expected) < 10 ** -digits) });

describe('fitness calculations', () => {
  it('calculates BMI and healthy category', () => { expect(calculateBMI(70, 175)?.value).toBeCloseTo(22.857, 2); expect(calculateBMI(70, 175)?.category).toBe('Healthy range'); });
  it('uses BMI category boundaries', () => { expect(calculateBMI(74, 200)?.category).toBe('Healthy range'); expect(calculateBMI(100, 200)?.category).toBe('Overweight'); expect(calculateBMI(120, 200)?.category).toBe('Obesity range'); });
  it('calculates Mifflin-St Jeor daily energy and macros', () => { expect(calculateTDEE(30, 70, 175, 1.55, 'male')).toEqual({ calories: 2556, protein: 192, carbs: 256, fat: 85 }); });
  it('rejects invalid inputs', () => { expect(calculateBMI(70, 0)).toBeNull(); expect(calculateTDEE(0, 70, 175, 1.55, 'male')).toBeNull(); });
});
describe('agency session rules', () => {
  it('corporate starter includes two weekly on-site sessions', () => expect(services[0].packages[0].features).toContain('2x weekly on-site team sessions'));
  it('corporate individual includes two weekly on-site sessions', () => expect(services[0].packages[1].features).toContain('2x weekly 1:1 on-site coaching'));
  it('home starter includes one weekly session', () => expect(services[1].packages[0].features).toContain('1x weekly on-site home training session'));
});
describe('private trainee progress', () => {
  it('counts only the selected trainee workouts', () => assert.deepEqual(traineeProgress('a', [{ user_id: 'a', completed: true, duration_minutes: 30 }, { user_id: 'a', completed: false, duration_minutes: 45 }, { user_id: 'b', completed: true, duration_minutes: 60 }]), { planned: 2, done: 1, minutes: 30, engagement: 50 }));
});