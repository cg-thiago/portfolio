import { useRef, useEffect, useState } from "react";
import "./HeroJumpTypewriter.css";

export default function HeroJumpTypewriter({ text, className = "", style = {}, onComplete }) {
  // Divide o texto em linhas e palavras
  const lines = text.split("\n").map(line => line.trim().split(" "));
  const wordRefs = useRef([]);
  const cursorRef = useRef();
  const [show, setShow] = useState(false);

  // Limpa refs a cada render
  wordRefs.current = [];

  // Chama onComplete e ativa fade-in após mount
  useEffect(() => {
    setShow(true);
    if (onComplete) onComplete();
  }, [onComplete]);

  // Total de palavras
  const totalWords = lines.reduce((acc, line) => acc + line.length, 0);

  return (
    <div
      className={`herojump-container ${className} transition-opacity duration-700 ${show ? 'opacity-100' : 'opacity-0'}`}
      style={{ ...style, textAlign: "center", position: "absolute", left: "50%", top: 316, zIndex: 2, transform: "translateX(-50%)" }}
    >
      {lines.map((words, lIdx) => (
        <div key={lIdx} className="herojump-line">
          {words.map((word, wIdx) => {
            const wordIdx = lines.slice(0, lIdx).reduce((acc, arr) => acc + arr.length, 0) + wIdx;
            return (
              <span
                key={wIdx}
                ref={el => wordRefs.current[wordIdx] = el}
                className="herojump-word herojump-word-gsap"
                style={{
                  fontFamily: "Gasoek One, sans-serif",
                  color: "#eb4700",
                  marginRight: wIdx < words.length - 1 ? 12 : 0,
                  textTransform: "uppercase"
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
} 