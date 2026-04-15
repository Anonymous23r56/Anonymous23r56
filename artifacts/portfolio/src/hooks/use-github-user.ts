import { useQuery } from "@tanstack/react-query";
import { GITHUB_USERNAME } from "../config";

export interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const fetchUser = async (): Promise<GithubUser> => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    { headers: { Accept: "application/vnd.github.v3+json" } }
  );
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

export const useGithubUser = () => {
  return useQuery({
    queryKey: ["github-user", GITHUB_USERNAME],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60,
  });
};
