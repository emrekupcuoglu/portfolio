import AnimatedSentence from "./AnimatedSentence";

import HighlightedWord from "./HighlightedWord";

const sentence = "I am a full stack developer, I built websites that are: ";

export default function Home() {
  return (
    <div className="bg-gray-600 p-12">
      <h1>Hi I am Emre</h1>

      <div>
        <AnimatedSentence sentence={sentence} delay={40} />

        <HighlightedWord words={["Unique", "Scalable", "Nice"]} />
      </div>
    </div>
  );
}
