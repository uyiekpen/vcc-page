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
      {/* Hero.txt Editor - Top Left */}
      <div
        className="absolute top-0 left-0 w-60 bg-white rounded-lg shadow-xl overflow-hidden z-40 transform rotate-[-2deg] "
        style={{ animation: "floatWindow 7s ease-in-out infinite" }}
      >
        <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-600 ml-2">hero.txt</span>
        </div>
        <div className="p-4 text-sm h-32">
          <h3 className="font-semibold mb-2">This is the hero Text.</h3>
          <p className="text-gray-600">
            At Vibecodingclub, we believe everyone has the power to create
            something awesome—even if you've never written a single line of
            code.
          </p>
        </div>
      </div>

      {/* README.md Editor - Top Right */}
      <div
        className="absolute top-20 right-0 w-60 bg-white rounded-lg shadow-xl overflow-hidden z-30 transform rotate-[1deg] h-auto"
        style={{ animation: "floatWindow 6s ease-in-out infinite" }}
      >
        <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-600 ml-2">README.md</span>
        </div>
        <div className="p-4 text-sm text-gray-700 h-40">
          <p className="mb-3">
            Imagine a place where you get easy-to-use tools to bring your
            coolest ideas to life, join friends to build exciting projects, and
            watch your creations grow.
          </p>
          <p>
            You don't have to be an expert coder; you just need to bring your
            ideas and imagination. We'll help you do the rest!
          </p>
        </div>
      </div>

      {/* Vibe.js Editor - Center (Main focus) */}
      <div
        className="relative top-50 left-12 w-[300] bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-50"
        style={{ animation: "floatWindow 9s ease-in-out infinite" }}
      >
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-400 ml-2">vibe.js</span>
        </div>
        <div className="p-4 text-sm font-mono h-64">
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">1</span>
            <span className="text-purple-400">const</span>
            <span className="text-blue-400 ml-2">vibeClub</span>
            <span className="text-white ml-2">=</span>
            <span className="text-white ml-2">{"{"}</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">2</span>
            <span className="ml-4 text-green-400">name</span>
            <span className="text-white">:</span>
            <span className="text-yellow-400 ml-2">'Vibe Coding Club'</span>
            <span className="text-white">,</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">3</span>
            <span className="ml-4 text-green-400">mission</span>
            <span className="text-white">:</span>
            <span className="text-yellow-400 ml-2">'Create together'</span>
            <span className="text-white">,</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">4</span>
            <span className="ml-4 text-green-400">values</span>
            <span className="text-white">:</span>
            <span className="text-white ml-2">[</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">5</span>
            <span className="ml-8 text-yellow-400">'Collaboration'</span>
            <span className="text-white">,</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">6</span>
            <span className="ml-8 text-yellow-400">'Creativity'</span>
            <span className="text-white">,</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">7</span>
            <span className="ml-8 text-yellow-400">'Community'</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">8</span>
            <span className="ml-4 text-white">],</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">9</span>
            <span className="ml-4 text-green-400">pods</span>
            <span className="text-white">:</span>
            <span className="text-blue-400 ml-2">createPods</span>
            <span className="text-white">(),</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">10</span>
            <span className="ml-4 text-green-400">join</span>
            <span className="text-white">:</span>
            <span className="text-white ml-2">() =&gt;</span>
            <span className="text-white ml-2">{"{"}</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">11</span>
            <span className="ml-8 text-blue-400">findYourRole</span>
            <span className="text-white">()</span>
          </div>
          <div className="flex text-gray-500 text-xs mb-2">
            <span className="w-6 text-right mr-4">12</span>
            <span className="ml-4 text-white">{"}"}</span>
          </div>
          <div className="flex text-gray-500 text-xs">
            <span className="w-6 text-right mr-4">13</span>
            <span className="text-white">{"}"}</span>
          </div>
        </div>
      </div>

      {/* Manifesto.txt Editor - Bottom Right */}
      <div
        className="absolute bottom-0 right-8 w-60 bg-white rounded-lg shadow-xl overflow-hidden z-20 transform rotate-[2deg]"
        style={{ animation: "floatWindow 7s ease-in-out infinite" }}
      >
        <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-600 ml-2">manifesto.txt</span>
        </div>
        <div className="p-4 text-sm text-gray-700 h-36">
          <p className="font-semibold mb-2">
            Every line of code, every design comp, every late-night brainstorm
          </p>
          <p className="mb-2">—</p>
          <p className="mb-2">It all counts.</p>
          <p className="mb-2">Contribution isn't ranked.</p>
          <p>It's reflected in the system's total health and adoption.</p>
        </div>
      </div>
    </div>
  );
}
