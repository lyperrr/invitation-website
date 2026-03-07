/** @format */

import Typography from "../ui/typography";
import WaveShape2 from "../shapes/WaveShape2";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  FadeIn,
  SlideInDown,
} from "../../lib/animations";

const OpeningVerse = () => {
  return (
    <>
      <section className="py-10">
        {/* Shape Top */}
        <WaveShape2 rotate={true} />

        <div className="bg-primary flex flex-col items-center p-6">
          <StaggerContainer staggerDelay={0.2}>
            <StaggerItem>
              <ScrollReveal>
                <div className="h-0.5 w-1/2 bg-linear-90 from-accent-0 via-accent to-accent-0 mx-auto" />
              </ScrollReveal>
            </StaggerItem>
            <StaggerItem>
              <ScrollReveal>
                <FadeIn delay={0.3}>
                  <Typography className="text-white text-center italic my-3!">
                    "Om Swastyastu. Dengan segala puji syukur ke hadapan Ida
                    Sang Hyang Widhi Wasa, kami bermaksud mengundang
                    Bapak/Ibu/Saudara/i untuk turut merayakan hari bahagia
                    pernikahan kami."
                  </Typography>
                </FadeIn>
              </ScrollReveal>
            </StaggerItem>
            <StaggerItem>
              <ScrollReveal>
                <div className="h-0.5 w-1/2 bg-linear-90 from-accent-0 via-accent to-accent-0 mx-auto" />
              </ScrollReveal>
            </StaggerItem>
          </StaggerContainer>
        </div>
        {/* Shape Bottom */}
        <WaveShape2 />
      </section>
    </>
  );
};

export default OpeningVerse;
