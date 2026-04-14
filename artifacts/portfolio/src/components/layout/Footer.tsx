import { GITHUB_DISPLAY_NAME } from "@/config";

export function Footer() {
  return (
    <footer className="py-8 border-t border-border/40 mt-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {GITHUB_DISPLAY_NAME}. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Crafted with <span className="text-primary">&hearts;</span>
        </p>
      </div>
    </footer>
  );
}
