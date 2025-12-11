import React from "react";
import { Database, Moon, Sun } from "./ui/Icons";
import { Theme } from "../types";

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 select-none opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20">
            <Database className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm tracking-tight hidden sm:inline-block">PG Explain Doctor</span>
        </div>

        <button
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 shadow-sm hover:bg-accent hover:text-accent-foreground transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};