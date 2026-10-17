import { z } from 'zod';

export const bookingSchema = z.object({
  kind: z.enum(['strategy', 'pilot']),
  name: z.string().trim().min(1, 'Enter your name.').max(100),
  phone: z.string().trim().min(7).max(30).regex(/^[+\d\s()-]+$/, 'Enter a valid phone number.'),
  email: z.string().trim().email('Enter a valid email address.').max(255),
  service: z.enum(['Corporate Training', 'Home Personal Training', 'Couples Training']),
  goal: z.enum(['Weight Loss', 'Strength Training', 'Cardio', 'Flexibility']),
  preferred_at: z.string().datetime().refine(value => new Date(value).getTime() > Date.now(), 'Choose a future date and time.'),
  company: z.string().trim().max(150).default(''),
  message: z.string().trim().max(1500).default(''),
}).refine(value => value.kind !== 'pilot' || value.company.length > 0, { message: 'Enter your company name.', path: ['company'] });