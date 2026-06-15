-- Restringe UPDATE em premio_config: somente usuários autenticados podem alterar
DROP POLICY IF EXISTS "Anyone can update premio config" ON public.premio_config;

CREATE POLICY "Authenticated users can update premio config"
ON public.premio_config
FOR UPDATE
TO authenticated
USING (id = true)
WITH CHECK (id = true);

-- A leitura continua pública (clientes precisam ver nome/código)
-- A política SELECT existente permanece