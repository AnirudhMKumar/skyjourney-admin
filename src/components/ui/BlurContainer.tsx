
import { cn } from "@/lib/utils";
import React from "react";

type BlurContainerProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

const BlurContainer = ({
  children,
  className,
  variant = "light",
}: BlurContainerProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variant === "light" 
          ? "bg-white/70 backdrop-blur-lg border border-white/20 shadow-sm" 
          : "bg-black/70 backdrop-blur-lg border border-white/10 shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
