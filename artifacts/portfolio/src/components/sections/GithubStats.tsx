import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "@/config";

export function GithubStats() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="stats" className="py-24 bg-muted/20 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Open Source Contributions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A snapshot of my activity and most used languages across my public repositories.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="rounded-xl overflow-hidden bg-card/30 border border-border/30 p-4 shadow-sm hover:border-primary/30 transition-colors group">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&theme=dark&show_icons=true&hide_border=true&bg_color=00000000&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8`} 
                alt={`${GITHUB_USERNAME}'s GitHub Stats`}
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden bg-card/30 border border-border/30 p-4 shadow-sm hover:border-primary/30 transition-colors group">
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=dark&hide_border=true&background=00000000&ring=38bdf8&fire=38bdf8&currStreakLabel=38bdf8`} 
                alt={`${GITHUB_USERNAME}'s GitHub Streak`}
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="h-full">
            <div className="rounded-xl overflow-hidden bg-card/30 border border-border/30 p-4 shadow-sm hover:border-primary/30 transition-colors h-full flex items-center justify-center group">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=38bdf8&text_color=94a3b8`} 
                alt={`${GITHUB_USERNAME}'s Top Languages`}
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
