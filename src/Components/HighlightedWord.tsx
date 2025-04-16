"use client";

import * as motion from "motion/react-client";

import { useEffect, useRef, useState } from "react";

// --- Configuration ---

const START_DELAY = 2000; // Delay before the first word appears
const DURATION = 5000; // Duration of each word

function HighlightedWord({
  words,
  delay,
}: {
  words: string[];
  delay?: number;
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const word = words[currentWordIndex] || "";

  const wordChangeDelay = useRef<number>(DURATION + START_DELAY);

  useEffect(() => {
    setTimeout(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, wordChangeDelay.current);

    wordChangeDelay.current = DURATION;

    return () => {
      clearTimeout(wordChangeDelay.current);
    };
  }, [currentWordIndex, words]);

  return (
    <motion.div className="mt-8 skew-3 overflow-hidden text-7xl">
      <motion.div
        className="w-96 overflow-hidden bg-pink-400 px-2 text-center"
        initial={{ translateY: "120%" }}
        animate={{ translateY: ["120%", 0] }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          delay: 2,
        }}
      >
        <motion.div
          initial={{ translateY: "120%" }}
          animate={{ translateY: ["120%", 0, 0, "-120%"] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeIn",
            times: [0, 0.1, 0.9, 1],
            delay: 2,
          }}
        >
          {word}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HighlightedWord;
