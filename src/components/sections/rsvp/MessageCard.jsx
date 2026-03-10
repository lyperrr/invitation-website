/** @format */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { SlideInUp } from "@/lib/animations";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="space-y-0.5 min-w-0">
          <Typography
            variant="p"
            className="text-sm font-semibold text-foreground truncate mt-0"
          >
            {submission.name}
          </Typography>
          <div className="flex items-center justify-between">
            <Typography variant="muted" className="text-xs my-0!">
              {submission.timestamp}
            </Typography>
            <Badge
              variant="outline"
              className={[
                "shrink-0 flex items-center gap-1 text-[11px] font-medium my-0!",
                isHadir
                  ? "border-success bg-success/20 text-success"
                  : "border-destructive bg-destructive/20 text-destructive",
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
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs hover:bg-transparent text-accent/80 hover:text-accent font-medium transition-colors"
                >
                  {isExpanded ? "Sembunyikan" : "Lihat selengkapnya"}
                </Button>
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
