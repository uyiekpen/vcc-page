"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Session } from "@supabase/supabase-js";
import { createClient } from "./lib/supbasebrowser";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClient());
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ }) => {
      setSession(session);
    });

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: SetStateAction<Session | null>) => {
      setSession(session);
    });

    // Cleanup function
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
