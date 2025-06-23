"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/component/ui/card";
import { Button } from "@/app/component/layout/button";
import { Users } from "lucide-react";

const pods = [
  {
    name: "React Wizards",
    role: "Frontend Dev",
    contributions: {
      messages: 124,
      tasks: 8,
    },
  },
  {
    name: "Prompt Engineers",
    role: "AI Researcher",
    contributions: {
      messages: 78,
      tasks: 5,
    },
  },
  {
    name: "Design Sorcerers",
    role: "UI Designer",
    contributions: {
      messages: 142,
      tasks: 12,
    },
  },
];

export const MyPodsTab = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="text-[#0055BA]" /> My Pods
      </h2>

      {pods.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg font-medium">You're not in any pods yet.</p>
          <p className="text-sm">
            Join a pod to start collaborating with others.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pods.map((pod, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{pod.name}</CardTitle>
                <CardDescription>
                  Your role: <strong>{pod.role}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>💬 Messages sent: {pod.contributions.messages}</p>
                  <p>✅ Tasks completed: {pod.contributions.tasks}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Pod
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 w-full hover:bg-red-50"
                  >
                    Leave
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
