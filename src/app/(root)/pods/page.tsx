// app/pods/page.tsx
import PodsClient from "@/app/component/ui/PodClient";
import { Suspense } from "react";

export default function PodsPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-20">Loading Pods...</div>}
    >
      <PodsClient />
    </Suspense>
  );
}
