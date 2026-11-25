import { Suspense } from "react";
import Confetti from "./confetti";

export const dynamic = "force-dynamic";

const TABNEWS_URL = "https://www.tabnews.com.br";
const FETCH_TIMEOUT_MS = 5000;

const mainStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
  padding: "1rem",
  textAlign: "center",
  fontFamily: "system-ui, sans-serif",
};

const descriptionStyle = {
  maxWidth: "40rem",
  fontSize: "1.25rem",
  lineHeight: 1.5,
};

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?per_page=1&strategy=new`,
      { cache: "no-store", signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
    );
    if (!response.ok) return null;
    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

async function TotalContents() {
  const totalContents = await getTotalContents();

  return (
    <p>
      {totalContents === null
        ? "Não foi possível obter o total de conteúdos publicados no TabNews."
        : `Total de conteúdos publicados no TabNews: ${totalContents.toLocaleString("pt-BR")}`}
    </p>
  );
}

export default function Page() {
  return (
    <main style={mainStyle}>
      <Confetti />
      <h1>🚧 Em Construção 🚧</h1>
      <p style={descriptionStyle}>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto.
      </p>
      <Suspense fallback={<p>Carregando total de conteúdos publicados…</p>}>
        <TotalContents />
      </Suspense>
      <a href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Acesse o TabNews oficial
      </a>
    </main>
  );
}
