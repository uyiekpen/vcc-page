"use client";

import type React from "react";

import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Memoized toggle function
  const toggleTheme = useCallback(() => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    try {
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }

    // Apply theme to document
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    setMounted(true);

    // Initialize theme
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const shouldBeDark =
          savedTheme === "dark" || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle("dark", shouldBeDark);
      } catch (error) {
        console.warn("Failed to initialize theme:", error);
        // Fallback to system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDark(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if no manual theme is set
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-full border border-gray-300 dark:border-gray-600 w-9 h-9 flex items-center justify-center">
        <div className="w-5 h-5 animate-pulse bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`w-5 h-5 absolute transition-all duration-300 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`w-5 h-5 absolute transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
