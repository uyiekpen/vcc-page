"use client";

import { Footer } from "../component/layout/Footer";
import Navbar from "../component/layout/Navbar";
const genZMillennialElements = [
  "🔥",
  "💅",
  "💀",
  "✨",
  "🤠",
  "🧃",
  "👾",
  "😎",
  "🪩",
  "🌈",
  "🎧",
  "🫶",
  "💻",
  "🦄",
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`relative w-full min-h-screen overflow-y-auto dark:bg-black  `}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 120 }).map((_, index) => {
          const element =
            genZMillennialElements[index % genZMillennialElements.length];
          return (
            <div
              key={index}
              className="absolute text-lg md:text-xl opacity-20 select-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                ["--rotate" as any]: `${Math.random() * 360}deg`,
                animation: `float ${
                  3 + Math.random() * 8
                }s ease-in-out infinite alternate`,
              }}
            >
              {element}
            </div>
          );
        })}
      </div>

      <Navbar />

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
