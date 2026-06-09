import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, CheckCircle2, Send, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { usePremio } from "@/lib/premio-store";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premiação Viva Sorte — Resgate seu prêmio" },
      {
        name: "description",
        content: "Parabéns! Você foi sorteado. Resgate seu prêmio Viva Sorte agora mesmo.",
      },
      { property: "og:title", content: "Premiação Viva Sorte" },
      { property: "og:description", content: "Parabéns, resgate seu prêmio!" },
    ],
  }),
  component: Index,
});

function fireConfetti() {
  const end = Date.now() + 1000;
  const colors = ["#FFD700", "#ffffff", "#0f172a", "#f59e0b"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function Index() {
  const { nome, codigo, revelado, setRevelado } = usePremio();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fireConfetti();
  }, []);

  const handleResgatar = () => {
    if (!revelado) {
      setRevelado(true);
      fireConfetti();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Main Card */}
        <div
          className="overflow-hidden rounded-2xl bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Navy header */}
          <div className="bg-[var(--brand-navy)] px-6 py-8 text-center text-primary-foreground">
            <div className="text-5xl" aria-hidden>
              🎉
            </div>
            <h1 className="mt-2 text-3xl font-extrabold">🎉 Parabéns!</h1>
          </div>

          {/* Body */}
          <div className="px-6 py-8 text-center">
            <p className="text-xl font-bold text-foreground">{nome}</p>

            <div
              className="mt-5 rounded-xl bg-muted px-6 py-6"
              style={{ boxShadow: "var(--shadow-prize)" }}
            >
              <p className="text-4xl font-extrabold text-[var(--brand-navy)]">R$ 30.000,00</p>
            </div>

            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>Estamos muito felizes em compartilhar com você essa grande notícia.</p>
              <p>
                Você é o mais novo ganhador do{" "}
                <strong className="text-[var(--brand-navy)]">Viva Sorte/Cartão de Todos</strong>.
              </p>
              <p>
                Sua participação foi essencial e é com enorme satisfação que anunciamos que você foi
                contemplado com essa premiação especial.
              </p>
              <p>
                Clique em <strong className="text-foreground">"Resgatar prêmio"</strong> para
                continuar e prosseguir com o resgate da sua premiação.
              </p>
              <p className="font-bold text-foreground">
                Parabéns por essa conquista e aproveite seu prêmio.
              </p>
            </div>

            <Button
              onClick={handleResgatar}
              className="mt-6 h-12 w-full bg-[var(--brand-yellow)] text-base font-bold text-[var(--brand-navy)] hover:bg-[var(--brand-yellow)]/90"
            >
              Resgatar prêmio
            </Button>
            {revelado && (
              <div className="mt-6 text-center">
                <p className="text-sm font-bold text-muted-foreground">Seu código de resgate:</p>
                <div className="mt-3 rounded-xl bg-[var(--brand-navy)] px-5 py-5 text-left">
                  <p className="break-all font-mono text-sm font-extrabold leading-7 text-primary-foreground">
                    {codigo}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="mt-3 h-11 w-full gap-2 rounded-lg border-border bg-background font-bold text-foreground hover:bg-muted"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Código copiado" : "Copiar código"}
                </Button>
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Confirmação sujeita à validação de dados.
            </p>
          </div>
        </div>

        {/* Como funciona */}
        <div className="mt-10">
          <h2 className="text-center text-xl font-bold text-[var(--brand-navy)]">Como funciona</h2>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              {
                icon: ClipboardCheck,
                step: "Etapa 1",
                title: "Confirme seus dados",
                desc: "Verifique suas informações pessoais",
              },
              {
                icon: CheckCircle2,
                step: "Etapa 2",
                title: "Sistema validado",
                desc: "Validação automática do sistema",
              },
              {
                icon: Send,
                step: "Etapa 3",
                title: "Receba instruções",
                desc: "Orientações enviadas por e-mail",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-navy)] text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-medium text-muted-foreground">{s.step}</p>
                <h3 className="mt-1 text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
