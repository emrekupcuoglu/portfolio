import Image, { StaticImageData } from "next/image";

import nextIcon from "@/../public/next-icon.svg";
import supabaseIcon from "@/../public/supabase-icon.svg";
import zodIcon from "@/../public/zod-icon.svg";
import rhfIcon from "@/../public/rhf-icon.svg";
import tailwindIcon from "@/../public/tailwind-icon.svg";
import reactIcon from "@/../public/react-icon.svg";
import styledComponentsIcons from "@/../public/styled-components-icon.svg";
import tsIcon from "@/../public/ts-icon.svg";

import cozyNestHome from "@/../public/cozy-nest-home.png";
import cozyCoveHome from "@/../public/cozy-cove-home.png";
import wildOasis from "@/../public/wild-oasis-home.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

function Projects() {
  return (
    <>
      <h2 className="pb-8 text-4xl">Projects</h2>
      <div className="pb-12">
        <div className="pb-8 pl-16">
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
          icons={[tsIcon, nextIcon, supabaseIcon, zodIcon, rhfIcon]}
        />
      </div>

      <div className="pb-12">
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
        icons={[tsIcon, nextIcon, supabaseIcon, tailwindIcon]}
      />

      <div className="pb-12">
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
        icons={[
          tsIcon,
          reactIcon,
          supabaseIcon,
          rhfIcon,
          styledComponentsIcons,
        ]}
      />
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
  icons,
}: {
  img: StaticImport;
  icons: StaticImport[];
}) {
  return (
    // <div className="relative aspect-[16/9] w-11/11 rounded-2xl bg-slate-200">
    <div className="rounded-2xl bg-slate-200">
      <Image src={img} alt="Cozy nest home page" />
      <div className="flex justify-center gap-8 px-12">
        {icons.map((icon, index) => {
          return (
            <Image
              key={index}
              src={icon}
              alt=""
              className="h-12 w-12 -translate-y-4"
            />
          );
        })}
      </div>
    </div>
  );
}
