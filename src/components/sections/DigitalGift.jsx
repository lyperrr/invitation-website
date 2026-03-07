/** @format */
import { useState, useRef } from "react";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
} from "../../lib/animations";

function Chip() {
  return (
    <div
      className="w-10 h-7 rounded-md relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--accent) 0%, var(--accent) 40%, var(--accent) 70%, var(--accent) 100%)",
      }}
    >
      <div className="absolute top-1/2 left-0 right-0 h-px bg-black/25 -translate-y-1/2" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/20 -translate-x-1/2" />
    </div>
  );
}

function NetworkLogo() {
  return (
    <div className="flex items-center">
      <div
        className="w-6 h-6 rounded-full z-10"
        style={{ background: "var(--accent)", opacity: 0.85 }}
      />
      <div
        className="w-6 h-6 rounded-full -ml-2.5"
        style={{ background: "var(--accent)", opacity: 0.5 }}
      />
    </div>
  );
}

function CornerFiligree({ flip }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 60 60"
      fill="none"
      className={`absolute opacity-[0.12] ${flip ? "bottom-4 right-4 rotate-180" : "top-4 left-4"}`}
    >
      <path
        d="M2 2 L2 30 Q2 58 30 58"
        className="stroke-accent"
        strokeWidth="1"
      />
      <path
        d="M2 2 L30 2 Q58 2 58 30"
        className="stroke-accent"
        strokeWidth="1"
      />
      <circle cx="2" cy="2" r="2" className="fill-accent" />
      <path
        d="M10 2 Q10 10 2 10"
        className="stroke-accent"
        strokeWidth="0.7"
        opacity="0.6"
      />
    </svg>
  );
}

function BankCard({ bankName, accountDisplay, holderName }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 4;
    const cy = rect.top + rect.height / 4;
    const rx = ((e.clientY - cy) / rect.height) * 14;
    const ry = -((e.clientX - cx) / rect.width) * 20;
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      className="relative w-full max-w-95 h-60 rounded-[18px] overflow-hidden cursor-pointer select-none mx-auto"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.1437 0.0109 294.39) 0%, oklch(0.145 0 0) 50%, oklch(0.1 0 0) 100%)",
        border: "2px solid var(--accent)",
      }}
    >
      {/* Sheen overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, oklch(0.8184 0.1529 72.8 / 0.06) 48%, oklch(0.8184 0.1529 72.8 / 0.10) 50%, oklch(0.8184 0.1529 72.8 / 0.06) 52%, transparent 70%)",
        }}
      />

      {/* Corner filigrees */}
      <CornerFiligree flip={false} />
      <CornerFiligree flip={true} />

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-7">
        {/* Top */}
        <div className="flex justify-between items-start">
          <Typography
            className="text-secondary/80 italic tracking-wider"
            style={{ fontSize: "15px" }}
          >
            Hadiah Digital
          </Typography>
          <Chip />
        </div>

        {/* Card number */}
        <div
          className="flex gap-5 tracking-[0.22em] font-montserrat font-light text-secondary"
          style={{ fontSize: "18px" }}
        >
          {accountDisplay.split(" ").map((part, idx) => (
            <span
              key={idx}
              className={idx % 2 === 0 ? "opacity-90" : "opacity-45"}
            >
              {part}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-end">
          <div>
            <Typography
              className="text-accent/60 uppercase tracking-widest mb-1"
              style={{ fontSize: "8px" }}
            >
              Atas Nama
            </Typography>
            <Typography
              className="text-secondary tracking-wider font-playfair"
              style={{ fontSize: "15px" }}
            >
              {holderName}
            </Typography>
          </div>

          <div className="text-right">
            <Typography
              className="text-accent/60 uppercase tracking-widest mb-1"
              style={{ fontSize: "8px" }}
            >
              {bankName}
            </Typography>
          </div>

          <NetworkLogo />
        </div>
      </div>
    </div>
  );
}

const DigitalGift = () => {
  const giftData = {
    title: "Hadiah Digital",
    message:
      "Doa restu Anda adalah karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.",
    bankAccounts: [
      {
        id: 1,
        bankName: "Bank Mandiri",
        accountNumber: "1234567890123",
        accountDisplay: "1234 5678 9012 3",
        holderName: "I Made Agus Pradnya",
      },
      {
        id: 2,
        bankName: "Bank BCA",
        accountNumber: "9876543210987",
        accountDisplay: "9876 5432 1098 7",
        holderName: "Ni Komang Ari Anggreni",
      },
    ],
  };

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (accountNumber, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <ScrollReveal threshold={0.3}>
          <StaggerContainer staggerDelay={0.2}>
            {/* Header */}
            <StaggerItem>
              <div className="text-center mb-12">
                <Typography
                  variant="h2"
                  className="text-accent font-playfair tracking-widest"
                >
                  {giftData.title}
                </Typography>
                <div className="h-0.5 w-1/2 bg-linear-90 from-transparent via-accent to-transparent mx-auto my-4" />
                <Typography className="text-center max-w-2xl mx-auto text-sm text-primary">
                  {giftData.message}
                </Typography>
              </div>
            </StaggerItem>

            {/* Bank Cards */}
            <div className="max-w-2xl mx-auto space-y-8">
              {giftData.bankAccounts.map((bank) => (
                <StaggerItem key={bank.id}>
                  <div className="space-y-4">
                    {/* Card */}
                    <BankCard
                      bankName={bank.bankName}
                      accountNumber={bank.accountNumber}
                      accountDisplay={bank.accountDisplay}
                      holderName={bank.holderName}
                    />

                    {/* Info Panel */}
                    <div className="rounded-lg overflow-hidden border border-accent/20 bg-primary/40 backdrop-blur-sm max-w-95 mx-auto">
                      <div className="flex justify-between items-center px-5 py-3">
                        <Typography className="text-secondary font-montserrat font-light tracking-wider">
                          {bank.accountDisplay}
                        </Typography>
                        <Button
                          onClick={() =>
                            handleCopy(bank.accountNumber, bank.id)
                          }
                        >
                          {copiedId === bank.id ? (
                            <>
                              <Check size={16} />
                              Tersalin
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              Salin
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>

            {/* Footer Message */}
            <StaggerItem>
              <div className="text-center mt-5">
                <div className="h-0.5 w-1/3 bg-linear-90 from-transparent via-accent to-transparent mx-auto mb-4" />
                <Typography className="text-sm italic text-primary/70">
                  Terima kasih atas perhatian dan doa restunya
                </Typography>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DigitalGift;
