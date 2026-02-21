import { memo, useMemo } from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import heroBg1 from "@/assets/1.webp";
import heroBg2 from "@/assets/2.jpg";
import heroBg3 from "@/assets/3.webp";
import heroBg4 from "@/assets/4.webp";

const Hero = () => {
  const fxSections = useMemo(
    () => [
      {
        leftLabel: "Craft",
        title: "Design-led systems",
        rightLabel: "Build",
        background: heroBg1,
        imageStyle: {
          filter: "brightness(2.1) contrast(1.18) saturate(1.1)",
        },
        overlayStyle: { background: "rgba(0,0,0,0.16)" },
      },
      {
        leftLabel: "Code",
        title: "Scalable interfaces",
        rightLabel: "Ship",
        background: heroBg2,
        imageStyle: {
          filter: "brightness(1.8) contrast(1.15) saturate(1.08)",
        },
        overlayStyle: { background: "rgba(0,0,0,0.2)" },
      },
      {
        leftLabel: "Story",
        title: "Human-centered flow",
        rightLabel: "Impact",
        background: heroBg3,
      },
      {
        leftLabel: "Growth",
        title: "Iterate & refine",
        rightLabel: "Evolve",
        background: heroBg4,
      },
    ],
    []
  );

  const heroHeader = useMemo(
    () => (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center normal-case">
        <span className="text-xs tracking-[0.45em] text-muted-foreground">HELLO, I AM</span>
        <div className="text-[clamp(2.2rem,5.2vw,4.6rem)] font-black leading-tight text-foreground">
          Rishi Patel
        </div>
        <p className="mx-auto max-w-2xl text-center text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          Full-stack developer focused on building fast, elegant, and scalable
          digital products.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground border border-border px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-hover"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border text-foreground bg-card px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-hover"
          >
            Connect
          </a>
        </div>
      </div>
    ),
    []
  );

  const heroFooter = useMemo(() => <div>Selected Highlights</div>, []);

  const fxSizes = useMemo(
    () => ({
      header: "clamp(1.6rem, 4.5vw, 3.8rem)",
      title: "clamp(2.6rem, 7vw, 6.2rem)",
      footer: "clamp(1.1rem, 3.6vw, 2.8rem)",
      item: "clamp(0.9rem, 1.8vw, 1.4rem)",
    }),
    []
  );

  const fxDurations = useMemo(() => ({ change: 0.7, snap: 800 }), []);

  const fxColors = useMemo(
    () => ({
      text: "rgba(230,237,243,0.92)",
      overlay: "rgba(11,15,20,0.45)",
      pageBg: "#0B0F14",
      stageBg: "#121821",
    }),
    []
  );

  return (
    <section className="relative overflow-hidden">
      <FullScreenScrollFX
        sections={fxSections}
        header={heroHeader}
        footer={heroFooter}
        showProgress
        showEnd={false}
        smoothScroll
        fontFamily='"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
        topPadding={7}
        sizes={fxSizes}
        durations={fxDurations}
        colors={fxColors}
        className="bg-background text-foreground"
      />
    </section>
  );
};

export default memo(Hero);

