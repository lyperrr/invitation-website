/** @format */
import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import gallery1 from "@/assets/image/gallery/gallery (1).jpg";
import gallery2 from "@/assets/image/gallery/gallery (2).jpg";
import gallery3 from "@/assets/image/gallery/gallery (3).jpg";
import gallery4 from "@/assets/image/gallery/gallery (4).jpg";
import gallery5 from "@/assets/image/gallery/gallery (5).jpg";
import Typography from "../ui/typography";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const Data = {
    title: "The Wedding of",
    name: "Agus & Mang ari",
    date: "Sabtu, 12 April 2025",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative">
        <div className="h-screen relative overflow-hidden bg-primary">
          <AnimatePresence mode="sync" initial={false}>
            <Motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1.05, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 7, ease: "linear" },
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Overlay to top */}
          <div className="absolute bottom-0 left-0 right-0 h-70 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>

          {/* Information */}
          <div className="absolute flex flex-col items-center w-full justify-center z-20 *:text-secondary! text-center left-1/2 -translate-x-1/2 bottom-0">
            <Typography className="tracking-wider">{Data.title}</Typography>
            <Typography
              variant="h1"
              className="font-great-vibes font-medium text-5xl"
            >
              {Data.name}
            </Typography>
            <Typography className="tracking-wider mt-0!">
              {Data.date}
            </Typography>
          </div>
        </div>

        {/* Dots indicator*/}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "bg-secondary w-8 scale-110"
                  : "bg-secondary/30 w-2 hover:bg-secondary/50 hover:scale-110"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Shape */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1000 100"
        >
          <g className="fill-primary absolute -z-10">
            <path d="M0 0h1000v4H0z"></path>
            <path
              d="M0 0h1000v80.8S550 100 500 100 0 80.8 0 80.8V0Z"
              opacity=".2"
            ></path>
            <path
              d="M0 0h1000v61.6S600 100 500 100 0 61.6 0 61.6V0Z"
              opacity=".3"
            ></path>
            <path
              d="M0 0h1000v42.4S650 100 500 100 0 42.4 0 42.4V0Z"
              opacity=".4"
            ></path>
            <path
              d="M0 0h1000v23.2S700 100 500 100 0 23.2 0 23.2V0Z"
              opacity=".5"
            ></path>
            <path d="M0 0v4s250 96 500 96 500-96 500-96V0H0Z"></path>
          </g>
        </svg>
      </section>
    </>
  );
};

export default HeroSection;
