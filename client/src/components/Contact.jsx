import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, ArrowUpRight, Sparkles, MessageSquare } from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { cinematicEasing, springConfigs } from "@/hooks/useScrollVelocity";

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, springConfigs.smooth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@yourname.dev", href: "mailto:hello@yourname.dev", color: "primary" },
    { icon: MapPin, label: "Location", value: "Your City, Country", href: "#", color: "accent" },
    { icon: Phone, label: "Phone", value: "+1 234 567 890", href: "tel:+1234567890", color: "primary" },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="container relative">
        {/* Section header */}
        <ScrollReveal direction="up" distance={40} blur>
          <div className="text-center mb-20">
            <motion.span 
              className="font-mono text-primary text-sm mb-4 block"
            >
              // get in touch
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Work
              <span className="text-gradient">
                Together
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Feel free to reach out.
              I'm always open to discussing new opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <ScrollReveal direction="left" distance={60}>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <MagneticButton key={item.label} strength={0.2}>
                    <motion.a
                      href={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: cinematicEasing.reveal }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center gap-5 p-6 rounded-2xl glass border border-border/30 group hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    >
                      <motion.div 
                        className={`p-4 rounded-xl ${
                          item.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                        } group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 10 }}
                      >
                        <item.icon className={`w-6 h-6 ${
                          item.color === "primary" ? "text-primary" : "text-accent"
                        }`} />
                      </motion.div>
                      <div className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-medium text-foreground text-lg">{item.value}</p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </motion.div>
                    </motion.a>
                  </MagneticButton>
                ))}
              </div>
            </ScrollReveal>

            {/* Status card */}
            <ScrollReveal direction="left" distance={40} delay={0.4}>
              <motion.div
                className="relative h-52 rounded-2xl glass border border-border/30 overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", ...springConfigs.snappy }}
              >
                <div className="absolute inset-0 grid-background opacity-15" />
                
                {/* Animated symbol */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <MessageSquare className="w-32 h-32 text-primary/10 stroke-1" />
                </motion.div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2.5 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
                
                <div className="absolute inset-0 bg-card/30" />
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div 
                    className="flex items-center gap-2 mb-2"
                  >
                    <motion.span 
                      className="relative flex h-3 w-3"
                    >
                      <motion.span 
                        className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                    </motion.span>
                    <span className="font-mono text-sm text-primary">Open to opportunities</span>
                  </motion.div>
                  <p className="text-muted-foreground text-sm">
                    Currently looking for internships and collaborations
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="right" distance={60} delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, ease: cinematicEasing.reveal }}
                >
                  <label className="block text-sm font-medium mb-3 text-foreground">
                    {field.label}
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === field.name ? 1.01 : 1 }}
                    transition={{ type: "spring", ...springConfigs.snappy }}
                  >
                    <input
                      type={field.type}
                      value={formData[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
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
                <label className="block text-sm font-medium mb-3 text-foreground">Message</label>
                <motion.div
                  animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                  transition={{ type: "spring", ...springConfigs.snappy }}
                >
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className={`w-full px-5 py-4 rounded-xl glass bg-transparent border-2 transition-all duration-300 outline-none resize-none ${
                      focusedField === "message" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : "border-border hover:border-border/80"
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
              </motion.div>
              
              <MagneticButton strength={0.3}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full py-5 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed bg-primary text-primary-foreground border border-border hover:bg-hover transition-all duration-200"
                >
                  {/* Subtle hover layer */}
                  <motion.div
                    className="absolute inset-0 bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <motion.span
                    className="relative z-10"
                    animate={!isSubmitting ? { x: [0, 4, 0], y: [0, -2, 0] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </MagneticButton>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
