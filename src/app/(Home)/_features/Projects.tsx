"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import nextIcon from "@/../public/next-icon.svg";
import reactIcon from "@/../public/react-icon.svg";
import rhfIcon from "@/../public/rhf-icon.svg";
import styledComponentsIcons from "@/../public/styled-components-icon.svg";
import supabaseIcon from "@/../public/supabase-icon.svg";
import tailwindIcon from "@/../public/tailwind-icon.svg";
import tsIcon from "@/../public/ts-icon.svg";
import zodIcon from "@/../public/zod-icon.svg";

import cozyCoveHome from "@/../public/cozy-cove-home.png";
import cozyNestHome from "@/../public/cozy-nest-home.png";
import wildOasis from "@/../public/wild-oasis-home.png";

function Projects() {
  return (
    <>
      <h2 className="text-5xl">Projects</h2>
      <div className="pb-12">
        <div className="pb-8">
          <ProjectName>The Cozy Nest</ProjectName>

          <ProjectItem
            bulletPoints={[
              "A fully responsive e-commerce app built with Next.js & Supabase",
              "Users can see tending and featured products, filter and sort products",
              "Users can add products to their cart and checkout, using localstorage",
            ]}
          />
        </div>

        <ProjectImage
          img={cozyNestHome}
          alt="Cozy nest home page"
          githubLink="https://github.com/emrekupcuoglu/the-cozy-nest"
          liveLink="https://the-cozy-nest.vercel.app/"
          icons={[tsIcon, nextIcon, supabaseIcon, zodIcon, rhfIcon]}
        />
      </div>

      <div className="pb-12">
        <div className="pb-8">
          <ProjectName>The Cozy Cove</ProjectName>

          <ProjectItem
            bulletPoints={[
              "A hotel check-in app built with Next.js, Supabase & NextAuth",
              "Users can browser cabins, filter and book cabins",
              "User can log-in with Google and see their bookings",
            ]}
          />
        </div>

        <ProjectImage
          img={cozyCoveHome}
          alt="Cozy cove home page"
          githubLink="https://github.com/emrekupcuoglu/the-cozy-cove"
          liveLink="https://the-cozy-cove.vercel.app/"
          icons={[tsIcon, nextIcon, supabaseIcon, tailwindIcon]}
        />
      </div>

      <div className="pb-12">
        <div className="pb-8">
          <ProjectName>The Wild Oasis</ProjectName>

          <ProjectItem
            bulletPoints={[
              "A hotel dashboard and admin panel for The Cozy Cove built with React & Supabase",
              "Users can see create, update, and delete cabins",
              "User can see statistics and charts about the bookings and manage their business based on the data",
            ]}
          />
        </div>

        <ProjectImage
          img={wildOasis}
          alt="Wild oasis home page"
          githubLink="https://github.com/emrekupcuoglu/wild-oasis"
          liveLink="https://wild-oasis-orpin.vercel.app/"
          icons={[
            tsIcon,
            reactIcon,
            supabaseIcon,
            rhfIcon,
            styledComponentsIcons,
          ]}
        />
      </div>
    </>
  );
}

export default Projects;

function ProjectItem({ bulletPoints }: { bulletPoints: string[] }) {
  return (
    <ul className="list-disc text-green-300 [&_p]:text-white">
      {bulletPoints.map((point, index) => {
        return (
          <li key={index}>
            <p className="">{point}</p>
          </li>
        );
      })}
    </ul>
  );
}

function ProjectName({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="pb-4 text-2xl font-bold">{children}</p>
    </div>
  );
}

function ProjectImage({
  img,
  alt,
  icons,
  githubLink,
  liveLink,
}: {
  img: StaticImport;
  alt: string;
  icons: StaticImport[];
  githubLink: string;
  liveLink: string;
}) {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div
      className="group perspective relative h-[34rem] w-[43rem] cursor-pointer"
      onClick={handleToggle}
    >
      {/* Flip wrapper */}
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""} group-hover:[transform:rotateY(180deg)]`}
      >
        {/* FRONT */}
        <div className="absolute h-full w-full overflow-hidden rounded-2xl bg-slate-200 py-4 backface-hidden">
          <Image
            src={img}
            alt={alt}
            className="h-[30rem] w-full bg-slate-200 object-cover"
          />
          <div className="flex -translate-y-5 justify-center gap-8 p-4 py-0">
            {icons.map((icon, index) => (
              <Image
                key={index}
                src={icon}
                alt=""
                className="aspect-square w-12 max-md:w-10 max-sm:w-8"
              />
            ))}
          </div>
        </div>

        {/* BACK */}
        <div className="absolute flex h-full w-full rotate-y-180 flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl bg-gray-800 p-8 text-white backface-hidden">
          <p className="text-2xl font-bold">View Project</p>
          <div className="flex gap-6">
            <Link
              href={githubLink}
              target="_blank"
              className="rounded border border-white px-6 py-2 transition hover:bg-white hover:text-gray-800"
            >
              GitHub
            </Link>
            <Link
              href={liveLink}
              target="_blank"
              className="rounded border border-white px-6 py-2 transition hover:bg-white hover:text-gray-800"
            >
              Live Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
