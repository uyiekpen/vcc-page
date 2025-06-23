import { Sparkles, PlusCircle, RefreshCcw } from "lucide-react";

const actions = [
  { label: "Find Pods", icon: Sparkles },
  { label: "Create Pod", icon: PlusCircle },
  { label: "Retake Quiz", icon: RefreshCcw },
];

export const QuickActionsTab = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md transition group"
          >
            <Icon className="w-8 h-8 text-[#0055BA] mb-4 group-hover:scale-110 transition" />
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {label}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};
