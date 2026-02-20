import { useMemo } from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

const Hero = () => {
  const fxSections = useMemo(
    () => [
      {
        leftLabel: "Craft",
        title: "Design-led systems",
        rightLabel: "Build",
        background:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
      },
      {
        leftLabel: "Code",
        title: "Scalable interfaces",
        rightLabel: "Ship",
        background:
          "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
      },
      {
        leftLabel: "Story",
        title: "Human-centered flow",
        rightLabel: "Impact",
        background:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
      },
      {
        leftLabel: "Growth",
        title: "Iterate & refine",
        rightLabel: "Evolve",
        background:
          "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden">
      <FullScreenScrollFX
        sections={fxSections}
        header={
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center normal-case">
            <span className="text-xs tracking-[0.45em] text-white/60">
              HELLO, I AM
            </span>
            <div className="text-[clamp(2.2rem,5.2vw,4.6rem)] font-black leading-tight text-white">
              Rishi Patel
            </div>
            <p className="mx-auto max-w-2xl text-center text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
              Full-stack developer focused on building fast, elegant, and scalable
              digital products.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]"
              >
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-white hover:bg-white/10"
              >
                Connect
              </a>
            </div>
          </div>
        }
        footer={<div>Selected Highlights</div>}
        showProgress
        showEnd={false}
        smoothScroll
        fontFamily='"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
        topPadding={7}
        sizes={{
          header: "clamp(1.6rem, 4.5vw, 3.8rem)",
          title: "clamp(2.6rem, 7vw, 6.2rem)",
          footer: "clamp(1.1rem, 3.6vw, 2.8rem)",
          item: "clamp(0.9rem, 1.8vw, 1.4rem)",
        }}
        durations={{ change: 0.7, snap: 800 }}
        colors={{
          text: "rgba(245,245,245,0.92)",
          overlay: "rgba(0,0,0,0.45)",
          pageBg: "hsl(225 25% 5%)",
          stageBg: "#000000",
        }}
        className="bg-neutral-950"
      />
    </section>
  );
};

export default Hero;
