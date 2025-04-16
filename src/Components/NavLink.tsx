"use client";

import { cn } from "@/lib/utils";

function NavLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
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
  }

  return (
    <a
      onClick={onClick}
      href={href}
      className={cn("rounded-2xl p-4 hover:bg-gray-600", className)}
    >
      {children}
    </a>
  );
}

export default NavLink;
