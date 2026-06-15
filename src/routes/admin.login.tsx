import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapAdmin, ADMIN_LOGIN_EMAIL } from "@/lib/admin-auth.functions";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acesso restrito" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Garante que a conta admin exista
    void bootstrapAdmin({ data: undefined }).catch(() => {});
    // Se já logado, vai direto pro painel
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senha) return;
    setLoading(true);
    try {
      await bootstrapAdmin({ data: undefined }).catch(() => {});
      const { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_LOGIN_EMAIL,
        password: senha,
      });
      if (error) {
        toast.error("Senha incorreta");
        return;
      }
      navigate({ to: "/admin" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <form
        onSubmit={entrar}
        className="mx-auto w-full max-w-sm rounded-2xl bg-card p-8"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-navy)]">
            <Lock className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Acesso restrito</h1>
          <p className="text-sm text-muted-foreground">Digite a senha para continuar</p>
        </div>

        <div className="mt-6">
          <label className="text-sm font-bold text-foreground">Senha</label>
          <Input
            type="password"
            autoFocus
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-2"
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-5 h-11 w-full gap-2 bg-[var(--brand-navy)] font-bold text-primary-foreground hover:bg-[var(--brand-navy)]/90"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}