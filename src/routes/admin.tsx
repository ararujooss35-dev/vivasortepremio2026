import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Users, DollarSign, CheckCircle2, Search, Download } from "lucide-react";

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

const resgates = [
  { nome: "Maria Silva Santos", cpf: "***.456.789-**", valor: "R$ 25.000,00", data: "09/06/2026 14:32", status: "Pago" },
  { nome: "João Pereira da Costa", cpf: "***.123.456-**", valor: "R$ 15.000,00", data: "09/06/2026 13:18", status: "Pendente" },
  { nome: "Ana Carolina Oliveira", cpf: "***.987.654-**", valor: "R$ 50.000,00", data: "09/06/2026 11:05", status: "Pago" },
  { nome: "Carlos Eduardo Lima", cpf: "***.234.567-**", valor: "R$ 10.000,00", data: "08/06/2026 22:47", status: "Pago" },
  { nome: "Fernanda Souza", cpf: "***.876.543-**", valor: "R$ 25.000,00", data: "08/06/2026 19:21", status: "Em análise" },
  { nome: "Roberto Almeida", cpf: "***.345.678-**", valor: "R$ 5.000,00", data: "08/06/2026 16:09", status: "Pago" },
  { nome: "Patrícia Mendes", cpf: "***.765.432-**", valor: "R$ 100.000,00", data: "08/06/2026 10:54", status: "Pago" },
  { nome: "Lucas Ferreira", cpf: "***.456.123-**", valor: "R$ 15.000,00", data: "07/06/2026 20:33", status: "Pendente" },
];

const statusColor: Record<string, string> = {
  Pago: "bg-primary text-primary-foreground",
  Pendente: "bg-secondary text-secondary-foreground",
  "Em análise": "bg-muted text-muted-foreground",
};

function Admin() {
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b-4 border-secondary bg-[var(--brand-green)] text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Trophy className="h-7 w-7 text-secondary" />
            <span className="text-xl font-extrabold tracking-tight">VIVA SORTE — ADMIN</span>
          </Link>
          <Badge className="bg-secondary text-secondary-foreground">v1.0</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-foreground">Painel de Resgates</h1>
          <p className="text-muted-foreground">Acompanhe todos os prêmios resgatados.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, label: "Total de resgates", value: "1.284" },
            { icon: CheckCircle2, label: "Pagos hoje", value: "47" },
            { icon: DollarSign, label: "Valor pago (mês)", value: "R$ 2.3M" },
            { icon: Trophy, label: "Maior prêmio", value: "R$ 250k" },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card className="mt-8">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou CPF..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Exportar CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ganhador</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resgates.map((r) => (
                <TableRow key={r.nome}>
                  <TableCell className="font-medium">{r.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{r.cpf}</TableCell>
                  <TableCell className="font-bold text-foreground">{r.valor}</TableCell>
                  <TableCell className="text-muted-foreground">{r.data}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[r.status]}>{r.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}