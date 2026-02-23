import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Plus, Copy, Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BG from "@/assets/BG1.jpg";

function ProfileCard({
  name = "Rishi Patel",
  role = "CS Student & Developer",
  email = "rishipatel9822@gmail.com",
  avatarSrc = BG,
  statusText = "Open to opportunities",
  statusColor = "bg-primary",
  glowText = "Open for collaborations, freelance, and job opportunities.",
  className,
}) {
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const copyTimeoutRef = useRef(null);
  const hireMeHref = useMemo(
    () => `mailto:${email}?subject=${encodeURIComponent("Hiring Inquiry")}`,
    [email]
  );

  const localTime = useMemo(() => {
    const date = new Date(now);
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }, [now]);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 60000);
    return () => {
      window.clearInterval(interval);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [email]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("relative w-full pb-2", className)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-[74%] -bottom-9 z-0 rounded-[28px] bg-primary/55 shadow-[0_40px_80px_-16px_rgba(59,130,246,0.45)]" />

      <div className="absolute inset-x-0 -bottom-11 z-0 mx-auto w-full sm:-bottom-10">
        <div className="mx-auto flex max-w-[95%] items-center justify-center gap-2 bg-transparent px-3 py-3 text-center text-[11px] font-medium leading-tight text-primary-foreground sm:max-w-full sm:text-sm">
          <Zap className="h-4 w-4" /> {glowText}
        </div>
      </div>

      <Card className="relative z-10 mx-auto w-full overflow-visible rounded-[28px] border border-primary/20 bg-[radial-gradient(125%_125%_at_20%_0%,#2b3a4f_0%,#1f2a38_50%,#16202c_100%)] text-white shadow-[0_28px_80px_rgba(10,22,38,0.65)]">
        <CardContent className="p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3 text-xs text-neutral-300 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className={cn("inline-block h-2.5 w-2.5 rounded-full animate-pulse", statusColor)} />
              <span className="select-none">{statusText}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Clock className="h-4 w-4" />
              <span className="tabular-nums">{localTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-14 sm:w-14">
              <img
                src={avatarSrc}
                alt={`${name} avatar`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold tracking-tight sm:text-2xl">{name}</h3>
              <p className="mt-0.5 text-xs text-neutral-400 sm:text-sm">{role}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <Button
              asChild
              variant="secondary"
              className="h-11 justify-start gap-3 rounded-2xl border border-white/10 bg-white/10 text-white hover:bg-white/15"
            >
              <a href={hireMeHref}>
                <Plus className="h-4 w-4" /> Hire Me
              </a>
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleCopy}
              className="h-11 justify-start gap-3 rounded-2xl border border-white/10 bg-white/10 text-white hover:bg-white/15"
            >
              <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Email"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default memo(ProfileCard);
