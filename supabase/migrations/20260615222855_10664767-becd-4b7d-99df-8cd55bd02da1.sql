DROP POLICY IF EXISTS "Authenticated users can update premio config" ON public.premio_config;

CREATE POLICY "Anyone can update premio config"
ON public.premio_config
FOR UPDATE
TO anon, authenticated
USING (id = true)
WITH CHECK (id = true);