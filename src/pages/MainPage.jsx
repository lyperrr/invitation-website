/** @format */
import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Vinyl from "@/components/Vinyl";
import { FadeIn } from "@/lib/animations";
import HeroSection from "@/components/Section/HeroSection";
import OpeningVerse from "@/components/Section/OpeningVerse";

const MainPage = ({ isMusicPlaying, onToggleMusic }) => {
  return (
    <>
      {/* Vinyl Player - Mobile & Tablet Only */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <FadeIn delay={0.5} duration={0.6}>
          <Vinyl isPlaying={isMusicPlaying} onToggle={onToggleMusic} />
        </FadeIn>
      </div>

      <HeroSection />
      <OpeningVerse />
    </>
  );
};

export default MainPage;
