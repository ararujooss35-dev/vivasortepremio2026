import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Admin — Premiação Viva Sorte" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => null,
});