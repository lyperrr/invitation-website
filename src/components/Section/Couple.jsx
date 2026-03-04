/** @format */
import Typography from "../ui/typography";
import { Badge } from "../ui/badge";
import WaveShape3 from "../shapes/WaveShape3";
import Symbol from "@/assets/image/symbol.png";
// Import foto mempelai
import photoGroom from "@/assets/image/couple/Pengantin Laki-Laki.png"; // Ganti dengan path foto yang benar
import photoBride from "@/assets/image/couple/Pengantin Perempuan.png"; // Ganti dengan path foto yang benar

const Couple = () => {
  const CoupleData = [
    {
      photo: photoGroom,
      call_name: "Agus",
      long_name: "I Made Agus Pradnya",
      from_child: 2,
      parent_name: "I Made Bagus & I Nyoman Sari",
      address:
        "Jalan Raya Kediri No. 123, Desa Kediri, Kecamatan Kediri, Kabupaten Badung",
    },
    {
      photo: photoBride,
      call_name: "Mang ari",
      long_name: "Ni Komang Ari Anggreni",
      from_child: 3,
      parent_name: "I Made Anggreni & I Nyoman Sari",
      address:
        "Jalan Raya Kediri No. 123, Desa Kediri, Kecamatan Kediri, Kabupaten Badung",
    },
  ];
  return (
    <>
      <section className="py-10">
        <WaveShape3 rotate={true} />
        <div className="container py-10 pb-16 bg-potrait bg-cover bg-center">
          <div className="text-center">
            <Typography
              variant="h4"
              className="uppercase text-accent font-playfair tracking-widest"
            >
              Om Swastyastu
            </Typography>
            <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto" />
            <Typography className="text-sm!">
              Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan
              Yang Maha Esa kami bermaksud mengundang Bapak/Ibu/Saudara/i pada
              Upacara Manusa Yadnya Pawiwahan (Pernikahan) putra-putri kami.
            </Typography>{" "}
          </div>

          <div className="mt-10 flex flex-col">
            {CoupleData.map((couple, index) => (
              <div key={index} className="text-center">
                {/* Foto Mempelai */}
                <div className="flex justify-center mb-4">
                  <img
                    src={couple.photo}
                    alt={couple.call_name}
                    loading="lazy"
                    className="size-70 rounded-full object-cover shadow-lg"
                  />
                </div>

                {/* Data Diri Mempelai */}
                <Typography
                  variant="h1"
                  className="text-accent font-medium font-great-vibes mt-0!"
                >
                  {couple.call_name}
                </Typography>
                <Typography
                  variant="h4"
                  className="font-playfair font-medium mt-2! text-secondary"
                >
                  {couple.long_name}
                </Typography>
                {/* Line */}
                <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto mt-2" />
                <Typography className="text-sm mt-4!">
                  Anak ke-{couple.from_child} dari pasangan:
                </Typography>
                <Typography className="text-sm mt-2! font-medium">
                  {couple.parent_name}
                </Typography>
                {/* Line */}
                <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-secondary to-transparent mx-auto mt-2" />
                <Typography className="text-sm mt-2!">
                  {couple.address}
                </Typography>

                {/* Symbol pemisah (hanya di antara 2 mempelai, bukan di akhir) */}
                {index < CoupleData.length - 1 && (
                  <img
                    src={Symbol}
                    alt="Symbol &"
                    loading="lazy"
                    className="mx-auto my-6 w-20"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <WaveShape3 />{" "}
      </section>
    </>
  );
};

export default Couple;
