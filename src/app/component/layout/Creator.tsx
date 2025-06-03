const testimonials = [
  {
    name: "Emily Chen",
    role: "UI Designer",
    quote:
      "Joining a pod helped me stay motivated and actually finish my portfolio. I got 3 interviews last month!",
  },
  {
    name: "James Riley",
    role: "Frontend Developer",
    quote:
      "I never expected to find such a supportive group of coders. We’ve shipped 2 open-source projects already.",
  },
  {
    name: "Nina Patel",
    role: "Marketing Strategist",
    quote:
      "The Marketers Pod was a game-changer. Weekly syncs kept me accountable and inspired.",
  },
];

export default function Testimonials() {
  return (
    <div className="py-12 bg-gray-50 rounded-xl px-4 sm:px-6 md:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8 sm:mb-10 text-gray-900">
        What Creators Are Saying
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:border-red-300 dark:hover:border-red-500 cursor-pointer"
          >
            <p className="text-gray-800 dark:text-gray-200 italic mb-4 text-sm sm:text-base">
              “{t.quote}”
            </p>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              — {t.name}, <span className="text-purple-600">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
