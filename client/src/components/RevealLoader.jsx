import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

const RevealLoader = ({
  text = "WELCOME",
  textSize = "100px",
  textColor = "#E6EDF3",
  bgColors = ["#1F2A38"],
  staggerOrder = "left-to-right",
  movementDirection = "bottom-up",
  textFadeDelay = 0.8,
  onComplete,
}) => {
  const preloaderRef = useRef(null);

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
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="preloader-item h-full w-[10%]"
          style={getBackgroundStyle()}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="overflow-hidden">
          <p
            className="name-text flex tracking-tight uppercase font-bold"
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
    </div>
  );
};

export default RevealLoader;
