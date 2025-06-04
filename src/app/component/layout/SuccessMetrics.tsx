// components/SuccessMetrics.tsx
export default function SuccessMetrics() {
  const stats = [
    { label: "Pods Created", value: "1,280+" },
    { label: "Active Members", value: "4,500+" },
    { label: "Weekly Matches", value: "350+" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center p-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800shadow-sm p-8 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:border-red-300 dark:hover:border-red-500 cursor-pointer"
        >
          <p className="text-3xl font-bold text-purple-700">{stat.value}</p>
          <p className="text-gray-600 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
