import Image from "next/image";
import sky from "@/../public/mountain-sky.jpg";
// import sky from "@/../public/gargantuan-2.jpg";
// import sky from "@/../public/gargantuan.png";

import * as motion from "motion/react-client";

function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative -z-50 aspect-video w-full">
        <div className="py-36">{children}</div>
        <Image src={sky} className="-z-50" alt="sky" fill />
      </div>
      <div className="relative left-1/2 w-[6400px] -translate-x-1/2">
        <motion.div
          animate={{ translateX: "-25%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: [0.36, 0.45, 0.63, 0.53],
          }}
          className="wave"
        ></motion.div>
        {/* <div className="ocean"></div> */}
      </div>
    </div>
  );
}

export default Hero;
