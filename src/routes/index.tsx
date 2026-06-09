import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Gift, CheckCircle2, Sparkles, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premiação Viva Sorte — Resgate seu prêmio" },
      { name: "description", content: "Parabéns! Você foi sorteado. Resgate seu prêmio Viva Sorte agora mesmo." },
      { property: "og:title", content: "Premiação Viva Sorte" },
      { property: "og:description", content: "Parabéns, resgate seu prêmio!" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-secondary bg-[var(--brand-green)] text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-7 w-7 text-secondary" />
            <span className="text-xl font-extrabold tracking-tight">VIVA SORTE</span>
          </div>
          <span className="hidden text-sm font-medium opacity-90 sm:inline">Resgate Oficial</span>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 text-center text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground">
            <Sparkles className="h-4 w-4" />
            VOCÊ FOI CONTEMPLADO!
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Parabéns! Seu prêmio está <span className="text-secondary">esperando por você</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-95">
            Você está entre os ganhadores da Premiação Viva Sorte. Resgate agora seu prêmio em dinheiro diretamente no seu PIX.
          </p>

          <Card className="mx-auto mt-10 max-w-md border-0 p-8 text-center" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-prize)" }}>
            <Gift className="mx-auto h-12 w-12 text-[var(--brand-green-dark)]" />
            <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[var(--brand-green-dark)]">Prêmio disponível</p>
            <p className="mt-1 text-5xl font-extrabold text-[var(--brand-green-dark)]">R$ 25.000,00</p>
            <p className="mt-1 text-sm font-medium text-[var(--brand-green-dark)]/80">via PIX em até 24 horas</p>
          </Card>

          <Button size="lg" className="mt-8 h-14 bg-secondary px-10 text-base font-extrabold text-secondary-foreground hover:bg-secondary/90">
            RESGATAR MEU PRÊMIO AGORA
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm opacity-90">
            <Clock className="h-4 w-4" /> Oferta expira em 24 horas
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-extrabold text-foreground">Como resgatar em 3 passos</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { n: "1", t: "Confirme seus dados", d: "Preencha nome, CPF e chave PIX." },
              { n: "2", t: "Valide o resgate", d: "Confirmamos sua premiação em segundos." },
              { n: "3", t: "Receba o PIX", d: "O valor cai na sua conta em até 24h." },
            ].map((s) => (
              <Card key={s.n} className="border-2 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-muted py-12">
        <div className="container mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "100% Seguro", d: "Pagamento via PIX oficial" },
            { icon: CheckCircle2, t: "Sorteio Auditado", d: "Resultado fiscalizado" },
            { icon: Trophy, t: "+10mil ganhadores", d: "Já receberam seus prêmios" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <b.icon className="h-10 w-10 shrink-0 text-primary" />
              <div>
                <p className="font-bold text-foreground">{b.t}</p>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand-green-dark)] py-8 text-center text-sm text-primary-foreground/80">
        <div className="container mx-auto px-4">
          <p className="font-bold text-primary-foreground">VIVA SORTE</p>
          <p className="mt-1">© {new Date().getFullYear()} Premiação Viva Sorte. Todos os direitos reservados.</p>
          <Link to="/admin" className="mt-2 inline-block text-xs underline opacity-60 hover:opacity-100">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
