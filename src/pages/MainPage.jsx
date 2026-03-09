/** @format */
import Vinyl from "@/components/Vinyl";
import { FadeIn } from "@/lib/animations";
import HeroSection from "@/components/sections/HeroSection";
import OpeningVerse from "@/components/sections/OpeningVerse";
import Couple from "@/components/sections/Couple";
import WeddingDate from "@/components/sections/WeddingDate";
import DateCounter from "@/components/sections/DateCounter";
import Gallery from "@/components/sections/gallery/Gallery";
import DigitalGift from "@/components/sections/DigitalGift";
import RSVP from "@/components/sections/rsvp/RSVP";

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
      <Couple />
      <WeddingDate />
      <DateCounter />
      <Gallery />
      <DigitalGift />
      <RSVP />
    </>
  );
};

export default MainPage;
