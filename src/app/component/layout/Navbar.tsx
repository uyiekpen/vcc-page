"use client";

import Button from "../ui/Button";
import Link from "next/link";
import DarkModeToggle from "../ui/DarkToggle";

const Navbar = () => {
  return (
    <header className="p-4 md:p-8 flex justify-between items-center relative z-10 font-montserrat bg-white dark:bg-black transition-colors duration-300">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white">
          <Link href="/">Vibe.</Link>
        </h1>
      </div>

      <nav className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300">
        <Link href="/">
          <h3 className="hover:text-black dark:hover:text-white">Home</h3>
        </Link>
        <Link href="/pods">
          <h3 className="hover:text-black dark:hover:text-white">Pods</h3>
        </Link>
        <Link href="/roles">
          <h3 className="hover:text-black dark:hover:text-white">Roles</h3>
        </Link>
      </nav>

      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Only this handles theme toggle now */}
        <DarkModeToggle />

        <Button className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-[50px] hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors">
          <Link href="/signup">Sign Up</Link>
        </Button>

        <Button className="px-8 py-4 bg-black dark:bg-white dark:text-black text-white rounded-[50px] hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          <Link href="/mail">Join the waitlist</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
