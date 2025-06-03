// src/components/Navbar.tsx
import React from "react";
import Button from "../ui/Button";
import { Moon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="p-4 md:p-8 flex justify-between items-center relative z-10 font-montserrat">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight dark:text-white">
          <Link href="/"> Vibe.</Link>{" "}
        </h1>
      </div>

      <nav className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300">
        <a onClick={() => handleScroll("about")}>
          <h3>About</h3>
        </a>
        <a href="#">
          <h3> Events</h3>
        </a>
        <a href="#">
          <h3> Project</h3>
        </a>
        <a href="#">
          <h3> Resources</h3>
        </a>
      </nav>

      <div className="flex items-center space-x-2 md:space-x-3">
        <Button className="p-4 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 text-black dark:hover:bg-gray-800 dark:text-white">
          <Moon />
        </Button>
        <Button className="px-8 py-4 bg-black dark:bg-white dark:text-black text-white rounded-[50px] hover:bg-gray-800 dark:hover:bg-gray-200">
          <Link href="/mail"> Join the waitlist </Link>{" "}
        </Button>
      
      </div>
    </header>
  );
};

export default Navbar;
