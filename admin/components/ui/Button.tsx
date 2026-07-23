import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
        variant === "primary" && "bg-coral text-white hover:bg-coral-dark",
        variant === "secondary" && "bg-lavender text-white hover:opacity-90",
        variant === "ghost" && "border border-coral text-coral hover:bg-coral/5",
        className
      )}
      {...props}
    />
  );
}
