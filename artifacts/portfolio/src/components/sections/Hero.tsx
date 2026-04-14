import { GITHUB_DISPLAY_NAME, GITHUB_BIO, GITHUB_USERNAME, LINKEDIN_URL, CONTACT_EMAIL } from "@/config";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-start max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider">Hi, my name is</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-foreground mb-4">
            {GITHUB_DISPLAY_NAME}.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-muted-foreground mb-8">
            I build things for the web.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            {GITHUB_BIO}. I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button asChild size="lg" className="h-12 px-8 text-base font-medium">
            <a href="#projects" data-testid="btn-view-work">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-testid="link-github">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="link-linkedin">
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" data-testid="link-email">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
