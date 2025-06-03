import { useEffect, useRef, useState } from "react";
import "./HeroWordWave.css";

export default function HeroWordWave({ text, className = "", style = {} }) {
  // Divide o texto em linhas e palavras
  const lines = text.split("\n").map(line => line.trim().split(" "));
  const totalWords = lines.reduce((acc, line) => acc + line.length, 0);
  const [activeIdx, setActiveIdx] = useState(-1); // -1: antes de começar
  const [done, setDone] = useState(false);
  const dotRef = useRef();

  // Animação: avança palavra por palavra
  useEffect(() => {
    if (activeIdx < totalWords - 1) {
      const t = setTimeout(() => setActiveIdx(i => i + 1), 350);
      return () => clearTimeout(t);
    } else if (activeIdx === totalWords - 1) {
      setTimeout(() => setDone(true), 600);
    }
  }, [activeIdx, totalWords]);

  // Calcula a posição do dot
  function getDotPosition() {
    let wordCount = 0;
    for (let l = 0; l < lines.length; l++) {
      for (let w = 0; w < lines[l].length; w++) {
        if (wordCount === activeIdx) {
          return { line: l, word: w };
        }
        wordCount++;
      }
    }
    // Final: ponto final
    return { line: lines.length - 1, word: lines[lines.length - 1].length - 1 };
  }

  const dotPos = getDotPosition();

  return (
    <div
      className={`herowave-container ${className}`}
      style={{ ...style, textAlign: "center", position: "absolute", left: "50%", top: 316, zIndex: 2, transform: "translateX(-50%)" }}
    >
      {lines.map((words, lIdx) => (
        <div key={lIdx} className="herowave-line">
          {words.map((word, wIdx) => {
            const wordIdx = lines.slice(0, lIdx).reduce((acc, arr) => acc + arr.length, 0) + wIdx;
            return (
              <span
                key={wIdx}
                className={`herowave-word${wordIdx <= activeIdx ? " herowave-word-active" : ""}`}
                style={{
                  transitionDelay: `${0.05 * wordIdx}s`,
                  fontFamily: "Gasoek One, sans-serif",
                  color: "#eb4700",
                  fontSize: 52,
                  marginRight: wIdx < words.length - 1 ? 12 : 0,
                  opacity: wordIdx <= activeIdx ? 1 : 0.2,
                  transform: wordIdx <= activeIdx ? "scale(1)" : "scale(0.8)"
                }}
              >
                {word}
                {/* Dot animado */}
                {dotPos.line === lIdx && dotPos.word === wIdx && !done && (
                  <span ref={dotRef} className="herowave-dot">•</span>
                )}
                {/* Ponto final */}
                {done && lIdx === lines.length - 1 && wIdx === words.length - 1 && (
                  <span className="herowave-dot herowave-dot-final">•</span>
                )}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
} 