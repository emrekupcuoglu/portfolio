"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

function NavLink({
  children,
  href,
  className,
  isActive = false,
  setActive,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  isActive: boolean;
  setActive: (section: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => setActive(href)}
      className={cn(
        "rounded-2xl p-4",
        className,
        isActive && "border border-zinc-500 bg-zinc-700",
        !isActive && "hover:border hover:border-zinc-500 hover:bg-zinc-800",
      )}
    >
      {children}
    </Link>
  );
}

export default NavLink;
