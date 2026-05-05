-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  -- For now, we'll consider any authenticated user with admin privileges
  -- You can later modify this to check against a specific admin table or role
  SELECT auth.uid() IS NOT NULL AND 
         (auth.jwt()->>'email')::text LIKE '%admin%' OR
         (auth.jwt()->>'email')::text IN ('admin@example.com', 'christopher@sophrologue.com');
$$;

-- Add a policy for admins to view all bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Add a policy for admins to update all bookings
CREATE POLICY "Admins can update all bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Add a policy for admins to delete bookings if needed
CREATE POLICY "Admins can delete all bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));