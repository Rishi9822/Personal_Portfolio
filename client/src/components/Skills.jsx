import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Palette, Server, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { springConfigs } from "@/hooks/useScrollVelocity";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    description: "Core programming languages",
    color: "primary",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Java", level: 75 },
    ],
  },
  {
    title: "Frontend",
    icon: Palette,
    description: "Building responsive interfaces",
    color: "accent",
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 75 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Server-side development",
    color: "primary",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 78 },
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    description: "Development workflow",
    color: "accent",
    skills: [
      { name: "Git", level: 88 },
      { name: "Docker", level: 65 },
      { name: "Linux", level: 72 },
      { name: "VS Code", level: 95 },
    ],
  },
];

const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="py-28 lg:py-36 relative" ref={containerRef}>
      {/* Section divider with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container">
        {/* Section header */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center mb-16 lg:mb-20">
            <span className="font-mono text-primary text-sm mb-4 block">
              // my skills
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              Tech Stack &{" "}
              <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto">
              Technologies I've mastered through projects and continuous learning.
            </p>
          </div>
        </ScrollReveal>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            
            return (
              <ScrollReveal 
                key={category.title}
                direction={categoryIndex % 2 === 0 ? "left" : "right"}
                distance={30}
                delay={categoryIndex * 0.1}
              >
                <motion.div
                  onMouseEnter={() => setActiveCategory(categoryIndex)}
                  onMouseLeave={() => setActiveCategory(null)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", ...springConfigs.snappy }}
                  className="h-full"
                >
                  <div className={`p-6 lg:p-8 rounded-2xl bg-card/60 backdrop-blur-sm border transition-all duration-300 h-full ${
                    activeCategory === categoryIndex 
                      ? category.color === "primary" 
                        ? "border-primary/40 shadow-lg shadow-primary/5" 
                        : "border-accent/40 shadow-lg shadow-accent/5"
                      : "border-border hover:border-border/80"
                  }`}>
                    {/* Category header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${
                          category.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            category.color === "primary" ? "text-primary" : "text-accent"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <motion.span 
                        className={`w-2.5 h-2.5 rounded-full ${
                          category.color === "primary" ? "bg-primary" : "bg-accent"
                        }`}
                        animate={{ 
                          scale: activeCategory === categoryIndex ? [1, 1.4, 1] : 1,
                          opacity: [0.6, 1, 0.6] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Skills list */}
                    <div className="space-y-5">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div 
                          key={skill.name}
                          initial={{ opacity: 0, x: -15 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ 
                            delay: categoryIndex * 0.1 + skillIndex * 0.07 + 0.3,
                            duration: 0.4,
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm text-foreground">
                              {skill.name}
                            </span>
                            <span className={`font-mono text-xs font-semibold ${
                              category.color === "primary" ? "text-primary" : "text-accent"
                            }`}>
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Progress bar - IMPROVED */}
                          <div className="relative h-2.5 rounded-full bg-secondary overflow-hidden">
                            <motion.div
                              className={`absolute inset-y-0 left-0 rounded-full ${
                                category.color === "primary"
                                  ? "bg-gradient-to-r from-primary to-primary/80"
                                  : "bg-gradient-to-r from-accent to-accent/80"
                              }`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{
                                duration: 1,
                                delay: categoryIndex * 0.1 + skillIndex * 0.07 + 0.4,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                            {/* Glow effect on hover */}
                            {activeCategory === categoryIndex && (
                              <motion.div
                                className={`absolute inset-y-0 left-0 rounded-full blur-sm ${
                                  category.color === "primary" ? "bg-primary/30" : "bg-accent/30"
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
