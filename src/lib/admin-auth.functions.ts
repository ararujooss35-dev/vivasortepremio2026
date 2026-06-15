import { createServerFn } from "@tanstack/react-start";

const ADMIN_EMAIL = "admin@premio.local";
const ADMIN_PASSWORD = "Giovaldo1533";

/**
 * Garante que a conta admin exista. Idempotente.
 * Chamado pela página de login antes do signIn.
 */
export const bootstrapAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Verifica se já existe
  const { data: list } = await supabaseAdmin.auth.admin.listUsers();
  const exists = list?.users?.some((u) => u.email === ADMIN_EMAIL);
  if (exists) return { ok: true, email: ADMIN_EMAIL };

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });
  if (error) throw new Error(error.message);
  return { ok: true, email: ADMIN_EMAIL };
});

export const ADMIN_LOGIN_EMAIL = ADMIN_EMAIL;