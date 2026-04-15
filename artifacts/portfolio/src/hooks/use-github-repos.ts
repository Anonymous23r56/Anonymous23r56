import { useQuery } from "@tanstack/react-query";
import { GITHUB_USERNAME } from "../config";

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  homepage: string;
  fork: boolean;
}

const fetchRepos = async (): Promise<GithubRepo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch repositories.");
  }

  const repos: GithubRepo[] = await response.json();
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
};

export const useGithubRepos = () => {
  return useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 60,
  });
};
