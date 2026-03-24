import { memo } from "react";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";
import { SEO_FAQ_ITEMS, SEO_PROFILE } from "@/lib/seo";

const ProfileFaq = () => {
  return (
    <section
      id="profile-faq"
      aria-labelledby="profile-faq-title"
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="container">
        <ScrollReveal direction="up" distance={40}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Profile Snapshot
            </p>
            <h2
              id="profile-faq-title"
              className="mt-4 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              A Few Quick Answers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A concise overview of my background, current college, and what you can
              explore on this portfolio.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {SEO_FAQ_ITEMS.map((item, index) => (
            <ScrollReveal key={item.question} direction="up" distance={28} delay={0.1 * index}>
              <motion.article
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)] backdrop-blur-sm"
              >
                <p className="text-xs font-mono uppercase tracking-[0.26em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-display font-semibold leading-tight text-foreground">
                  {item.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ProfileFaq);
