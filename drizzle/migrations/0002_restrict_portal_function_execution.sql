REVOKE EXECUTE ON FUNCTION public.create_client_profile() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_view_trainee(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_view_trainee(uuid) TO authenticated, service_role;