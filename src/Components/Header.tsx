"use client";
import homeIcon from "@/../public/home-icon.svg";
import workIcon from "@/../public/work-icon.svg";
import Image from "next/image";

import { useEffect, useState } from "react";
import NavLink from "./NavLink";

function Header() {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(window.location.hash);
  }, [setActive]);

  return (
    <header className="fixed top-0 z-50 mx-auto flex w-full justify-center p-6 text-white max-md:top-auto max-md:bottom-0">
      {/* <header className="fixed bottom-0 z-50 mx-auto flex w-full justify-center p-6 text-white"> */}
      <nav className="rounded-xl bg-zinc-900 px-2">
        <ul className="flex justify-center gap-1">
          <li className="flex items-center gap-2 p-1 text-2xl font-bold text-white">
            <NavLink
              href="/"
              isActive={active === ""}
              setActive={() => setActive("")}
            >
              <span>
                <Image
                  src={homeIcon}
                  className="fill-white stroke-white"
                  alt=""
                />
              </span>
            </NavLink>
            <span className="h-4 w-0.25 bg-stone-700 text-sm text-stone-700"></span>
          </li>
          <li className="p-1">
            <NavLink
              href="/blog"
              className="flex items-center gap-2 font-bold text-white"
              isActive={active === "/blog"}
              setActive={() => setActive("/blog")}
            >
              <span>
                <Image src={workIcon} alt="" />
              </span>
              <span>Blog</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
