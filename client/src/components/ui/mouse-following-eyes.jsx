"use client";

import { useEffect, useRef } from "react";

const MouseFollowingEyes = ({
  className = "",
  size = 40,
  offset = { bottom: 24, right: 24 },
  maxMove = 10,
}) => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const pupils = [
      { eye: leftEyeRef, pupil: leftPupilRef },
      { eye: rightEyeRef, pupil: rightPupilRef },
    ];

    const setPupilTransform = (pupilEl, x, y) => {
      pupilEl.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    };

    const update = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;

      pupils.forEach(({ eye, pupil }) => {
        const eyeEl = eye.current;
        const pupilEl = pupil.current;
        if (!eyeEl || !pupilEl) return;

        const rect = eyeEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.hypot(dx, dy) || 1;
        const safeMaxMove = Math.max(1, Math.min(maxMove, size * 0.3));
        const clamped = Math.min(safeMaxMove, distance);

        const offsetX = (dx / distance) * clamped;
        const offsetY = (dy / distance) * clamped;

        setPupilTransform(pupilEl, offsetX, offsetY);
      });

      rafRef.current = window.requestAnimationFrame(update);
    };

    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handleMouseMove);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pupilSize = Math.max(8, Math.round(size * 0.4));
  const eyeHighlightSize = Math.max(3, Math.round(size * 0.15));

  return (
    <div
      aria-hidden="true"
      style={{ bottom: `${offset.bottom}px`, right: `${offset.right}px` }}
      className={`pointer-events-none fixed z-40 hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/90 p-2 backdrop-blur-sm ${className}`.trim()}
    >
      <div
        ref={leftEyeRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="mfe-eye relative overflow-hidden rounded-full border border-border bg-foreground/95"
      >
        <div
          ref={leftPupilRef}
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            transform: "translate(-50%, -50%) translate(0px, 0px)",
          }}
          className="absolute left-1/2 top-1/2 rounded-full bg-background transition-transform duration-75 ease-out"
        >
          <div
            style={{ width: `${eyeHighlightSize}px`, height: `${eyeHighlightSize}px` }}
            className="absolute bottom-0.5 right-0.5 rounded-full bg-foreground/70"
          />
        </div>
        <div className="mfe-lid absolute inset-0" />
      </div>

      <div
        ref={rightEyeRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="mfe-eye relative overflow-hidden rounded-full border border-border bg-foreground/95"
      >
        <div
          ref={rightPupilRef}
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            transform: "translate(-50%, -50%) translate(0px, 0px)",
          }}
          className="absolute left-1/2 top-1/2 rounded-full bg-background transition-transform duration-75 ease-out"
        >
          <div
            style={{ width: `${eyeHighlightSize}px`, height: `${eyeHighlightSize}px` }}
            className="absolute bottom-0.5 right-0.5 rounded-full bg-foreground/70"
          />
        </div>
        <div className="mfe-lid absolute inset-0" />
      </div>

      <style>{`
        .mfe-eye { animation: mfe-blink 8s infinite; }
        .mfe-lid {
          background: hsl(var(--card));
          transform: scaleY(0);
          transform-origin: top;
          animation: mfe-lid-blink 8s infinite;
        }
        .mfe-eye:nth-child(2),
        .mfe-eye:nth-child(2) .mfe-lid {
          animation-delay: 0.08s;
        }
        @media (prefers-reduced-motion: reduce) {
          .mfe-eye,
          .mfe-lid {
            animation: none;
          }
        }
        @keyframes mfe-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          94%, 96% { transform: scaleY(0.08); }
        }
        @keyframes mfe-lid-blink {
          0%, 92%, 100% { transform: scaleY(0); }
          94%, 96% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export { MouseFollowingEyes };
