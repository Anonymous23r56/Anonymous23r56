declare const __GITHUB_TOKEN__: string;

export function githubHeaders(): HeadersInit {
  const token = typeof __GITHUB_TOKEN__ !== "undefined" ? __GITHUB_TOKEN__ : "";
  const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
  if (token) headers["Authorization"] = `token ${token}`;
  return headers;
}
