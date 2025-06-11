import OnBoardingNav from "@/app/component/layout/OnboardingNav";
import OnboardingSteps from "@/app/component/ui/onboarding/OnboardingStep";

import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <OnBoardingNav />
      <main className=" flex-1  overflow-auto">
        <OnboardingSteps />
      </main>
    </div>
  );
};

export default page;
