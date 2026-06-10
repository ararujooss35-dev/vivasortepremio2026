import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const NOME_KEY = "vs_nome";
const CODIGO_KEY = "vs_codigo";
const PREMIO_EVENT = "premio-updated";

export const DEFAULT_NOME = "Antônia Rodrigues Nunes";
export const DEFAULT_CODIGO =
  "00020101021226940014br.gov.bcb.pix2572qrcode.exemplo.com.br/v2/cobv/abcdef1234567890";

function read(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

type PremioConfig = {
  nome: string;
  codigo: string;
};

function cacheConfig(config: PremioConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NOME_KEY, config.nome);
  window.localStorage.setItem(CODIGO_KEY, config.codigo);
}

export function usePremio() {
  const [nome, setNomeState] = useState(DEFAULT_NOME);
  const [codigo, setCodigoState] = useState(DEFAULT_CODIGO);
  const [revelado, setReveladoState] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncLocal = () => {
      setNomeState(read(NOME_KEY, DEFAULT_NOME));
      setCodigoState(read(CODIGO_KEY, DEFAULT_CODIGO));
    };
    const syncCloud = async () => {
      const { data, error } = await supabase
        .from("premio_config")
        .select("nome,codigo")
        .eq("id", true)
        .single();

      if (!error && data) {
        const next = { nome: data.nome, codigo: data.codigo };
        setNomeState(next.nome);
        setCodigoState(next.codigo);
        cacheConfig(next);
      }
      setIsReady(true);
    };

    syncLocal();
    void syncCloud();

    const onStorage = (e: StorageEvent) => {
      if (e.key === NOME_KEY || e.key === CODIGO_KEY) syncLocal();
    };
    const channel = supabase
      .channel("premio-config-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "premio_config" },
        (payload) => {
          const next = payload.new as PremioConfig;
          setNomeState(next.nome);
          setCodigoState(next.codigo);
          cacheConfig(next);
        },
      )
      .subscribe();

    window.addEventListener("storage", onStorage);
    window.addEventListener(PREMIO_EVENT, syncLocal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PREMIO_EVENT, syncLocal);
      void supabase.removeChannel(channel);
    };
  }, []);

  const setNome = async (v: string) => {
    const next = { nome: v, codigo };
    cacheConfig(next);
    setNomeState(next.nome);
    const { error } = await supabase.from("premio_config").update({ nome: v }).eq("id", true);
    if (error) throw error;
    window.dispatchEvent(new Event(PREMIO_EVENT));
  };
  const setCodigo = async (v: string) => {
    const next = { nome, codigo: v };
    cacheConfig(next);
    setCodigoState(next.codigo);
    const { error } = await supabase.from("premio_config").update({ codigo: v }).eq("id", true);
    if (error) throw error;
    window.dispatchEvent(new Event(PREMIO_EVENT));
  };
  const setRevelado = (v: boolean) => {
    setReveladoState(v);
  };

  return { nome, codigo, revelado, isReady, setNome, setCodigo, setRevelado };
}
