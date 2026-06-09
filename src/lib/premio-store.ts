import { useEffect, useState } from "react";

const NOME_KEY = "vs_nome";
const CODIGO_KEY = "vs_codigo";
const REVELADO_KEY = "vs_revelado";
const PREMIO_EVENT = "premio-updated";

export const DEFAULT_NOME = "Antônia Rodrigues Nunes";
export const DEFAULT_CODIGO =
  "00020101021226940014br.gov.bcb.pix2572qrcode.exemplo.com.br/v2/cobv/abcdef1234567890";

function read(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

function readBool(key: string, fallback: boolean) {
  if (typeof window === "undefined") return fallback;
  const v = window.localStorage.getItem(key);
  return v === null ? fallback : v === "true";
}

export function usePremio() {
  const [nome, setNomeState] = useState(DEFAULT_NOME);
  const [codigo, setCodigoState] = useState(DEFAULT_CODIGO);
  const [revelado, setReveladoState] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setNomeState(read(NOME_KEY, DEFAULT_NOME));
      setCodigoState(read(CODIGO_KEY, DEFAULT_CODIGO));
      setReveladoState(readBool(REVELADO_KEY, false));
      setIsReady(true);
    };
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === NOME_KEY || e.key === CODIGO_KEY || e.key === REVELADO_KEY) sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(PREMIO_EVENT, sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PREMIO_EVENT, sync);
    };
  }, []);

  const setNome = (v: string) => {
    window.localStorage.setItem(NOME_KEY, v);
    setNomeState(v);
    window.dispatchEvent(new Event(PREMIO_EVENT));
  };
  const setCodigo = (v: string) => {
    window.localStorage.setItem(CODIGO_KEY, v);
    setCodigoState(v);
    window.dispatchEvent(new Event(PREMIO_EVENT));
  };
  const setRevelado = (v: boolean) => {
    window.localStorage.setItem(REVELADO_KEY, String(v));
    setReveladoState(v);
    window.dispatchEvent(new Event(PREMIO_EVENT));
  };

  return { nome, codigo, revelado, isReady, setNome, setCodigo, setRevelado };
}
