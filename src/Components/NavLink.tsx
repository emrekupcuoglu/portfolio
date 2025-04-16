"use client";

import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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
    console.log("href", href);
    const a = document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });

    console.log("a", a);
    // if (href === "#home") {
    //   e.preventDefault();
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }
  }
  // useEffect(() => {
  //   document.getElementById(href)?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, []);
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
