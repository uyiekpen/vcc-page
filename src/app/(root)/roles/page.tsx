"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    text: "What excites you most?",
    options: [
      { text: "Designing cool interfaces", role: "Designer" },
      { text: "Building functional apps", role: "Developer" },
      { text: "Growing communities & brands", role: "Marketer" },
    ],
  },
  {
    id: 2,
    text: "Which skill do you enjoy?",
    options: [
      { text: "Creativity & visual storytelling", role: "Designer" },
      { text: "Coding & problem solving", role: "Developer" },
      { text: "Communication & outreach", role: "Marketer" },
    ],
  },
  {
    id: 3,
    text: "How do you like to contribute?",
    options: [
      { text: "Crafting designs and user flows", role: "Designer" },
      { text: "Writing code and fixing bugs", role: "Developer" },
      { text: "Planning campaigns and social media", role: "Marketer" },
    ],
  },
];

export default function page() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Count votes for each role from answers
  const getResult = () => {
    const counts: Record<string, number> = {};
    Object.values(answers).forEach((role) => {
      counts[role] = (counts[role] || 0) + 1;
    });
    // Get role with max votes
    let maxRole = null;
    let maxCount = 0;
    for (const role in counts) {
      if (counts[role] > maxCount) {
        maxRole = role;
        maxCount = counts[role];
      }
    }
    return maxRole || "Designer";
  };

  const handleOptionSelect = (questionId: number, role: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: role }));
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const roleResult = getResult();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
        Find Your Role
      </h1>

      {!submitted ? (
        <>
          {questions.map(({ id, text, options }) => (
            <div key={id} className="mb-8 w-full">
              <h2 className="text-xl font-semibold mb-4">{text}</h2>
              <div className="flex flex-col gap-3">
                {options.map(({ text: optionText, role }) => {
                  const selected = answers[id] === role;
                  return (
                    <button
                      key={role}
                      onClick={() => handleOptionSelect(id, role)}
                      className={`text-left px-4 py-3 rounded-md border ${
                        selected
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-gray-300 hover:bg-gray-100"
                      } transition`}
                    >
                      {optionText}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            disabled={!isComplete}
            onClick={() => setSubmitted(true)}
            className={`mt-6 px-6 py-3 rounded-md font-semibold text-white ${
              isComplete
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            See My Role
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your Role is:</h2>
          <p className="text-2xl text-purple-700 font-semibold mb-8">
            {roleResult}
          </p>
          <Link
            href={`/pods?role=${roleResult.toLowerCase()}`}
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            View {roleResult} Pods
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
            className="block mt-6 text-purple-600 underline"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </main>
  );
}
