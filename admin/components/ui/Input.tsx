import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full rounded-lg border border-borderc bg-cream/40 px-3 py-2 text-sm outline-none focus:border-coral",
        className
      )}
      {...props}
    />
  );
}
