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

export default function RoleQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Count votes for each role from answers
  const getResult = () => {
    const counts: Record<string, number> = {};
    Object.values(answers).forEach((role) => {
      counts[role] = (counts[role] || 0) + 1;
    });

    let maxRole = "Designer"; // default
    let maxCount = 0;
    for (const role in counts) {
      if (counts[role] > maxCount) {
        maxRole = role;
        maxCount = counts[role];
      }
    }
    return maxRole;
  };

  const handleOptionSelect = (questionId: number, role: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: role }));
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const roleResult = getResult();

  // Progress info
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-6 py-20 max-w-3xl mx-auto dark:bg-[#121212] transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
        Find Your Role
      </h1>

      {!submitted ? (
        <>
          {/* Progress Indicator */}
          <div className="w-full mb-8">
            <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-300">
              <span>{`Answered: ${answeredCount}`}</span>
              <span>{`Total: ${totalQuestions}`}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-purple-600 h-3 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Questions */}
          {questions.map(({ id, text, options }) => (
            <div key={id} className="mb-8 w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {text}
              </h2>
              <div className="flex flex-col gap-3">
                {options.map(({ text: optionText, role }) => {
                  const selected = answers[id] === role;
                  return (
                    <button
                      key={role}
                      onClick={() => handleOptionSelect(id, role)}
                      className={`text-left px-4 py-3 rounded-md border transition ${
                        selected
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
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
            } transition`}
          >
            See My Role
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Your Role is:
          </h2>
          <p className="text-2xl text-purple-700 dark:text-purple-400 font-semibold mb-8">
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
            className="block mt-6 text-purple-600 dark:text-purple-400 underline"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </main>
  );
}
