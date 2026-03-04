/** @format */

import Typography from "../ui/typography";
import WaveShape2 from "../shapes/WaveShape2";

const OpeningVerse = () => {
  return (
    <>
      <section className="py-10">
        {/* Shape Top */}
        <WaveShape2 rotate={true} />

        <div className="bg-primary flex flex-col items-center p-5">
          <div className="h-0.5 w-1/2 bg-linear-90 from-accent-0 via-accent to-accent-0" />
          <Typography className="text-white text-center italic my-3!">
            "Om Swastyastu. Dengan segala puji syukur ke hadapan Ida Sang Hyang
            Widhi Wasa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk
            turut merayakan hari bahagia pernikahan kami."
          </Typography>
          <div className="h-0.5 w-1/2 bg-linear-90 from-accent-0 via-accent to-accent-0" />
        </div>
        {/* Shape Bottom */}
        <WaveShape2 />
      </section>
    </>
  );
};

export default OpeningVerse;
