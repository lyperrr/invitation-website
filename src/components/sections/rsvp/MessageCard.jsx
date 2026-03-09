/** @format */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { SlideInUp } from "@/lib/animations";
import { CheckCircle2, XCircle } from "lucide-react";

export default function MessageCard({ submission, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHadir = submission.attendance === "hadir";
  const needsExpansion = submission.message && submission.message.length > 150;

  // Format jumlah tamu: hapus underscore dan ganti dengan spasi
  const formattedGuests = submission.guests
    ? submission.guests.toString().replace(/_/g, " ")
    : "";

  return (
    <SlideInUp delay={index * 0.05} duration={0.35}>
      <div className="rounded-md border bg-card p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <Typography
              variant="p"
              className="text-sm font-semibold text-foreground truncate mt-0"
            >
              {submission.name}
            </Typography>
            <Typography variant="muted" className="text-xs mt-0">
              {submission.timestamp}
            </Typography>
          </div>
          <Badge
            variant="outline"
            className={[
              "shrink-0 flex items-center gap-1 text-[11px] font-medium",
              isHadir
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700",
            ].join(" ")}
          >
            {isHadir ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <XCircle className="h-3 w-3" />
            )}
            {isHadir
              ? `Hadir${formattedGuests ? ` · ${formattedGuests}` : ""}`
              : "Tidak Hadir"}
          </Badge>
        </div>

        <Separator />
        <div className="space-y-1.5">
          {submission.message &&
          submission.message.trim() !== "" &&
          submission.message !== "-" ? (
            <>
              <Typography
                variant="p"
                className={[
                  "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words mt-0",
                  !isExpanded && needsExpansion && "line-clamp-3",
                ].join(" ")}
              >
                &ldquo;{submission.message}&rdquo;
              </Typography>
              {needsExpansion && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  {isExpanded ? "Sembunyikan" : "Lihat selengkapnya"}
                </button>
              )}
            </>
          ) : (
            <Typography variant="muted" className="text-sm italic mt-0">
              Tidak ada pesan
            </Typography>
          )}
        </div>
      </div>
    </SlideInUp>
  );
}
