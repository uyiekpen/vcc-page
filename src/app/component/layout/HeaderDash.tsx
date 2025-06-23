"use client";

import { BellIcon, FlameIcon, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/ButtonNew";

const NavbarDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm flex justify-between items-center px-6 py-4 z-50">
      {/* Welcome Text */}
      <div className="text-gray-800 text-xl font-semibold">
        Welcome, <span className="text-indigo-600">Simmons!</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Buttons */}
        <Button className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
          Retake quiz
        </Button>
        <Button className="text-sm bg-[#AA6ED1] text-white px-6 py-2 rounded hover:bg-purple-700 flex items-center gap-2">
          Create a Pod <Plus className="w-4 h-4" />
        </Button>

        {/* Streak */}
        <div className="flex items-center text-sm text-orange-500 font-medium">
          <FlameIcon className="w-4 h-4 mr-1" /> 28 days
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <BellIcon className="w-6 h-6 text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        {/* Avatar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none px-2 py-1"
          >
            <Image
              src="/avatar.svg"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm text-gray-700">Brooklyn</span>
          </Button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-40 text-sm z-50 animate-fadeIn"
              style={{ animation: "fadeIn 0.2s ease-out" }}
            >
              <ul className="divide-y">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarDashboard;
