"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supbase";
import Button from "../ui/ButtonNew";
import Link from "next/link";

interface OnboardingNavType {
  className?: string;
}

const OnBoardingNav: React.FC<OnboardingNavType> = ({ className }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_OUT") {
        router.refresh();
      }
      return Promise.resolve(); // Explicitly return a Promise
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header
      className={`p-4 md:p-6 flex justify-between items-center relative z-10 font-montserrat bg-white dark:bg-black transition-colors duration-300 ${className}`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white">
          <Link href="/">Vibe.</Link>
        </h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        {user && (
          <div className="text-sm md:text-base text-gray-700 dark:text-gray-200">
            {user.user_metadata?.name || user.email}
          </div>
        )}

        <Button
          onClick={handleLogout}
          className="px-8 py-4 bg-black dark:bg-white dark:text-black text-white rounded-[50px] hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default OnBoardingNav;
