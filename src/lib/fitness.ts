export function calculateBMI(weight: number, height: number) {
  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight < 20 || weight > 350 || height < 100 || height > 250) return null;
  const value = weight / (height / 100) ** 2;
  const category = value < 18.5 ? 'Underweight' : value < 25 ? 'Healthy range' : value < 30 ? 'Overweight' : 'Obesity range';
  return { value, category };
}

export function calculateTDEE(age: number, weight: number, height: number, activity: number, sex: 'male' | 'female') {
  if (!calculateBMI(weight, height) || !Number.isFinite(age) || age < 18 || age > 100 || ![1.2, 1.375, 1.55, 1.725, 1.9].includes(activity)) return null;
  const calories = Math.round((10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161)) * activity);
  return { calories, protein: Math.round(calories * .3 / 4), carbs: Math.round(calories * .4 / 4), fat: Math.round(calories * .3 / 9) };
}