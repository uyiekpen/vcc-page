"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/component/ui/card";
import { Badge } from "@/app/component/ui/badge";
import { Input } from "@/app/component/ui/input";
import { Button } from "@/app/component/layout/button";
import { useState } from "react";
import { Clock, CheckCircle, XCircle, Search } from "lucide-react";

const rawApplications = [
  {
    title: "Frontend Developer @ React Wizards",
    date: "June 18, 2025",
    status: "Pending",
  },
  {
    title: "Product Designer @ UI Ninjas",
    date: "June 14, 2025",
    status: "Accepted",
  },
  {
    title: "AI Researcher @ PromptPod",
    date: "June 10, 2025",
    status: "Rejected",
  },
];

export const ApplicationsTab = () => {
  const [search, setSearch] = useState("");

  const filteredApps = rawApplications.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const base = "flex items-center gap-1 text-sm px-2 py-1 rounded-full";
    switch (status) {
      case "Accepted":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <CheckCircle className="w-4 h-4" /> Accepted
          </span>
        );
      case "Rejected":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <XCircle className="w-4 h-4" /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            <Clock className="w-4 h-4" /> Pending
          </span>
        );
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Pod Applications</h2>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Empty State */}
      {filteredApps.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No applications found.</p>
          <p className="text-sm">
            Try adjusting your search or apply to a new pod.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{app.title}</CardTitle>
                  <CardDescription>Applied on {app.date}</CardDescription>
                </div>
                {getStatusBadge(app.status)}
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-sm text-gray-600">
                  {app.status === "Pending" &&
                    "We're reviewing your application."}
                  {app.status === "Accepted" &&
                    "Congratulations! You’ve been accepted into this pod."}
                  {app.status === "Rejected" &&
                    "Unfortunately, this application was not successful."}
                </p>
                {app.status === "Rejected" && (
                  <Button variant="outline" size="sm">
                    Reapply
                  </Button>
                )}
                {app.status === "Pending" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-50"
                  >
                    Withdraw
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
