"use client";

import { Book, Calendar, Users, LayoutDashboard } from "lucide-react";
import React from "react";

interface SidebarProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
  onCloseSheet?: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({
  onTabChange,
  activeTab,
  onCloseSheet,
}) => {
  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Applications", icon: Book },
    { label: "My Pods", icon: Users },
    { label: "Recommendations", icon: Calendar },
  ];

  const handleClick = (label: string) => {
    onTabChange?.(label);
    onCloseSheet?.(); // 👈 Close sheet if on mobile
  };

  return (
    <aside className="fixed top-0 left-0 z-40 bg-[#0E0E23] text-white w-64 h-screen flex flex-col p-4 space-y-6 border-r border-[#1F1F3A] shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full" />
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Vibe.</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 mt-4">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`flex items-center gap-3 text-left px-3 py-2 rounded-lg transition-all font-medium ${
              activeTab === label
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow"
                : "hover:bg-[#1F1F3A] text-gray-300"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
