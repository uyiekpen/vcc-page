// app/pods/PodsClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const pods = [
  {
    id: 1,
    title: "Designers Pod",
    description:
      "Collaborate with fellow designers to create stunning visuals.",
    members: 24,
    role: "designer",
  },
  {
    id: 2,
    title: "Developers Pod",
    description: "Build innovative projects with passionate developers.",
    members: 30,
    role: "developer",
  },
  {
    id: 3,
    title: "Marketers Pod",
    description: "Grow your brand with marketing experts and strategists.",
    members: 18,
    role: "marketer",
  },
];

export default function PodsClient() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "";

  const filteredPods = role
    ? pods.filter((pod) => pod.role === role.toLowerCase())
    : pods;

  return (
    <main className="min-h-screen bg-white px-6 py-20 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
        {role
          ? `${role.charAt(0).toUpperCase() + role.slice(1)} Pods`
          : "Pod Previews"}
      </h1>

      {filteredPods.length === 0 ? (
        <p className="text-center text-gray-600">
          No pods found for this role.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredPods.map((pod) => (
            <div
              key={pod.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-3">{pod.title}</h2>
              <p className="text-gray-700 mb-4">{pod.description}</p>
              <p className="text-sm text-gray-500">{pod.members} members</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/roles" className="text-purple-600 hover:underline">
          Take the Role Quiz again
        </Link>
      </div>
    </main>
  );
}
