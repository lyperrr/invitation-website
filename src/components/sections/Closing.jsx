/** @format */
import Typography from "../ui/typography";
import WaveShape6 from "../shapes/WaveShape6";
const Closing = () => {
  const Data = {
    couple_name: "Agus & Mang ari",
    closing_message:
      "Kehadiran dan doa restu Anda merupakan kebahagiaan yang sangat berarti bagi kami. Terima kasih telah menjadi bagian dari hari istimewa kami.",
  };
  return (
    <>
      <section className="min-h-screen bg-closing bg-center bg-cover bg-no-repeat relative mt-">
        <WaveShape6 fillColors="fill-background" />
        <div className="container flex items-end justify-center min-h-screen">
          {/* Information */}
          <div className="flex flex-col items-center w-full justify-center z-20 *:text-secondary text-center space-y-4 pb-10">
            <Typography
              variant="h1"
              className="font-great-vibes font-medium text-5xl"
            >
              {Data.couple_name}
            </Typography>
            <Typography className="text-sm md:max-w-md lg:max-w-full leading-relaxed">
              {Data.closing_message}
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default Closing;
