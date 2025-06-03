"use client";
import { useEffect } from "react";

export function CodeEditor() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatWindow {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(3px, 5px) rotate(1deg); }
        50% { transform: translate(0, 8px) rotate(0deg); }
        75% { transform: translate(-3px, 5px) rotate(-1deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative h-[600px] w-full">
      {/* Image 1 - Top Left */}
      <img
        src="/images/image1.png"
        alt="Floating Image 1"
        className="absolute top-0 left-0 w-48 rounded-xl shadow-2xl"
        style={{ animation: "floatWindow 7s ease-in-out infinite" }}
      />

      {/* Image 2 - Center */}
      <img
        src="/images/image2.png"
        alt="Floating Image 2"
        className="absolute top-1/3 left-1/2 w-64 rounded-xl shadow-2xl transform -translate-x-1/2"
        style={{
          animation: "floatWindow 8s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      />

      {/* Image 3 - Bottom Right */}
      <img
        src="/images/image3.png"
        alt="Floating Image 3"
        className="absolute bottom-0 right-0 w-48 rounded-xl shadow-2xl"
        style={{
          animation: "floatWindow 7.5s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />
    </div>
  );
}
