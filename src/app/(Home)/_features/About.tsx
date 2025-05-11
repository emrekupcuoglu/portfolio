import profileImg from "@/../public/profile.jpg";
import Image from "next/image";
import Link from "next/link";
import githubLogo from "@/../public/github.svg";
import linkedInLogo from "@/../public/linkedin.svg";
import emailLogo from "@/../public/email.svg";

import Projects from "./Projects";
import WorkExperience from "./WorkExperience";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";

function About() {
  return (
    <div className="bg-slate-700 px-48 py-24 text-lg text-white max-xl:px-32 max-lg:px-24 max-md:px-0 max-md:py-0">
      {/* <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] gap-36 px-24"> */}
      <div className="mx-auto flex max-w-7xl gap-36 px-8 max-lg:gap-24 max-md:flex-col max-md:items-center max-md:gap-12">
        <div className="sticky top-36 aspect-square h-36 rounded-full max-md:static max-md:w-fit">
          <Image
            src={profileImg}
            alt="profile image"
            className="aspect-square h-36 rounded-full object-cover object-top"
          />
        </div>

        <div>
          <h1
            id="about"
            className="pb-2 text-7xl max-md:text-center max-md:text-5xl max-sm:text-3xl"
          >
            Burak Küpçüoğlu
          </h1>
          <p className="pb-8 text-3xl text-slate-300 max-md:text-center max-sm:text-2xl">
            Fullstack Engineer
          </p>
          <div className="flex gap-2 pb-12 max-md:justify-center max-md:gap-4 max-sm:gap-2">
            <SocialMediaLink name="Github" src={githubLogo} />
            <SocialMediaLink name="LinkedIn" src={linkedInLogo} />
            <SocialMediaLink name="Email" src={emailLogo} />
          </div>

          <p>
            I&apos;m a passionate creator who transforms complex ideas into
            stunning, innovative solutions. With a strong blend of creative
            vision and technical know-how, I thrive on turning challenges into
            opportunities. Explore my work to see creativity in action and
            discover how I bring projects to life.
          </p>

          <div className="flex flex-col gap-8 pt-20 max-md:gap-6">
            <Projects />
            <WorkExperience />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

function SocialMediaLink({
  src,
  name,
}: {
  src: string | StaticImport;
  name: string;
}) {
  return (
    <Link
      href="https://github.com/emrekupcuoglu/"
      className={cn(
        "flex gap-2 rounded-xl border border-white bg-slate-900 px-3 py-1 max-md:rounded-3xl max-md:p-2 max-sm:p-1",
      )}
    >
      <div className="flex">
        <Image
          src={src}
          alt={`${name} logo`}
          className={cn("max-md:h-8 max-md:w-8 max-sm:h-5 max-sm:w-5")}
        />
      </div>
      <p className={cn("transition-all max-md:hidden")}>{name}</p>
    </Link>
  );
}
