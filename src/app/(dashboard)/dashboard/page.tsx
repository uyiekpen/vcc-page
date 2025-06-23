"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/component/ui/sheet";

import NavbarDashboard from "@/app/component/layout/HeaderDash";
import Sidebar from "@/app/component/layout/SideBarDash";

import { ApplicationsTab } from "@/app/component/dashboard/ApplicationsTab";
import { MyPodsTab } from "@/app/component/dashboard/MyPodsTab";
import { OverviewTab } from "@/app/component/dashboard/OverviewTab";
import { RecommendationsTab } from "@/app/component/dashboard/RecommendationsTabs";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar on desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 z-40">
        <Sidebar onTabChange={setActiveTab} activeTab={activeTab} />
      </div>

      {/* Sidebar Drawer on Mobile */}
      <Sheet>
        <SheetTrigger className="absolute top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md">
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-[#0E0E23] text-white">
          <Sidebar onTabChange={setActiveTab} activeTab={activeTab} />
        </SheetContent>
      </Sheet>

      {/* Main content (offset left by 64px on desktop) */}
      <div className="flex-1 flex flex-col md:ml-64">
        <NavbarDashboard />

        <main className="p-6 bg-gray-50 overflow-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Overview" && <OverviewTab />}
              {activeTab === "Applications" && <ApplicationsTab />}
              {activeTab === "My Pods" && <MyPodsTab />}
              {activeTab === "Recommendations" && <RecommendationsTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
