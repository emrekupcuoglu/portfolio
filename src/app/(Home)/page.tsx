import Hero from "./_features/Hero";
import AnimatedSentence from "../../Components/AnimatedSentence";

import HighlightedWord from "../../Components/HighlightedWord";
import About from "./_features/About";

const sentence = "I am a full stack developer, I built websites that are:";

export default function Home() {
  return (
    <>
      <Hero>
        <div className="relative z-50 mx-auto max-w-xl p-12 text-4xl">
          <h1 className="text-7xl blur-none max-md:text-5xl max-sm:text-3xl">
            Hi I am Emre
          </h1>

          <div>
            <AnimatedSentence sentence={sentence} delay={40} />

            <HighlightedWord words={["Unique", "Scalable", "Nice"]} />
          </div>

          <div className="absolute -top-1/2 left-0 -z-20 aspect-square w-full rounded-full bg-zinc-100/30 blur-3xl"></div>
        </div>
      </Hero>

      <About />
    </>
  );
}
