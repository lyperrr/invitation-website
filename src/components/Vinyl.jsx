/** @format */

import { motion as Motion } from "motion/react";
import { Play, Pause } from "lucide-react";

const Vinyl = ({ isPlaying, onToggle }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Vinyl Disc */}
      <Motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
        }}
        className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl"
      >
        {/* Vinyl grooves - Desktop only */}
        <div className="hidden lg:block absolute inset-2 rounded-full border-2 border-gray-700/30"></div>
        <div className="hidden lg:block absolute inset-4 rounded-full border-2 border-gray-700/30"></div>
        <div className="hidden lg:block absolute inset-6 rounded-full border-2 border-gray-700/30"></div>

        {/* Center label - Desktop only */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
      </Motion.div>

      {/* Needle/Tonearm - Desktop only */}
      <Motion.div
        animate={{ rotate: isPlaying ? -25 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute -right-4 top-0 origin-top-right hidden lg:block"
      >
        <div className="w-14 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg relative">
          <div className="absolute right-0 w-3 h-3 bg-secondary rounded-full -translate-y-1/2 top-1/2"></div>
        </div>
      </Motion.div>

      {/* Play/Pause Button - Center on mobile, bottom on desktop */}
      <button
        onClick={onToggle}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-secondary/90 backdrop-blur-sm hover:bg-secondary transition-all duration-300 flex items-center justify-center shadow-lg"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause
            size={14}
            className="text-primary fill-primary lg:w-4 lg:h-4"
          />
        ) : (
          <Play
            size={14}
            className="text-primary fill-primary ml-0.5 lg:w-4 lg:h-4"
          />
        )}
      </button>
    </div>
  );
};

export default Vinyl;
