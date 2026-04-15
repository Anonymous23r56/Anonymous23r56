import { motion } from "framer-motion";
import { CONTACT_EMAIL, GITHUB_USERNAME, LINKEDIN_URL, WHATSAPP_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 text-center max-w-2xl"
      >
        <h2 className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider">What's Next?</h2>
        <h3 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6">
          Get In Touch
        </h3>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="h-14 px-8 text-lg font-medium w-full sm:w-auto" asChild>
            <a href={`mailto:${CONTACT_EMAIL}`} data-testid="btn-say-hello">
              <Mail className="w-5 h-5 mr-2" />
              Say Hello
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg font-medium w-full sm:w-auto border-green-500/40 text-green-400 hover:bg-green-500/10 hover:text-green-300 hover:border-green-400/60 transition-colors"
            asChild
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-whatsapp"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Me
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="GitHub"
            data-testid="link-footer-github"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="LinkedIn"
            data-testid="link-footer-linkedin"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="Email"
            data-testid="link-footer-email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-green-400 transition-colors p-2"
            aria-label="WhatsApp"
            data-testid="link-footer-whatsapp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
