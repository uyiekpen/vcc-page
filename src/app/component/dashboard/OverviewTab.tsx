"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/component/ui/card";
import { Progress } from "@/app/component/ui/progress";

export const OverviewTab = () => {
  return (
    <>
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
            <CardDescription>Level 12</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={70} showLabel className="mb-2" />
            <p className="text-sm text-gray-600">550 XP to next level</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>85%</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={85} showLabel className="mb-2" />
            <p>Complete your profile to unlock features</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Active Pods</CardTitle>
            <CardDescription>3</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Contributing to 3 pods</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>8</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Unlocked achievements</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
