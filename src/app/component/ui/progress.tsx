"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/app/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  showLabel?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, showLabel = false, ...props }, ref) => (
  <div className="relative w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-[#8C76E2] transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>

    {showLabel && (
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
        {value}%
      </span>
    )}
  </div>
));

Progress.displayName = "Progress";

export { Progress };
