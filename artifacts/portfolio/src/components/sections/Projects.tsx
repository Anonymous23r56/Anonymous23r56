import { useState } from "react";
import { motion } from "framer-motion";
import { useGithubRepos } from "@/hooks/use-github-repos";
import { GITHUB_USERNAME } from "@/config";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, GitFork, Github, Play, AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Projects() {
  const { data: repos, isLoading, isError, error, refetch } = useGithubRepos();
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    JavaScript: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Python: "bg-green-500/10 text-green-500 border-green-500/20",
    Go: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    Rust: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CSS: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    HTML: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-display">Featured Projects</h2>
            <div className="h-[1px] bg-border/60 flex-1 max-w-xs" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Some things I've built and open-sourced on GitHub.
          </p>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-card/50 border-border/50 overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error fetching projects</AlertTitle>
            <AlertDescription className="mt-2">
              {error instanceof Error ? error.message : "Something went wrong."}
              <div className="mt-4">
                <Button variant="outline" onClick={() => refetch()} data-testid="btn-retry-projects">
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && repos && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.slice(0, 12).map((repo) => (
              <motion.div key={repo.id} variants={itemVariants}>
                <Card className="h-full flex flex-col bg-card/40 border-border/40 hover:border-primary/50 transition-colors duration-300 group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {repo.name}
                      </CardTitle>
                      <div className="flex gap-3 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1" title="Stars">
                          <Star className="w-4 h-4" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Forks">
                          <GitFork className="w-4 h-4" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3 h-[60px]">
                      {repo.description || "No description provided."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {repo.language && (
                      <Badge 
                        variant="outline" 
                        className={languageColors[repo.language] || "bg-muted text-muted-foreground"}
                      >
                        {repo.language}
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="gap-3 pt-4 border-t border-border/20">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedRepo(repo.name)}
                      data-testid={`btn-demo-${repo.name}`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="flex-1 hover:bg-muted"
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" data-testid={`link-repo-${repo.name}`}>
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <Dialog open={!!selectedRepo} onOpenChange={(open) => !open && setSelectedRepo(null)}>
          <DialogContent className="max-w-5xl w-[90vw] h-[80vh] flex flex-col p-0 overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl">
            <DialogHeader className="px-6 py-4 border-b border-border/50 flex flex-row items-center justify-between shrink-0">
              <DialogTitle className="font-mono text-primary flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                {selectedRepo}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 w-full bg-black/50">
              {selectedRepo && (
                <iframe
                  src={`https://stackblitz.com/github/${GITHUB_USERNAME}/${selectedRepo}?embed=1&theme=dark`}
                  className="w-full h-full border-0"
                  title="Live Demo"
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
