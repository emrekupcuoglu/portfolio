import Image from "next/image";
import sky from "@/../public/mountain-sky.jpg";
// import sky from "@/../public/gargantuan-2.jpg";
// import sky from "@/../public/gargantuan.png";

import * as motion from "motion/react-client";
// import { motion } from "motion/react";

function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="relative -z-50 aspect-video w-full">
        <div className="py-36">{children}</div>
        <Image src={sky} className="-z-50" alt="sky" fill />
      </div>
      <div className="relative left-1/2 w-[6400px] -translate-x-1/2">
        <div className="wave"></div>

        <div className="wave-2"></div>
      </div>
    </div>
  );
}

export default Hero;
