"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export function TestimonialsCard({
  items,
  className,
  width = 400,
  showNavigation = true,
  showCounter = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeItem = items[activeIndex];

  React.useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const rotations = useMemo(() => [4, -2, -9, 7], []);

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8", className)}>
      <div
        className="relative grid w-full grid-cols-1 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-rows-[auto_auto_auto] md:gap-x-8 md:gap-y-2"
        style={{ perspective: "1400px", maxWidth: `${width}px` }}
      >
        {showCounter && (
          <div className="order-3 md:order-none md:col-start-2 md:row-start-1 text-left md:text-right font-mono text-sm text-neutral-500">
            {activeIndex + 1} / {items.length}
          </div>
        )}

        <div className="order-1 md:order-none md:col-start-1 md:row-start-1 md:row-span-3 relative w-full aspect-[16/10] min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px]">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-white/15 bg-neutral-900 shadow-[0_30px_80px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                  initial={{
                    x: offset * 15,
                    y: Math.abs(offset) * 6,
                    z: -150 * Math.abs(offset),
                    scale: 0.85 - Math.abs(offset) * 0.04,
                    rotateZ: rotations[index % 4],
                    opacity: isActive ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 15, direction === 1 ? -200 : 200, 0],
                          y: [Math.abs(offset) * 6, 0, 0],
                          z: [-200, 150, 250],
                          scale: [0.85, 1.05, 1],
                          rotateZ: [rotations[index % 4], -5, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 15,
                          y: Math.abs(offset) * 6,
                          z: -150 * Math.abs(offset),
                          rotateZ: rotations[index % 4],
                          scale: 0.85 - Math.abs(offset) * 0.04,
                          opacity: 0.55,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="order-2 md:order-none md:col-start-2 md:row-start-2 flex flex-col justify-center min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-xl font-bold dark:text-white">
                {activeItem.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                {activeItem.description}
              </p>
              {activeItem.liveUrl ? (
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={activeItem.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                  >
                    Visit Live
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {showNavigation && items.length > 1 && (
          <div className="order-4 md:order-none md:col-start-2 md:row-start-3 flex gap-2 mt-1 md:mt-4">
            <button
              disabled={activeIndex === 0}
              onClick={handlePrev}
              aria-label="Previous project"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all",
                activeIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105"
              )}
            >
              <ArrowLeft className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            </button>
            <button
              disabled={activeIndex === items.length - 1}
              onClick={handleNext}
              aria-label="Next project"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all",
                activeIndex === items.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105"
              )}
            >
              <ArrowRight className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestimonialsCard;
