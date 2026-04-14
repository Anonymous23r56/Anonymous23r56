import { motion } from "framer-motion";
import { 
  SiTypescript, SiJavascript, SiPython, SiGo, SiRust,
  SiReact, SiNextdotjs, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiFastapi, SiPostgresql,
  SiDocker, SiGithubactions, SiLinux
} from "react-icons/si";

type Proficiency = "Expert" | "Advanced" | "Proficient" | "Learning";

const PROFICIENCY_COLORS: Record<Proficiency, string> = {
  Expert: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  Advanced: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Proficient: "text-violet-400 bg-violet-400/10 border-violet-400/30",
  Learning: "text-amber-400 bg-amber-400/10 border-amber-400/30",
};

const PROFICIENCY_BAR: Record<Proficiency, number> = {
  Expert: 95,
  Advanced: 80,
  Proficient: 65,
  Learning: 40,
};

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  darkColor?: string;
  level: Proficiency;
}

const TECH_CATEGORIES: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: "Expert" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: "Expert" },
      { name: "Python", icon: SiPython, color: "#3776AB", level: "Advanced" },
      { name: "Go", icon: SiGo, color: "#00ADD8", level: "Proficient" },
      { name: "Rust", icon: SiRust, color: "#FFFFFF", level: "Learning" },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", level: "Expert" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", level: "Advanced" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", level: "Expert" },
      { name: "Vite", icon: SiVite, color: "#646CFF", level: "Advanced" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: "Expert" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF", level: "Advanced" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688", level: "Proficient" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: "Advanced" },
    ]
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED", level: "Advanced" },
      { name: "Actions", icon: SiGithubactions, color: "#2088FF", level: "Proficient" },
      { name: "Linux", icon: SiLinux, color: "#FCC624", level: "Expert" },
    ]
  }
];

export function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="stack" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">My Arsenal</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The tools, languages, and frameworks I use to build and ship products.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {(Object.keys(PROFICIENCY_COLORS) as Proficiency[]).map((level) => (
              <span key={level} className={`text-xs font-mono px-2.5 py-1 rounded-full border ${PROFICIENCY_COLORS[level]}`}>
                {level}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {TECH_CATEGORIES.map((category) => (
            <motion.div 
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="flex flex-col gap-5"
            >
              <h3 className="text-xl font-semibold font-mono text-primary border-b border-border/40 pb-2">
                {category.title}
              </h3>
              <div className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="flex items-center gap-2 flex-1">
                        <skill.icon
                          className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110 duration-200"
                          style={{ color: skill.darkColor || skill.color }}
                        />
                        <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${PROFICIENCY_COLORS[skill.level]}`} data-testid={`badge-skill-${skill.name}`}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `hsl(var(--primary))` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${PROFICIENCY_BAR[skill.level]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
