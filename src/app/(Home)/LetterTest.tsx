"use client";
import React, { useState, useEffect, useRef, FC } from "react";

// --- Configuration ---
const STAGGER_DELAY_MS = 80; // Delay between each letter's animation start
const LETTER_ANIM_DURATION_MS = 400; // Duration of a single letter's fade/move animation
const PAUSE_DURATION_MS = 1500; // How long the completed word stays visible
const VANISH_STAGGER_DELAY_MS = 50; // Delay between each letter's vanishing animation
// ---

// Define the props interface
interface LetterTestProps {
  /** An array of words to cycle through */
  words?: string[];
  /** Optional Tailwind classes for the main container */
  containerClassName?: string;
  /** Optional Tailwind classes for the text itself */
  textClassName?: string;
}

const LetterTest: FC<LetterTestProps> = ({
  words = ["AWESOME", "REACT", "TYPESCRIPT", "LOOP"], // Default words
  containerClassName = "flex justify-center items-center h-12 overflow-hidden", // Default container style
  textClassName = "text-3xl font-semibold", // Default text style
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  // Ref to the container holding the letters, specify the element type
  const lettersContainerRef = useRef<HTMLDivElement>(null);

  // Effect to handle the animation lifecycle
  useEffect(() => {
    // Ensure words array is valid and has content
    if (!words || words.length === 0) return;

    const word = words[currentWordIndex];
    if (!word) return; // Safety check

    const letterElements = lettersContainerRef.current?.childNodes;

    // Guard against cases where elements aren't rendered yet or mismatch
    // NodeList is not strictly an array, checking its length is fine
    if (!letterElements || letterElements.length !== word.length) {
      return;
    }

    // Store timeout IDs for cleanup. NodeJS.Timeout is common, but number works too.
    const timeouts: NodeJS.Timeout[] = [];

    // --- Animation Sequence ---

    // 1. Animate In: Staggered fade up and in
    letterElements.forEach((node, index) => {
      // Type Guard: Ensure the node is an HTMLElement to access style
      if (node instanceof HTMLElement) {
        const span = node; // Rename for clarity within the scope
        // Reset initial state (important for subsequent loops)
        span.style.opacity = "0";
        span.style.transform = "translateY(1em)"; // Start slightly below
        span.style.transition = "none"; // Temporarily disable transition for reset

        // Schedule the 'in' animation
        const t1 = setTimeout(() => {
          span.style.transition = `opacity ${LETTER_ANIM_DURATION_MS}ms ease-out, transform ${LETTER_ANIM_DURATION_MS}ms ease-out`;
          span.style.transitionDelay = `${index * STAGGER_DELAY_MS}ms`;
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }, 50); // Small delay (~3 frames)
        timeouts.push(t1);
      }
    });

    // Calculate total time for the 'in' animation to complete
    const totalInDuration =
      (word.length - 1) * STAGGER_DELAY_MS + LETTER_ANIM_DURATION_MS;

    // 2. Animate Out (Vanish): Staggered fade up and out after pause
    const vanishStartTime = totalInDuration + PAUSE_DURATION_MS;

    const t2 = setTimeout(() => {
      letterElements.forEach((node, index) => {
        if (node instanceof HTMLElement) {
          const span = node;
          span.style.transition = `opacity ${LETTER_ANIM_DURATION_MS}ms ease-in, transform ${LETTER_ANIM_DURATION_MS}ms ease-in`;
          // Stagger the vanishing animation
          span.style.transitionDelay = `${index * VANISH_STAGGER_DELAY_MS}ms`;
          span.style.opacity = "0";
          span.style.transform = "translateY(-1em)"; // Vanish upwards
        }
      });
    }, vanishStartTime);
    timeouts.push(t2);

    // Calculate total time for the 'out' animation to complete
    const totalOutDuration =
      (word.length - 1) * VANISH_STAGGER_DELAY_MS + LETTER_ANIM_DURATION_MS;

    // 3. Switch Word: Schedule update after the vanish animation completes
    const nextWordTime = vanishStartTime + totalOutDuration + 100; // Add small buffer

    const t3 = setTimeout(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, nextWordTime);
    timeouts.push(t3);

    // --- Cleanup ---
    return () => {
      timeouts.forEach(clearTimeout); // Clear all scheduled timeouts
    };
  }, [currentWordIndex, words]); // Dependencies array

  // --- Render ---
  const currentWord: string = words[currentWordIndex] || ""; // Ensure currentWord is always a string

  return (
    <div className={`${containerClassName} ${textClassName}`}>
      {" "}
      {/* Apply container and text styles */}
      <div
        ref={lettersContainerRef}
        className="relative flex whitespace-nowrap"
        aria-live="polite"
        aria-label={`Animating word: ${currentWord}`}
      >
        {/* Map the current word to individual letter spans */}
        {currentWord.split("").map((letter, index) => (
          <span
            key={`${currentWordIndex}-${index}-${letter}`} // Make key even more unique
            className="inline-block opacity-0" // Initial state
            style={{ transform: "translateY(1em)" }} // Initial position
          >
            {letter === " " ? "\u00A0" : letter} {/* Handle spaces */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LetterTest;
