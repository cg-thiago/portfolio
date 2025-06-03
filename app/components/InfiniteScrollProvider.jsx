import { createContext, useContext, useEffect, useRef, useState } from 'react';

const InfiniteScrollContext = createContext({ onLoadMore: () => {} });

export function InfiniteScrollProvider({ onLoadMore, children }) {
  const callbackRef = useRef(onLoadMore);
  callbackRef.current = onLoadMore;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (typeof window === 'undefined') return;
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        callbackRef.current && callbackRef.current();
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        callbackRef.current && callbackRef.current();
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!mounted) return null;

  return (
    <InfiniteScrollContext.Provider value={{}}>
      {children}
    </InfiniteScrollContext.Provider>
  );
}

export function useInfiniteScroll() {
  return useContext(InfiniteScrollContext);
} 