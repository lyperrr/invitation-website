/** @format */
import Typography from "../ui/typography";
import { Clock, MapPin, Map } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";
import WaveShape3 from "../shapes/WaveShape3";
import {
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  ScaleIn,
  BounceIn,
  RotateIn,
  SlideInLeft,
} from "../../lib/animations";

const WeddingDate = () => {
  const weddingData = {
    date: {
      day: 12,
      month: "Mei",
      year: 2026,
    },
    event: {
      type: "Resepsi",
      time: "16:00 - SELESAI",
      location: "Gedung Sate, Jl. Raya Kuta",
      mapLink: "", // URL untuk petunjuk arah
    },
    messages: {
      invitation:
        "Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir untuk memberikan doa restu.",
      blessing: "Om Santhi Santhi Santhi Om",
    },
  };

  const [dayCounter, setDayCounter] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setDayCounter((prev) => {
              if (prev < weddingData.date.day) {
                return prev + 1;
              } else {
                clearInterval(interval);
                return prev;
              }
            });
          }, 150); // Adjust speed as needed

          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [weddingData.date.day]);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-wedding-date bg-cover bg-center bg-no-repeat h-screen"
      >
        <div className="container h-full flex items-center">
          <div className="bg-primary/70 border border-primary p-4 rounded-xl">
            <StaggerContainer staggerDelay={0.6}>
              <StaggerItem>
                <ScrollReveal threshold={0.3}>
                  <FadeIn>
                    <Typography className="text-center text-sm mb-6">
                      {weddingData.messages.invitation}
                    </Typography>
                  </FadeIn>
                </ScrollReveal>
              </StaggerItem>
              {/* Wedding Date */}
              <StaggerItem>
                <ScrollReveal threshold={0.3}>
                  <ScaleIn delay={0.2}>
                    <div className="border-secondary border backdrop-blur-xs flex *:grow rounded-lg overflow-hidden">
                      <div className="bg-secondary p-4 flex items-center justify-center **:text-primary **:text-center">
                        <div>
                          <Typography variant="h1" className="mx-0">
                            {dayCounter}
                          </Typography>
                          <Typography variant="h4">
                            {weddingData.date.month}
                          </Typography>
                          <Typography variant="h4">
                            {weddingData.date.year}
                          </Typography>
                        </div>
                      </div>
                      <div className="p-4">
                        <Typography
                          variant="h4"
                          className="text-secondary uppercase font-playfair tracking-widest"
                        >
                          {weddingData.event.type}
                        </Typography>
                        <Typography className="uppercase inline-flex items-center gap-2 mt-0! text-sm!">
                          <Clock size={16} />
                          {weddingData.event.time}
                        </Typography>
                        <Typography className="inline-flex items-center gap-2 mt-0! text-sm! leading-4">
                          <MapPin size={16} />
                          {weddingData.event.location}
                        </Typography>
                        <Button
                          asChild
                          variant="tertiary"
                          size="sm"
                          className="text-secondary mx-auto flex mt-2"
                        >
                          <a href={weddingData.event.mapLink}>
                            <Map size={16} />
                            Petunjuk Arah
                          </a>
                        </Button>
                      </div>
                    </div>
                  </ScaleIn>
                </ScrollReveal>
              </StaggerItem>
              <StaggerItem>
                <ScrollReveal threshold={0.3}>
                  <SlideInLeft delay={0.3}>
                    <Typography className="text-center text-sm my-6">
                      {weddingData.messages.invitation}
                    </Typography>
                  </SlideInLeft>
                </ScrollReveal>
              </StaggerItem>
              <StaggerItem>
                <ScrollReveal threshold={0.3}>
                  <BounceIn delay={0.4}>
                    <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto" />
                  </BounceIn>
                </ScrollReveal>
              </StaggerItem>
              <StaggerItem>
                <ScrollReveal threshold={0.3}>
                  <RotateIn delay={0.5}>
                    <Typography
                      variant="h5"
                      className="font-playfair text-secondary tracking-widest text-center"
                    >
                      {weddingData.messages.blessing}
                    </Typography>
                  </RotateIn>
                </ScrollReveal>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
        <WaveShape3 />{" "}
      </section>
    </>
  );
};

export default WeddingDate;
