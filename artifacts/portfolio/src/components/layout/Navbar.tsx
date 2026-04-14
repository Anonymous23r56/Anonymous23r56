import { GITHUB_DISPLAY_NAME } from "@/config";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-xl font-bold font-display tracking-tight text-foreground hover:text-primary transition-colors">
          {GITHUB_DISPLAY_NAME}<span className="text-primary">.</span>
        </a>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Projects</a>
          <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Stats</a>
          <a href="#stack" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Tech Stack</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
}
