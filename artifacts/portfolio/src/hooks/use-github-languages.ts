import { useQuery } from "@tanstack/react-query";
import { GITHUB_USERNAME } from "../config";

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Go: "#00ADD8",
  Rust: "#CE412B",
  CSS: "#563D7C",
  HTML: "#E44D26",
  Shell: "#89E051",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  Ruby: "#CC342D",
  Swift: "#FFAC45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Scala: "#C22D40",
  "C#": "#239120",
  Nix: "#7e7eff",
  Makefile: "#427819",
  Dockerfile: "#384D54",
  Vim: "#199f4b",
  Lua: "#000080",
  Perl: "#0298C3",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Zig: "#ec915c",
  Perl6: "#0000fb",
};

const DEFAULT_COLOR = "#8b5cf6";

const fetchAllRepos = async () => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
    { headers: { Accept: "application/vnd.github.v3+json" } }
  );
  if (!response.ok) throw new Error("Failed to fetch repos");
  const repos: { name: string; stargazers_count: number; fork: boolean }[] = await response.json();
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 15);
};

const fetchRepoLanguages = async (repoName: string): Promise<Record<string, number>> => {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
    { headers: { Accept: "application/vnd.github.v3+json" } }
  );
  if (!response.ok) return {};
  return response.json();
};

const fetchTopLanguages = async (): Promise<LanguageStat[]> => {
  const repos = await fetchAllRepos();

  const langResults = await Promise.allSettled(
    repos.map((r) => fetchRepoLanguages(r.name))
  );

  const totals: Record<string, number> = {};
  for (const result of langResults) {
    if (result.status === "fulfilled") {
      for (const [lang, bytes] of Object.entries(result.value)) {
        totals[lang] = (totals[lang] ?? 0) + bytes;
      }
    }
  }

  const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0);
  if (totalBytes === 0) return [];

  return Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      color: LANGUAGE_COLORS[name] ?? DEFAULT_COLOR,
    }));
};

export const useGithubLanguages = () => {
  return useQuery({
    queryKey: ["github-languages", GITHUB_USERNAME],
    queryFn: fetchTopLanguages,
    staleTime: 1000 * 60 * 60,
  });
};
