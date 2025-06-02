// components/DarkModeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Button from "./Button";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  function toggleDarkMode() {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  }

  return (
    <Button
      onClick={toggleDarkMode}
      className="p-4 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 text-black dark:hover:bg-gray-800 dark:text-white"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
