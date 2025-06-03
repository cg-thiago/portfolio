import { useEffect, useState } from "react";
import "./HeroTypewriter.css";

export default function HeroTypewriter({ text, className = "", style = {} }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[idx]);
        setIdx(idx + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [idx, text]);

  // Suporte a quebras de linha
  const lines = displayed.split("\n");

  return (
    <span className={`typewriter-hero ${className}`} style={style}>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
      <span className="typewriter-cursor">|</span>
    </span>
  );
} 