"use client";

import * as motion from "motion/react-client";

import { useEffect, useRef, useState } from "react";

// --- Configuration ---

const START_DELAY = 0;
const DURATION = 5000;

function HighlightedWord({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const word = words[currentWordIndex] || "";

  const wordChangeDelay = useRef<number>(DURATION + START_DELAY);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, wordChangeDelay.current);

    wordChangeDelay.current = DURATION;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentWordIndex, words]);

  return (
    <motion.div className="mt-8 flex skew-3 justify-center overflow-hidden text-7xl max-md:mt-4 max-md:text-5xl max-sm:text-3xl">
      <motion.div
        className="w-96 overflow-hidden bg-linear-to-b from-[#8DAA91] to-[#EE6C4D] px-2 text-center max-md:w-48 max-sm:w-36"
        initial={{ translateY: "120%" }}
        animate={{ translateY: ["120%", 0] }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          delay: 2,
        }}
      >
        <motion.div
          key={currentWordIndex}
          initial={{ translateY: "120%" }}
          animate={{ translateY: ["120%", 0, 0, "-120%"] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeIn",
            times: [0, 0.05, 0.9, 1],
          }}
        >
          {word}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HighlightedWord;
