CREATE TABLE public.premio_config (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE,
  nome TEXT NOT NULL DEFAULT 'Antônia Rodrigues Nunes',
  codigo TEXT NOT NULL DEFAULT '00020101021226940014br.gov.bcb.pix2572qrcode.exemplo.com.br/v2/cobv/abcdef1234567890',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT premio_config_singleton CHECK (id = TRUE),
  CONSTRAINT premio_config_nome_not_empty CHECK (length(trim(nome)) > 0),
  CONSTRAINT premio_config_codigo_not_empty CHECK (length(trim(codigo)) > 0)
);

GRANT SELECT, UPDATE ON public.premio_config TO anon;
GRANT SELECT, UPDATE ON public.premio_config TO authenticated;
GRANT ALL ON public.premio_config TO service_role;

ALTER TABLE public.premio_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view premio config"
ON public.premio_config
FOR SELECT
TO anon, authenticated
USING (id = TRUE);

CREATE POLICY "Anyone can update premio config"
ON public.premio_config
FOR UPDATE
TO anon, authenticated
USING (id = TRUE)
WITH CHECK (id = TRUE);

CREATE OR REPLACE FUNCTION public.update_premio_config_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_premio_config_updated_at
BEFORE UPDATE ON public.premio_config
FOR EACH ROW
EXECUTE FUNCTION public.update_premio_config_updated_at();

INSERT INTO public.premio_config (id, nome, codigo)
VALUES (TRUE, 'Antônia Rodrigues Nunes', '00020101021226940014br.gov.bcb.pix2572qrcode.exemplo.com.br/v2/cobv/abcdef1234567890');