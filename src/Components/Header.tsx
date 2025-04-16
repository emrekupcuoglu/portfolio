"use client";
import aboutIcon from "@/../public/about-icon.svg";
import homeIcon from "@/../public/home-icon.svg";
import workIcon from "@/../public/work-icon.svg";
import Image from "next/image";

import { useState } from "react";
import NavLink from "./NavLink";

function Header() {
  const [active, setActive] = useState("home");
  return (
    <header className="fixed top-0 z-50 mx-auto flex w-full justify-center p-6 text-white">
      <nav className="rounded-xl bg-zinc-900 px-2">
        <ul className="flex justify-center gap-1">
          <li className="flex items-center gap-2 text-2xl font-bold text-white">
            <NavLink href="#home">
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
          <li>
            <NavLink
              href="#about"
              className="flex items-center gap-2 font-bold text-white"
            >
              <span>
                <Image src={aboutIcon} alt="" />
              </span>
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="#work"
              className="flex items-center gap-2 font-bold text-white"
            >
              <span>
                <Image src={workIcon} alt="" />
              </span>
              <span>Work</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
