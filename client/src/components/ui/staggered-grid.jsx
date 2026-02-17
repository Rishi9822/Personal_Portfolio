import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CREDITS = {
  madeBy: { text: "Staggered Grid", href: "#" },
  moreDemos: { text: "Skills", href: "#skills" },
};

export function StaggeredGrid({
  gridItems = [],
  bentoItems = [],
  centerText = "Skills",
  credits = DEFAULT_CREDITS,
  className,
  showFooter = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const gridFullRef = useRef(null);
  const textRef = useRef(null);
  const rootRef = useRef(null);
  const [activeBento, setActiveBento] = useState(0);
  const lenis = useLenis();

  const normalizedGridItems = useMemo(() => {
    if (!gridItems || gridItems.length === 0) return [];
    return gridItems;
  }, [gridItems]);

  const mixedGridItems = useMemo(() => {
    if (!normalizedGridItems.length) return [];
    const targetCount = 35;
    const filled = Array.from({ length: targetCount }, (_, i) => {
      return normalizedGridItems[i % normalizedGridItems.length];
    });
    filled[16] = "BENTO_GROUP";
    return filled;
  }, [normalizedGridItems]);

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={`${char}-${i}`} className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  useLayoutEffect(() => {
    if (!isLoaded || !gridFullRef.current) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const chars = textRef.current.querySelectorAll(".char");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: textRef.current,
              start: "top bottom",
              end: "center center-=25%",
              scrub: 1,
            },
          })
          .from(chars, {
            ease: "sine.out",
            yPercent: 300,
            autoAlpha: 0,
            stagger: { each: 0.05, from: "center" },
          });
      }

      const gridFullItems = gridFullRef.current.querySelectorAll(".grid__item");
      const columnTemplate = getComputedStyle(gridFullRef.current).getPropertyValue(
        "grid-template-columns"
      );
      const numColumns = columnTemplate.split(" ").filter(Boolean).length || 1;
      const middleColumnIndex = Math.floor(numColumns / 2);

      const columns = Array.from({ length: numColumns }, () => []);
      gridFullItems.forEach((item, index) => {
        columns[index % numColumns].push(item);
      });

      columns.forEach((columnItems, columnIndex) => {
        const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2;
        const columnImages = columnItems
          .map((item) => item.querySelector(".grid__item-img"))
          .filter(Boolean);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: gridFullRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1.5,
            },
          })
          .from(columnItems, {
            yPercent: 450,
            autoAlpha: 0,
            delay: delayFactor,
            ease: "sine.out",
          })
          .from(
            columnImages,
            {
              transformOrigin: "50% 0%",
              ease: "sine.out",
            },
            0
          );
      });

      const bentoContainer = gridFullRef.current.querySelector(".bento-container");
      if (bentoContainer) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: gridFullRef.current,
              start: "top top+=15%",
              end: "bottom center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(bentoContainer, {
            y: window.innerHeight * 0.1,
            scale: 1.5,
            zIndex: 1000,
            ease: "power2.out",
            duration: 1,
            force3D: true,
          });
      }
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isLoaded]);

  if (!normalizedGridItems.length) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className={cn("shadow relative overflow-hidden w-full", className)}
      style={{ "--grid-item-translate": "0px" }}
    >
      <section className="grid place-items-center w-full relative mt-[8vh]">
        <div
          ref={textRef}
          className="text uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7] text-foreground/90 font-semibold"
        >
          {splitText(centerText)}
        </div>
      </section>

      <section className="grid place-items-center w-full relative">
        <div
          ref={gridFullRef}
          className="grid--full relative w-full my-[10vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5"
        >
          <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-background/80 rounded-lg transition-opacity duration-500" />
          {mixedGridItems.map((item, i) => {
            if (item === "BENTO_GROUP") {
              if (!bentoItems || bentoItems.length === 0) return null;
              return (
                <div
                  key="bento-group"
                  className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform"
                >
                  {bentoItems.map((bentoItem, index) => {
                    const isActive = activeBento === index;
                    const toneClass =
                      bentoItem.tone === "accent"
                        ? "from-accent/30 via-black/60 to-primary/30"
                        : "from-primary/30 via-black/60 to-accent/30";
                    return (
                      <button
                        key={bentoItem.id}
                        type="button"
                        className={cn(
                          "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-0 p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                          isActive ? "bg-zinc-900/10 shadow-2xl" : "bg-zinc-950"
                        )}
                        style={{ width: isActive ? "60%" : "20%" }}
                        onMouseEnter={() => setActiveBento(index)}
                        onClick={() => setActiveBento(index)}
                        aria-pressed={isActive}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                            isActive ? "border-zinc-500/50" : "border-zinc-800/50"
                          )}
                        />
                        <div className="relative z-10 w-full h-full flex flex-col p-0">
                          <div
                            className={cn(
                              "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                              isActive
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 pointer-events-none"
                            )}
                          >
                            <div className="absolute inset-0 bg-zinc-950 overflow-hidden z-0 group/img">
                              {bentoItem.image ? (
                                <>
                                  <img
                                    src={bentoItem.image}
                                    alt={bentoItem.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90"
                                  />
                                  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                </>
                              ) : (
                                <div
                                  className={cn(
                                    "absolute inset-0 bg-gradient-to-br",
                                    toneClass
                                  )}
                                />
                              )}
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-between px-5 z-20">
                              <h3 className="text-sm font-bold text-white drop-shadow-md">
                                {bentoItem.title}
                              </h3>
                              <div className="text-white/90">{bentoItem.icon}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                            isActive
                              ? "opacity-0 scale-90 pointer-events-none"
                              : "opacity-100 scale-100"
                          )}
                        >
                          <div className="text-white/70">{bentoItem.icon}</div>
                          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                            {bentoItem.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            }
            if (i === 17 || i === 18) return null;
            if (item && typeof item === "object") {
              const toneClass =
                item.tone === "accent"
                  ? "from-accent/30 via-black/60 to-primary/20"
                  : "from-primary/30 via-black/60 to-accent/20";
              return (
                <figure
                  key={`grid-item-${item.id}-${i}`}
                  className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
                >
                  <div
                    className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-200/10 bg-zinc-950 bg-cover bg-center bg-no-repeat flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl"
                    style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    {!item.image && (
                      <div className={cn("absolute inset-0 bg-gradient-to-br", toneClass)} />
                    )}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-2 text-center">
                      <span className="block text-[10px] font-medium text-white/70 uppercase tracking-wider">
                        Skill
                      </span>
                      <span className="block text-sm font-semibold text-white">
                        {item.label}
                      </span>
                      {item.meta ? (
                        <span className="text-[10px] text-white/60 font-mono">
                          {item.meta}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </figure>
              );
            }
            return null;
          })}
        </div>
      </section>

      {showFooter ? (
        <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-foreground/80 uppercase font-medium text-xs tracking-wider">
          <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">
            {credits.madeBy.text}
          </a>
          <a
            href={credits.moreDemos.href}
            className="hover:opacity-60 transition-opacity"
          >
            {credits.moreDemos.text}
          </a>
        </footer>
      ) : null}
    </div>
  );
}

export default StaggeredGrid;
