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
    <div className="relative w-full min-h-screen overflow-y-auto font-Montserrat">
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="w-full h-full grid grid-cols-24 grid-rows-24">
          {Array.from({ length: 24 * 24 }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </div>

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
                transform: `rotate(${Math.random() * 360}deg)`,
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
