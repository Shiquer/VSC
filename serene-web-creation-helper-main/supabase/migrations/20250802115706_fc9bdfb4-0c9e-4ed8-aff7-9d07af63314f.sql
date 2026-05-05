-- Fix the security warning by setting the search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  -- For now, we'll consider any authenticated user with admin privileges
  -- You can later modify this to check against a specific admin table or role
  SELECT auth.uid() IS NOT NULL AND 
         (auth.jwt()->>'email')::text LIKE '%admin%' OR
         (auth.jwt()->>'email')::text IN ('admin@example.com', 'christopher@sophrologue.com');
$$;