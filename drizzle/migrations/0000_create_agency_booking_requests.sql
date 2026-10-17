CREATE TABLE public.booking_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 kind text NOT NULL CHECK (kind IN ('strategy','pilot')),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 service text NOT NULL CHECK (service IN ('Corporate Training','Home Personal Training','Couples Training')),
 goal text NOT NULL CHECK (goal IN ('Weight Loss','Strength Training','Cardio','Flexibility')),
 preferred_at timestamptz NOT NULL,
 company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 150),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 1500)
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX booking_requests_email_created_idx ON public.booking_requests (email, created_at);
CREATE FUNCTION public.limit_booking_requests() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtext(lower(NEW.email)));
 IF (SELECT count(*) FROM public.booking_requests WHERE lower(email) = lower(NEW.email) AND created_at > now() - interval '10 minutes') >= 3 THEN
 RAISE EXCEPTION 'Too many requests. Please try again later.';
 END IF;
 IF NEW.preferred_at <= now() THEN RAISE EXCEPTION 'Please choose a future call time.'; END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER limit_booking_requests BEFORE INSERT ON public.booking_requests FOR EACH ROW EXECUTE FUNCTION public.limit_booking_requests();
REVOKE ALL ON FUNCTION public.limit_booking_requests() FROM PUBLIC, anon, authenticated;