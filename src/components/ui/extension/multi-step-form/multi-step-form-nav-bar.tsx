"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import type { Context } from "react";
import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";

interface MultiStepNavBarProps<T> extends React.HTMLAttributes<HTMLElement> {
  context: Context<T>;
}
// biome-ignore lint: must be any as it is a any object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MultiStepNavbar<T extends UseMultiStepFormTypeOptions<any>>({
  className,
  context,
  ...props
}: MultiStepNavBarProps<T>) {
  const { currentStepLabel, labels } = useMultiStepForm(context);
  return (
    <ul
      className={cn(
        "flex justify-around items-center sm:flex-col sm:justify-start sm:items-start sm:min-w-36  lg:space-x-0 lg:space-y-1 border-2 rounded-lg",
        className,
      )}
      {...props}
    >
      {labels.map((label) => (
        <li
          key={label}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            currentStepLabel === label ? "" : "",
            "w-full rounded-none",
          )}
        >
          <div className="relative">
            {label}
            {currentStepLabel === label ? (
              <div className="absolute -bottom-1 left-0 right-0 h-[0.15rem] bg-primary" />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MultiStepNavbar;
