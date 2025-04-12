"use client";

import * as motion from "motion/react-client";

function Letter({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.span
      className="opacity-0"
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.span>
  );
}

export default Letter;
