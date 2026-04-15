import { motion } from "framer-motion";
import { useGithubLanguages } from "@/hooks/use-github-languages";
import { useGithubUser } from "@/hooks/use-github-user";
import { useGithubRepos } from "@/hooks/use-github-repos";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Star, GitFork, Users, BookOpen, Code2 } from "lucide-react";
import { GITHUB_USERNAME } from "@/config";

function StatCard({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number | undefined;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center justify-center gap-2 rounded-xl bg-card/30 border border-border/30 p-6 hover:border-primary/40 transition-colors group"
    >
      <Icon className="w-6 h-6 text-primary mb-1 group-hover:scale-110 transition-transform" />
      {value === undefined ? (
        <Skeleton className="h-8 w-16" />
      ) : (
        <span className="text-3xl font-bold font-display text-foreground">{value}</span>
      )}
      <span className="text-xs text-muted-foreground font-mono tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}

export function GithubStats() {
  const { data: user } = useGithubUser();
  const { data: repos } = useGithubRepos();
  const { data: languages, isLoading: langsLoading } = useGithubLanguages();

  const totalStars = repos?.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos?.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <section id="stats" className="py-24 bg-muted/20 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            GitHub at a Glance
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time stats pulled directly from the GitHub API.
          </p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors font-mono"
            data-testid="link-github-profile"
          >
            <Github className="w-4 h-4" />
            @{GITHUB_USERNAME}
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={BookOpen} label="Public Repos" value={user?.public_repos} delay={0} />
          <StatCard icon={Star} label="Total Stars" value={totalStars} delay={0.05} />
          <StatCard icon={GitFork} label="Total Forks" value={totalForks} delay={0.1} />
          <StatCard icon={Users} label="Followers" value={user?.followers} delay={0.15} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-card/30 border border-border/30 p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold font-mono text-foreground">Top Languages</h3>
            <span className="text-xs text-muted-foreground ml-auto font-mono">by bytes of code</span>
          </div>

          {langsLoading && (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 flex-1 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </div>
          )}

          {!langsLoading && (!languages || languages.length === 0) && (
            <p className="text-muted-foreground text-sm text-center py-8">
              No language data found for this profile.
            </p>
          )}

          {!langsLoading && languages && languages.length > 0 && (
            <>
              <div className="flex gap-1 h-4 rounded-full overflow-hidden mb-6">
                {languages.map((lang) => (
                  <motion.div
                    key={lang.name}
                    title={`${lang.name}: ${lang.percentage}%`}
                    style={{ backgroundColor: lang.color, width: `${lang.percentage}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex items-center gap-3 group"
                    data-testid={`lang-stat-${lang.name}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-sm font-mono text-foreground/90 w-28 shrink-0 group-hover:text-foreground transition-colors">
                      {lang.name}
                    </span>
                    <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.06 }}
                      />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground w-12 text-right shrink-0">
                      {lang.percentage}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
