"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carregado sob demanda: o efeito é decorativo e não precisa estar no bundle inicial.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const confettiStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  pointerEvents: "none",
};

export default function Confetti() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={400}
      style={confettiStyle}
    />
  );
}
