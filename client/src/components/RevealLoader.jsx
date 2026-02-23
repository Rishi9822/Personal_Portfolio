import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const RevealLoader = ({
  text = "WELCOME",
  textSize = "clamp(1.1rem, 5.2vw, 6.25rem)",
  textColor = "#E6EDF3",
  bgColors = ["#1F2A38"],
  staggerOrder = "left-to-right",
  movementDirection = "bottom-up",
  textFadeDelay = 0.8,
  onComplete,
}) => {
  const preloaderRef = useRef(null);
  const [lineCount, setLineCount] = useState(10);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateLineCount = () => setLineCount(mediaQuery.matches ? 6 : 10);

    updateLineCount();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateLineCount);
      return () => mediaQuery.removeEventListener("change", updateLineCount);
    }

    mediaQuery.addListener(updateLineCount);
    return () => mediaQuery.removeListener(updateLineCount);
  }, []);

  const getBackgroundStyle = () => {
    return { backgroundColor: bgColors[0] };
  };

  const getStaggerFrom = (type) => {
    switch (type) {
      case "right-to-left":
        return "end";
      case "center-out":
        return "center";
      case "edges-in":
        return "edges";
      default:
        return "start";
    }
  };

  const getAnimationProperties = (type) => {
    switch (type) {
      case "bottom-up":
        return { y: "-100%", ease: "power2.inOut" };
      case "fade-out":
        return { autoAlpha: 0, ease: "power2.inOut" };
      case "scale-vertical":
        return { scaleY: 0, transformOrigin: "center", ease: "power2.inOut" };
      default:
        return { y: "100%", ease: "power2.inOut" };
    }
  };

useGSAP(() => {
  if (!preloaderRef.current) return;
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    const moveProps = getAnimationProperties(movementDirection);

    tl.to(".name-text span", {
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out",
    });

    tl.to(".preloader-item", {
      delay: 1,
      duration: 0.6,
      stagger: {
        each: 0.1,
        from: getStaggerFrom(staggerOrder),
      },
      ...moveProps,
    })
      .to(".name-text span", { autoAlpha: 0, duration: 0.3 }, `<${textFadeDelay}`)
      .to(preloaderRef.current, { autoAlpha: 0, duration: 0.2 });
  }, { scope: preloaderRef });

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[200] flex overflow-hidden"
    >
      {[...Array(lineCount)].map((_, i) => (
        <div
          key={i}
          className="preloader-item h-full"
          style={{ ...getBackgroundStyle(), width: `${100 / lineCount}%` }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
        <div className="overflow-hidden">
          <p
            className="name-text flex whitespace-nowrap tracking-tight uppercase font-bold leading-none"
            style={{
              fontSize: textSize,
              color: textColor,
            }}
          >
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block translate-y-full"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>

      <p className="absolute bottom-4 right-4 text-[10px] uppercase tracking-wide text-white/80 md:hidden pointer-events-none">
        Best experienced on desktop.
      </p>
    </div>
  );
};

export default RevealLoader;
