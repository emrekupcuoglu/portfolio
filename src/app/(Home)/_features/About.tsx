import profileImg from "@/../public/profile.jpg";
import Image from "next/image";
import Link from "next/link";
import githubLogo from "@/../public/github.svg";
import linkedInLogo from "@/../public/linkedin.svg";
import emailLogo from "@/../public/email.svg";

import Projects from "./Projects";
import WorkExperience from "./WorkExperience";
function About() {
  return (
    <div className="bg-slate-700 py-24 text-lg text-white">
      {/* <div className="mx-auto flex max-w-7xl justify-center gap-36 px-24"> */}
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] gap-36 px-24">
        <div className="sticky top-36 aspect-square h-36 rounded-full">
          <Image
            src={profileImg}
            alt="profile image"
            className="aspect-square h-36 rounded-full object-contain"
          />
        </div>

        <div>
          <h1 id="about" className="text-7xl">
            Burak Küpçüoğlu
          </h1>
          <p className="pb-8 text-3xl text-slate-300">Fullstack Engineer</p>
          <div className="flex gap-2 pb-12">
            <Link
              href="https://github.com/emrekupcuoglu/"
              className="flex gap-2 rounded-xl border border-white bg-slate-900 px-3 py-1"
            >
              <div className="flex">
                <Image src={githubLogo} alt="github logo" />
              </div>
              <p>Github</p>
            </Link>

            <Link
              href="https://www.linkedin.com/in/bekupcuoglu/"
              className="flex gap-2 rounded-xl border border-white bg-slate-900 px-3 py-1"
            >
              <div className="flex">
                <Image src={linkedInLogo} alt="linkedIn logo" />
              </div>
              <p>LinkedIn</p>
            </Link>

            <Link
              href="mailto:emrekupcuoglu@gmail.com"
              className="flex gap-2 rounded-xl border border-white bg-slate-900 px-3 py-1"
            >
              <div className="flex">
                <Image src={emailLogo} alt="email logo" />
              </div>
              <p>Email</p>
            </Link>
          </div>

          <p>
            I&apos; a passionate creator who transforms complex ideas into
            stunning, innovative solutions. With a strong blend of creative
            vision and technical know-how, I thrive on turning challenges into
            opportunities. Explore my work to see creativity in action and
            discover how I bring projects to life.
          </p>

          <div className="flex flex-col gap-12 pt-12">
            <Projects />
            <WorkExperience />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
