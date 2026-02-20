import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import reactLogo from "@/assets/react.gif";
import jsLogo from "@/assets/js.gif";
import nodeLogo from "@/assets/nodejs.png";
import expressLogo from "@/assets/Express.png";
import mongoLogo from "@/assets/mongodb.png";
import tailwindLogo from "@/assets/TailwindCSS.png";
import gitLogo from "@/assets/Git.png";
import githubLogo from "@/assets/GitHub.png";

const coreSkillLogos = [
  { src: reactLogo, alt: "React" },
  { src: jsLogo, alt: "JavaScript" },
  { src: nodeLogo, alt: "Node.js" },
  { src: expressLogo, alt: "Express.js" },
  { src: mongoLogo, alt: "MongoDB" },
  { src: tailwindLogo, alt: "Tailwind CSS" },
  { src: gitLogo, alt: "Git" },
  { src: githubLogo, alt: "GitHub" },
];

export function LogoCloud({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 overflow-hidden rounded-2xl border border-border/60 bg-card/40 md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-border/60" />

      {coreSkillLogos.map((logo, index) => {
        const isLastColumn = (index + 1) % 2 === 0;
        const isDesktopLastColumn = (index + 1) % 4 === 0;
        const isLastRowMobile = index >= 6;

        return (
          <LogoCard
            key={logo.alt}
            logo={logo}
            className={cn(
              "relative",
              !isLastColumn && "border-r border-border/60",
              "md:border-r md:border-border/60",
              isDesktopLastColumn && "md:border-r-0",
              !isLastRowMobile && "border-b border-border/60",
              index < 4 && "md:border-b border-border/60",
              index >= 4 && "md:border-b-0",
              index % 3 === 0 ? "bg-secondary/30" : "bg-background/20"
            )}
          >
            {(index === 0 || index === 2 || index === 5) && (
              <PlusIcon
                className="-bottom-3 -right-3 absolute z-10 size-6 text-muted-foreground/70"
                strokeWidth={1}
              />
            )}
          </LogoCard>
        );
      })}

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border/60" />
    </div>
  );
}

function LogoCard({ logo, className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex min-h-[108px] items-center justify-center px-4 py-5 md:min-h-[124px] md:p-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          className="pointer-events-none h-7 w-auto select-none object-contain opacity-90 md:h-8"
        />
        <span className="text-[11px] font-mono text-muted-foreground md:text-xs">
          {logo.alt}
        </span>
      </div>
      {children}
    </div>
  );
}

export default LogoCloud;
