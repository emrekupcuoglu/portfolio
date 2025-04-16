"use client";

import { cn } from "@/lib/utils";

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
  console.log("NavLink", isActive, href);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
      });
    }
    console.log("href", href);
    window.history.pushState(null, "", href);
    setActive(href);
  }

  return (
    <a
      onClick={onClick}
      href={href}
      className={cn(
        "rounded-2xl p-4",
        className,
        isActive && "border border-zinc-500 bg-zinc-700",
        !isActive && "hover:border hover:border-zinc-500 hover:bg-zinc-800",
      )}
    >
      {children}
    </a>
  );
}

export default NavLink;
