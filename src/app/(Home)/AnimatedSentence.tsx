import { div } from "motion/react-client";
import Letter from "./Letter";

function AnimatedSentence({
  sentence,
  delay,
}: {
  sentence: string;
  delay: number;
}) {
  const letters = sentence.split("");

  return (
    <div>
      {letters.map((letter, index) => (
        <Letter key={index} delay={index * delay}>
          {letter}
        </Letter>
      ))}
    </div>
  );
}

export default AnimatedSentence;
