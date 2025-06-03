"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcutsProvider() {
  const router = useRouter();

  const handleKeyDown = useCallback((e) => {
    if (e.key.toLowerCase() === "h") router.push("/");
    if (e.key.toLowerCase() === "w") router.push("/work");
    if (e.key.toLowerCase() === "a") window.location.href = "/about";
    if (e.key.toLowerCase() === "b") window.open("https://cal.com/thiagopinto", "_blank");
    if (e.key.toLowerCase() === "l") window.open("https://www.linkedin.com/in/thiagopinto/", "_blank");
  }, [router]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return null;
} 