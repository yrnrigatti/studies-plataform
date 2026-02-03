-- Test: Verify that inserting into auth.users triggers insertion into public.users

do $$
declare
  new_user_id uuid := gen_random_uuid();
  new_email text := 'trigger_test_' || gen_random_uuid()::text || '@example.com';
begin
  -- 1. Insert into auth.users (simulating Supabase Auth)
  -- Note: This requires postgres role or service_role. Local supabase postgres key typically has this.
  insert into auth.users (id, email, aud, role)
  values (new_user_id, new_email, 'authenticated', 'authenticated');

  -- 2. Check if user exists in public.users
  if exists (select 1 from public.users where id = new_user_id and email = new_email) then
    raise notice 'SUCCESS: User synced to public table.';
  else
    raise exception 'FAILURE: User NOT found in public table.';
  end if;

  -- 3. Cleanup
  delete from auth.users where id = new_user_id;
  -- Trigger does not automatically delete from public.users usually, unless configured.
  -- We should clean up public.users too if cascade isn't set.
  delete from public.users where id = new_user_id;

end $$;
