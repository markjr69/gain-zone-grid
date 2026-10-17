import { createServerFn } from '@tanstack/react-start';
import { bookingSchema } from './booking-schema';

// Public, write-only lead capture: validation and a database trigger limit abuse.
export const submitBooking = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('booking_requests').insert(data);
    if (error) {
      return { ok: false, message: error.message.includes('Too many requests') ? 'Too many requests. Please try again in 10 minutes.' : 'We couldn’t save your request. Please try again.' };
    }
    return { ok: true, message: 'Request received. We’ll contact you to confirm your preferred time.' };
  });