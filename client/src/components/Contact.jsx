import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Send, MapPin, CheckCircle2, X, AlertCircle } from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { cinematicEasing, springConfigs } from "@/hooks/useScrollVelocity";
import ProfileCard from "@/components/ui/profile-card";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqdlbza";
const EMPTY_FORM = Object.freeze({ name: "", email: "", message: "" });

const CONTACT_INFO = Object.freeze([
  { icon: MapPin, label: "Location", value: "Nagpur, India", color: "accent" },
]);

const FORM_FIELDS = Object.freeze([
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
]);

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const isMountedRef = useRef(true);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, message: value }));
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!showSuccessModal) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowSuccessModal(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showSuccessModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name.trim());
      formPayload.append("email", formData.email.trim());
      formPayload.append("message", formData.message.trim());
      formPayload.append("_subject", "New portfolio contact submission");

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      if (!isMountedRef.current) return;
      setFormData(EMPTY_FORM);
      setShowSuccessModal(true);
    } catch (error) {
      void error;
      if (!isMountedRef.current) return;
      setSubmitError("Message could not be sent right now. Please try again in a moment.");
    } finally {
      if (!isMountedRef.current) return;
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      ref={containerRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1000px" }}
    >
      <div className="container relative">
        {/* Section header */}
        <ScrollReveal direction="up" distance={40} blur>
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Let's Work
              <span className="text-gradient">
                Together
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Have a project in mind or just want to chat? Feel free to reach out.
              I'm always open to discussing new opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-start lg:gap-12 xl:gap-16">
          {/* Contact Info */}
          <div className="space-y-5 sm:space-y-6">
            <ScrollReveal direction="left" distance={40} delay={0.15}>
              <ProfileCard
                name="Rishi Patel"
                role="CS Student & Developer"
                email="rishipatel9822@gmail.com"
                statusText="Open to opportunities"
                statusColor="bg-primary"
                glowText="Open for collaborations, freelance, and job opportunities."
                className="mb-8 pt-1 sm:mb-10 lg:pt-0"
              />
            </ScrollReveal>

            <ScrollReveal direction="left" distance={45} delay={0.25}>
              <div className="space-y-4 sm:space-y-5">
                {CONTACT_INFO.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: cinematicEasing.reveal }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="group flex items-center gap-4 rounded-2xl border border-border/30 p-4 transition-all duration-300 hover:border-primary/30 sm:gap-5 sm:p-5 glass"
                  >
                    <motion.div
                      className={`rounded-xl p-3 ${
                        item.color === "primary" ? "bg-primary/12" : "bg-accent/12"
                      } transition-transform duration-300 group-hover:scale-105`}
                      whileHover={{ rotate: 8 }}
                    >
                      <item.icon className={`h-5 w-5 ${item.color === "primary" ? "text-primary" : "text-accent"}`} />
                    </motion.div>
                    <div className="flex-grow">
                      <p className="mb-1 text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-base font-medium text-foreground sm:text-lg">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="right" distance={60} delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="space-y-5 rounded-2xl border border-border/30 bg-card/20 p-5 glass sm:space-y-6 sm:p-6 lg:p-7"
            >
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

              {FORM_FIELDS.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, ease: cinematicEasing.reveal }}
                >
                  <label htmlFor={field.name} className="block text-sm font-medium mb-3 text-foreground">
                    {field.label}
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === field.name ? 1.01 : 1 }}
                    transition={{ type: "spring", ...springConfigs.snappy }}
                  >
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleFieldChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      autoComplete={field.name === "email" ? "email" : "name"}
                      required
                      className={`w-full px-5 py-4 rounded-xl glass bg-transparent border-2 transition-all duration-300 outline-none ${
                        focusedField === field.name 
                          ? "border-primary shadow-lg shadow-primary/10" 
                          : "border-border hover:border-border/80"
                      }`}
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, ease: cinematicEasing.reveal }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-3 text-foreground">Message</label>
                <motion.div
                  animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                  transition={{ type: "spring", ...springConfigs.snappy }}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleMessageChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className={`w-full px-5 py-4 rounded-xl glass bg-transparent border-2 transition-all duration-300 outline-none resize-none ${
                      focusedField === "message" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : "border-border hover:border-border/80"
                    }`}
                    placeholder="Your message..."
                  />
                </motion.div>
              </motion.div>

              {submitError ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4" />
                  {submitError}
                </motion.p>
              ) : null}
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.985 }}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-border bg-primary py-4 text-base font-semibold text-primary-foreground transition-all duration-200 hover:bg-hover disabled:cursor-not-allowed disabled:opacity-70 sm:py-5 sm:text-lg"
              >
                <motion.div className="absolute inset-0 bg-hover opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <motion.span
                  className="relative z-10"
                  animate={!isSubmitting && !prefersReducedMotion ? { x: [0, 4, 0], y: [0, -2, 0] } : {}}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity }}
                >
                  <Send className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal ? (
          <motion.div
            className="fixed inset-0 z-[260] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccessModal(false)}
            aria-hidden="true"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
              aria-describedby="contact-success-description"
              className="relative w-full max-w-md rounded-2xl border border-border/40 bg-card/95 p-6 shadow-[0_22px_80px_rgba(2,6,23,0.65)] backdrop-blur-xl sm:p-7"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: cinematicEasing.reveal }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
                aria-label="Close success message"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>

              <h3 id="contact-success-title" className="text-xl font-semibold text-foreground">
                Message Sent Successfully
              </h3>
              <p id="contact-success-description" className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Thanks for reaching out.
              </p>

              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full rounded-xl border border-border bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-hover sm:text-base"
              >
                Continue Browsing
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
