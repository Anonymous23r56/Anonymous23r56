import { motion } from "framer-motion";
import { 
  SiTypescript, SiJavascript, SiPython, SiGo, SiRust,
  SiReact, SiNextdotjs, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiFastapi, SiPostgresql,
  SiDocker, SiGithubactions, SiLinux
} from "react-icons/si";

const TECH_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Rust", icon: SiRust, color: "#000000", darkColor: "#FFFFFF" },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#000000", darkColor: "#FFFFFF" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ]
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ]
  }
];

export function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {TECH_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="flex flex-col gap-6"
            >
              <h3 className="text-xl font-semibold font-mono text-primary border-b border-border/40 pb-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/20 border border-border/30 hover:border-primary/40 hover:bg-card/40 transition-all cursor-default group"
                  >
                    <skill.icon 
                      className="w-10 h-10 mb-3 transition-transform group-hover:scale-110" 
                      style={{ color: skill.darkColor || skill.color }}
                    />
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                      {skill.name}
                    </span>
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
