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
}

const fetchRepos = async (): Promise<GithubRepo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=12`,
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

  return response.json();
};

export const useGithubRepos = () => {
  return useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
