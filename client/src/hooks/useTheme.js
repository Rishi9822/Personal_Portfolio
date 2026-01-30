import { useEffect, useMemo, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

const TRANSITION_DURATION_MS = 300;

export const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = useMemo(() => {
    return () => {
      setIsTransitioning(true);
      const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    };
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [isTransitioning]);

  return {
    resolvedTheme,
    toggleTheme,
    isTransitioning,
  };
};
