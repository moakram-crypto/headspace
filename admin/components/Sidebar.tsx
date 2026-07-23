"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/content", label: "Content", icon: "🧘" },
  { href: "/courses", label: "Courses", icon: "📚" },
  { href: "/categories", label: "Categories", icon: "🏷️" },
  { href: "/users", label: "Users", icon: "👥" },
  { href: "/subscriptions", label: "Subscriptions", icon: "💳" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-navy text-white md:flex">
      <div className="px-6 py-6">
        <span className="text-xl font-bold">Calm Path</span>
        <div className="text-xs text-white/60">Admin</div>
      </div>
      <nav className="flex-1 px-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                active ? "bg-coral text-white" : "text-white/80 hover:bg-white/10"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 text-xs text-white/40">Super Admin</div>
    </aside>
  );
}
