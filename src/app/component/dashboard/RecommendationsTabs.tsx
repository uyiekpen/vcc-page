"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/component/ui/card";
import { Button } from "@/app/component/layout/button";
import { Sparkles } from "lucide-react";

const recommendations = [
  {
    title: "Frontend Developer @ BuildSpace",
    matchScore: 92,
    reasons: [
      "Skills match: React, Tailwind",
      "Same time zone",
      "Startup culture alignment",
    ],
  },
  {
    title: "AI Pod @ Prompt Engineers",
    matchScore: 86,
    reasons: ["Interest in AI & LLMs", "Experience with GPT", "Quiz match"],
  },
  {
    title: "Product Design Pod @ Figmasters",
    matchScore: 78,
    reasons: [
      "Figma Pro badge",
      "Visual Design quiz score",
      "Shared interests",
    ],
  },
];

export const RecommendationsTab = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="text-[#0055BA]" /> AI-Powered Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg font-medium">No matches yet.</p>
          <p className="text-sm">
            Take the quiz or update your interests to get pod suggestions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#E1ECFA] text-[#0055BA]">
                    {rec.matchScore}% match
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
                  {rec.reasons.map((reason, rIdx) => (
                    <li key={rIdx}>{reason}</li>
                  ))}
                </ul>
                <Button size="sm" className="w-full">
                  Apply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
