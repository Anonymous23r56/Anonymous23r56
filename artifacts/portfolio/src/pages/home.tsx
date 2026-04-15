import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { GithubStats } from "@/components/sections/GithubStats";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <GithubStats />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
