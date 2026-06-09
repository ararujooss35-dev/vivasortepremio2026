import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, User, Save, RotateCw, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { usePremio } from "@/lib/premio-store";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Premiação Viva Sorte" },
      { name: "description", content: "Painel administrativo dos resgates Viva Sorte." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { nome, codigo, revelado, setNome, setCodigo, setRevelado } = usePremio();
  const [nomeInput, setNomeInput] = useState(nome);
  const [codigoInput, setCodigoInput] = useState(codigo);

  useEffect(() => {
    setNomeInput(nome);
  }, [nome]);

  useEffect(() => {
    setCodigoInput(codigo);
  }, [codigo]);

  const salvarTudo = () => {
    const nomeTrim = nomeInput.trim();
    const codigoTrim = codigoInput.trim();
    if (!nomeTrim) {
      toast.error("Digite um nome válido");
      return;
    }
    if (!codigoTrim) {
      toast.error("Digite um código válido");
      return;
    }
    setNome(nomeTrim);
    setCodigo(codigoTrim);
    toast.success("Alterações salvas");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div
        className="mx-auto w-full max-w-md rounded-2xl bg-card p-6 sm:p-8"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-navy)]">
            <Settings className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Painel de Controle</h1>
          <p className="text-sm text-muted-foreground">Gerencie o prêmio</p>
        </div>

        {/* Nome */}
        <div className="mt-6 rounded-xl bg-muted px-4 py-4 text-center">
          <p className="text-xs font-medium text-muted-foreground">Nome atual</p>
          <p className="mt-1 flex items-center justify-center gap-2 font-bold text-[var(--brand-navy)]">
            <User className="h-4 w-4" />
            {nome}
          </p>
        </div>

        <div className="mt-5">
          <label className="text-sm font-bold text-foreground">Novo nome</label>
          <Input
            placeholder="Ex: João Silva"
            value={nomeInput}
            onChange={(e) => setNomeInput(e.target.value)}
            className="mt-2"
          />
        </div>

        <hr className="my-7 border-border" />

        {/* Código */}
        <div className="rounded-xl bg-muted px-4 py-4 text-center">
          <p className="text-xs font-medium text-muted-foreground">Código atual</p>
          <p className="mt-1 break-all font-mono text-xs font-bold text-[var(--brand-navy)]">
            {codigo}
          </p>
        </div>

        <div className="mt-5">
          <label className="text-sm font-bold text-foreground">Novo código</label>
          <Input
            placeholder="Ex: VS-12345"
            value={codigoInput}
            onChange={(e) => setCodigoInput(e.target.value)}
            className="mt-2"
          />
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setNomeInput(nome);
                setCodigoInput(codigo);
              }}
              className="h-11 flex-1 gap-2 font-bold"
            >
              <RotateCw className="h-4 w-4" /> Restaurar
            </Button>
            <Button
              onClick={salvarTudo}
              className="h-11 flex-1 gap-2 bg-[var(--brand-navy)] font-bold text-primary-foreground hover:bg-[var(--brand-navy)]/90"
            >
              <Save className="h-4 w-4" /> Salvar
            </Button>
          </div>
        </div>

        {/* Resetar visualização */}
        {revelado && (
          <>
            <hr className="my-7 border-border" />
            <Button
              variant="outline"
              onClick={() => {
                setRevelado(false);
                toast.success("Visualização resetada");
              }}
              className="h-11 w-full gap-2 font-bold"
            >
              <EyeOff className="h-4 w-4" /> Esconder código no site
            </Button>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
}
