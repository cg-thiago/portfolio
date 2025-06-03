"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
  { path: "/", import: () => import("../page") },
  { path: "/work", import: () => import("../work/page") },
  { path: "/about", import: () => import("../about/page") },
  { path: "/contact", import: () => import("../contact/page") },
];

export default function InfinitePageScroller() {
  const [loadedPages, setLoadedPages] = useState([0]); // index in PAGES
  const [components, setComponents] = useState({});
  const containerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load the first page
  useEffect(() => {
    loadPage(0);
    // eslint-disable-next-line
  }, []);

  // Update URL on section change
  useEffect(() => {
    const idx = loadedPages[loadedPages.length - 1];
    if (PAGES[idx].path !== pathname) {
      router.replace(PAGES[idx].path);
    }
    // eslint-disable-next-line
  }, [loadedPages]);

  // Infinite scroll logic
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const { bottom } = containerRef.current.getBoundingClientRect();
      if (bottom <= window.innerHeight + 100) {
        loadNextPage();
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Arrow down loads next page
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowDown") {
        loadNextPage();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function loadPage(idx) {
    if (components[idx]) return;
    PAGES[idx].import().then((mod) => {
      setComponents((prev) => ({ ...prev, [idx]: mod.default }));
    });
  }

  function loadNextPage() {
    setLoadedPages((prev) => {
      const nextIdx = (prev[prev.length - 1] + 1) % PAGES.length;
      if (!prev.includes(nextIdx)) {
        loadPage(nextIdx);
        return [...prev, nextIdx];
      } else if (prev.length < PAGES.length * 2) {
        // Loop: permite repetir as páginas
        loadPage(nextIdx);
        return [...prev, nextIdx];
      }
      return prev;
    });
  }

  return (
    <div ref={containerRef}>
      {loadedPages.map((idx, i) => {
        const Comp = components[idx];
        return (
          <AnimatePresence key={i}>
            {Comp && (
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.6 }}
              >
                <Comp />
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
} 