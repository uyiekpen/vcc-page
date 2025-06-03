// components/LivePodFeed.tsx
"use client";
import { useEffect, useState } from "react";

const sampleUpdates = [
  "Alex just joined the Designers Pod",
  "Sarah created a new pod: Product Managers",
  "Developers Pod is now 75% full",
  "Jamie earned Pod Champion badge",
];

export default function LivePodFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sampleUpdates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-sm text-purple-700 text-center">
      <p className="animate-fade transition-all duration-300">
        {sampleUpdates[index]}
      </p>
    </div>
  );
}
