import { useEffect, useState } from "react";

const NOME_KEY = "vs_nome";
const CODIGO_KEY = "vs_codigo";

export const DEFAULT_NOME = "Antônia Rodrigues Nunes";
export const DEFAULT_CODIGO =
  "00020101021226940014br.gov.bcb.pix2572qrcode.exemplo.com.br/v2/cobv/abcdef1234567890";

function read(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

export function usePremio() {
  const [nome, setNomeState] = useState(DEFAULT_NOME);
  const [codigo, setCodigoState] = useState(DEFAULT_CODIGO);

  useEffect(() => {
    setNomeState(read(NOME_KEY, DEFAULT_NOME));
    setCodigoState(read(CODIGO_KEY, DEFAULT_CODIGO));
    const onStorage = (e: StorageEvent) => {
      if (e.key === NOME_KEY) setNomeState(e.newValue ?? DEFAULT_NOME);
      if (e.key === CODIGO_KEY) setCodigoState(e.newValue ?? DEFAULT_CODIGO);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setNome = (v: string) => {
    window.localStorage.setItem(NOME_KEY, v);
    setNomeState(v);
  };
  const setCodigo = (v: string) => {
    window.localStorage.setItem(CODIGO_KEY, v);
    setCodigoState(v);
  };

  return { nome, codigo, setNome, setCodigo };
}