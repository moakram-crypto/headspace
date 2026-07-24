import clsx from "clsx";

export function Badge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "success" | "warn" | "danger" | "primary";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "neutral" && "bg-gray-100 text-gray-700",
        tone === "success" && "bg-success/15 text-success",
        tone === "warn" && "bg-warn/15 text-warn",
        tone === "danger" && "bg-danger/15 text-danger",
        tone === "primary" && "bg-coral/15 text-coral"
      )}
    >
      {label}
    </span>
  );
}
