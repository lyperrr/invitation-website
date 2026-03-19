/** @format */
import Typography from "../ui/typography";
import { Badge } from "../ui/badge";
import WaveShape3 from "../shapes/WaveShape3";
import Symbol from "@/assets/image/symbol.png";
import {
  ScrollReveal,
  ScrollRevealRotate,
  StaggerContainer,
  StaggerItem,
  FadeIn,
  SlideInDown,
  ScaleIn,
  BounceIn,
  SlideInLeft,
  RotateIn,
} from "../../lib/animations";
// Import foto mempelai
import photoGroom from "@/assets/image/couple/Pengantin Laki-Laki.png"; // Ganti dengan path foto yang benar
import photoBride from "@/assets/image/couple/Pengantin Perempuan.png"; // Ganti dengan path foto yang benar
import portraitWallpaper from "@/assets/image/potrait-wallpaper.png";

const Couple = () => {
  const CoupleData = [
    {
      photo: photoGroom,
      call_name: "Agus",
      long_name: "Kadek Agus Pradnya Dwiarta",
      from_child: 2,
      parent_name: "I Ketut Sandra & Ni Wayan Lesmiyanti.SE",
      address: "Br. Lebah, Desa Tista, Kerambitan, Tabanan",
    },
    {
      photo: photoBride,
      call_name: "Mang Ari",
      long_name: "Ni Komang Ari Anggreni",
      from_child: 3,
      parent_name: "I Wayan Muja & Ni Made Wiyastri",
      address: "Br. Juntal, Desa Kaba-kaba, Kediri, Tabanan",
    },
  ];
  return (
    <>
      <section className="pt-10">
        <WaveShape3 rotate={true} />
        <div
          className="container py-10 pb-16 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, var(--color-primary) 0%, transparent 25%, transparent 75%, var(--color-primary) 100%), url(${portraitWallpaper})`,
          }}
        >
          <StaggerContainer staggerDelay={0.4}>
            <StaggerItem>
              <ScrollReveal>
                <div className="text-center">
                  <FadeIn>
                    <Typography
                      variant="h4"
                      className="uppercase text-accent font-playfair tracking-widest"
                    >
                      Om Swastyastu
                    </Typography>
                  </FadeIn>
                  <SlideInDown delay={0.2}>
                    <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto" />
                  </SlideInDown>
                  <FadeIn delay={0.4}>
                    <Typography className="text-sm!">
                      Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi
                      Wasa/Tuhan Yang Maha Esa kami bermaksud mengundang
                      Bapak/Ibu/Saudara/i pada Upacara Manusa Yadnya Pawiwahan
                      (Pernikahan) putra-putri kami.
                    </Typography>
                  </FadeIn>
                </div>
              </ScrollReveal>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 flex flex-col">
                {CoupleData.map((couple, index) => (
                  <div key={index} className="text-center">
                    {/* Foto Mempelai */}
                    <ScrollReveal threshold={0.3}>
                      <div className="flex justify-center mb-4">
                        <ScaleIn>
                          <img
                            src={couple.photo}
                            alt={couple.call_name}
                            loading="lazy"
                            className="size-70 rounded-full object-cover shadow-lg"
                          />
                        </ScaleIn>
                      </div>
                    </ScrollReveal>

                    {/* Data Diri Mempelai */}
                    <ScrollReveal threshold={0.3}>
                      <BounceIn>
                        <Typography
                          variant="h1"
                          className="text-accent font-medium font-great-vibes mt-0!"
                        >
                          {couple.call_name}
                        </Typography>
                      </BounceIn>
                    </ScrollReveal>

                    <ScrollReveal threshold={0.3}>
                      <SlideInLeft>
                        <Typography
                          variant="h4"
                          className="font-playfair font-medium mt-2! text-secondary"
                        >
                          {couple.long_name}
                        </Typography>
                      </SlideInLeft>
                    </ScrollReveal>

                    {/* Line */}
                    <ScrollReveal threshold={0.3}>
                      <FadeIn>
                        <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto mt-2" />
                      </FadeIn>
                    </ScrollReveal>

                    <ScrollReveal threshold={0.3}>
                      <FadeIn>
                        <Typography className="text-sm mt-4!">
                          Anak ke-{couple.from_child} dari pasangan:
                        </Typography>
                      </FadeIn>
                    </ScrollReveal>

                    <ScrollReveal threshold={0.3}>
                      <FadeIn>
                        <Typography className="text-sm mt-2! font-medium">
                          {couple.parent_name}
                        </Typography>
                      </FadeIn>
                    </ScrollReveal>

                    {/* Line */}
                    <ScrollReveal threshold={0.3}>
                      <FadeIn>
                        <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-secondary to-transparent mx-auto mt-2" />
                      </FadeIn>
                    </ScrollReveal>

                    <ScrollReveal threshold={0.3}>
                      <FadeIn>
                        <Typography className="text-sm mt-2!">
                          {couple.address}
                        </Typography>
                      </FadeIn>
                    </ScrollReveal>

                    {/* Symbol pemisah (hanya di antara 2 mempelai, bukan di akhir) */}
                    {index < CoupleData.length - 1 && (
                      <ScrollRevealRotate threshold={0.3}>
                        <img
                          src={Symbol}
                          alt="Symbol &"
                          loading="lazy"
                          className="mx-auto my-6 w-20"
                        />
                      </ScrollRevealRotate>
                    )}
                  </div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </>
  );
};

export default Couple;
