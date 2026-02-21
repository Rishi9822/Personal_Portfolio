import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RevealLoader from "./components/RevealLoader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>

        {/* App Content (Always Mounted) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </motion.div>

        {/* Loader Overlay */}
        {loading && (
          <RevealLoader
            text="WELCOME TO MY PORTFOLIO"
            bgColors={["#1F2A38", "#16202C"]}
            staggerOrder="center-out"
            textFadeDelay={0.5}
            onComplete={() => setLoading(false)}
          />
        )}

      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
