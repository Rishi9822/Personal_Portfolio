import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CREDITS = {
  madeBy: { text: "Staggered Grid", href: "#" },
  moreDemos: { text: "Skills", href: "#skills" },
};

const isPerformanceConstrainedClient = () => {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory ?? 8;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  return prefersReducedMotion || cores <= 4 || memory <= 4;
};

const GridSkillItem = memo(function GridSkillItem({ item, index, isPerformanceConstrained }) {
  if (index === 17 || index === 18) return null;
  if (!item || typeof item !== "object") return null;

  const toneClass =
    item.tone === "accent"
      ? "from-accent/15 via-background/80 to-primary/15"
      : "from-primary/15 via-background/80 to-accent/15";

  return (
    <figure
      className="grid__item m-0 p-1 sm:p-1.5 lg:p-2 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
    >
      <div
        className={cn(
          "grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-lg sm:rounded-xl overflow-hidden border border-border/60 bg-card/70 bg-cover bg-center bg-no-repeat flex items-center justify-center ease-out",
          isPerformanceConstrained
            ? "shadow-sm transition-[opacity,box-shadow] duration-300 backdrop-blur-0"
            : "shadow-sm transition-all duration-500 backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl"
        )}
        style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        {!item.image && (
          <div className={cn("absolute inset-0 bg-gradient-to-br", toneClass)} />
        )}
        <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 px-1.5 sm:px-2 text-center">
          {item.logo ? (
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-card/80 border border-border/50 flex items-center justify-center shadow-[0_10px_22px_rgba(2,6,23,0.45)]">
              <img
                src={item.logo}
                alt={item.logoAlt || item.label}
                className="h-4 w-4 sm:h-5 sm:w-5 object-contain opacity-95"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}
          <span className="block text-[10px] font-medium text-foreground/70 uppercase tracking-wider">
            Skill
          </span>
          <span className="block text-xs sm:text-[13px] font-semibold text-foreground">
            {item.label}
          </span>
          {item.meta ? (
            <span className="text-[10px] text-muted-foreground font-mono">
              {item.meta}
            </span>
          ) : null}
        </div>
      </div>
    </figure>
  );
});

const BentoGroup = memo(function BentoGroup({
  bentoItems,
  activeBento,
  onActivate,
  renderIcon,
  isPerformanceConstrained,
}) {
  if (!bentoItems || bentoItems.length === 0) return null;

  return (
    <div className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform">
      {bentoItems.map((bentoItem, index) => {
        const isActive = activeBento === index;
        const toneClass =
          bentoItem.tone === "accent"
            ? "from-accent/20 via-background/80 to-primary/20"
            : "from-primary/20 via-background/80 to-accent/20";
        const Tag = bentoItem.href ? "a" : "button";
        const tagProps = bentoItem.href
          ? {
              href: bentoItem.href,
              target: bentoItem.target,
              rel: bentoItem.target === "_blank" ? "noreferrer" : undefined,
            }
          : { type: "button" };

        return (
          <Tag
            key={bentoItem.id}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-0 p-0 text-left no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isActive
                ? "bg-card/90 shadow-[0_24px_60px_rgba(2,6,23,0.55)]"
                : "bg-card/70 shadow-[0_12px_30px_rgba(2,6,23,0.45)]",
              isPerformanceConstrained ? "backdrop-blur-0" : "backdrop-blur-xl"
            )}
            style={{ width: isActive ? "60%" : "20%" }}
            onMouseEnter={() => onActivate(index)}
            onClick={() => onActivate(index)}
            aria-pressed={bentoItem.href ? undefined : isActive}
            aria-label={bentoItem.ariaLabel || bentoItem.title}
            {...tagProps}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                isActive ? "border-primary/30" : "border-border/60"
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
                <div className="absolute inset-0 bg-background/80 overflow-hidden z-0 group/img">
                  {bentoItem.image ? (
                    <>
                      <img
                        src={bentoItem.image}
                        alt={bentoItem.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90"
                        loading="lazy"
                        decoding="async"
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
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center z-20">
                  <div className="h-16 w-16 rounded-2xl bg-card/80 border border-border/50 flex items-center justify-center shadow-[0_12px_28px_rgba(2,6,23,0.45)]">
                    {renderIcon(
                      bentoItem.icon,
                      "h-10 w-10 object-contain"
                    )}
                  </div>
                  {bentoItem.subtitle ? (
                    <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      {bentoItem.subtitle}
                    </p>
                  ) : null}
                  <h3 className="text-sm font-semibold text-foreground">
                    {bentoItem.title}
                  </h3>
                  {bentoItem.description ? (
                    <p className="text-[11px] text-muted-foreground leading-snug max-w-[220px]">
                      {bentoItem.description}
                    </p>
                  ) : null}
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
              <div className="h-10 w-10 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center">
                {renderIcon(
                  bentoItem.icon,
                  "h-6 w-6 object-contain"
                )}
              </div>
              <span className="text-[10px] font-medium text-foreground/70 uppercase tracking-wider">
                {bentoItem.title}
              </span>
            </div>
          </Tag>
        );
      })}
    </div>
  );
});

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
  const [isPerformanceConstrained] = useState(() => isPerformanceConstrainedClient());
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

  const splitCenterText = useMemo(() => {
    return centerText.split("").map((char, i) => (
      <span key={`${char}-${i}`} className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [centerText]);

  const renderIcon = useCallback((icon, className) => {
    if (!React.isValidElement(icon)) return icon;
    return React.cloneElement(icon, {
      className: cn(icon.props?.className, className),
    });
  }, []);

  const handleActivateBento = useCallback((index) => {
    setActiveBento((prev) => (prev === index ? prev : index));
  }, []);

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
              scrub: isPerformanceConstrained ? 0.75 : 1,
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
              scrub: isPerformanceConstrained ? 1 : 1.5,
            },
          })
          .from(columnItems, {
            yPercent: isPerformanceConstrained ? 320 : 450,
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
              scrub: isPerformanceConstrained ? 0.7 : 1,
              invalidateOnRefresh: true,
            },
          })
          .to(bentoContainer, {
            y: window.innerHeight * 0.1,
            scale: isPerformanceConstrained ? 1.35 : 1.5,
            zIndex: 1000,
            ease: "power2.out",
            duration: 1,
            force3D: true,
          });
      }
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isLoaded, isPerformanceConstrained]);

  if (!normalizedGridItems.length) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className={cn("shadow relative overflow-hidden w-full", className)}
      style={{
        "--grid-item-translate": "0px",
        contentVisibility: "auto",
        containIntrinsicSize: "1px 960px",
      }}
    >
      <section className="grid place-items-center w-full relative mt-[4vh]">
        <div
          ref={textRef}
          className="text uppercase flex content-center text-[clamp(3rem,14vw,8rem)] leading-[0.7] text-foreground/90 font-semibold"
        >
          {splitCenterText}
        </div>
      </section>

      <section className="grid place-items-center w-full relative">
        <div
          ref={gridFullRef}
          className="grid--full relative w-full my-[2vh] h-auto aspect-[1.1] max-w-none px-2 sm:px-3 lg:px-4 py-3 sm:py-4 grid gap-3 sm:gap-4 grid-cols-7 grid-rows-5"
        >
          <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-background/80 rounded-lg transition-opacity duration-500" />
          {mixedGridItems.map((item, i) => {
            if (item === "BENTO_GROUP") {
              return (
                <BentoGroup
                  key="bento-group"
                  bentoItems={bentoItems}
                  activeBento={activeBento}
                  onActivate={handleActivateBento}
                  renderIcon={renderIcon}
                  isPerformanceConstrained={isPerformanceConstrained}
                />
              );
            }

            return (
              <GridSkillItem
                key={`grid-item-${item?.id || "empty"}-${i}`}
                item={item}
                index={i}
                isPerformanceConstrained={isPerformanceConstrained}
              />
            );
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
