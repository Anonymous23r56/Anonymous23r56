import { motion } from "framer-motion";
import { ABOUT, GITHUB_DISPLAY_NAME, GITHUB_USERNAME, LINKEDIN_URL, WHATSAPP_URL } from "@/config";
import { Briefcase, CheckCircle2, Linkedin, MessageCircle } from "lucide-react";
import { useGithubUser } from "@/hooks/use-github-user";

export function About() {
  const { data: user } = useGithubUser();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-display">About Me</h2>
            <div className="h-[1px] bg-border/60 flex-1 max-w-xs" />
          </div>
          <p className="text-muted-foreground text-lg">{ABOUT.tagline}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-5">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={GITHUB_DISPLAY_NAME}
                  className="w-20 h-20 rounded-full border-2 border-primary/40 object-cover shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-2 border-primary/40 bg-muted shrink-0" />
              )}

              <div>
                <p className="text-xl font-bold font-display text-foreground">{GITHUB_DISPLAY_NAME}</p>
                <p className="text-sm text-muted-foreground font-mono">@{GITHUB_USERNAME}</p>

                {ABOUT.available_for_work && (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    Available for work
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              {ABOUT.bio.map((paragraph, i) => (
                <p key={i} className="text-base">{paragraph}</p>
              ))}
            </div>

            {ABOUT.available_for_work && (
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  Let's Work Together
                  <Linkedin className="w-4 h-4 ml-1 opacity-70" />
                </motion.a>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-green-500/20 hover:border-green-400/50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Me
                </motion.a>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Fun Facts
            </h3>

            <div className="flex flex-col gap-3">
              {ABOUT.fun_facts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-start gap-4 rounded-xl bg-card/30 border border-border/30 px-5 py-4 hover:border-primary/30 hover:bg-card/50 transition-all group"
                >
                  <span className="text-2xl leading-none mt-0.5 group-hover:scale-110 transition-transform">{fact.emoji}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{fact.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
