/** @format */

import { CheckCircle2 } from "lucide-react";

export default function SuccessToast() {
  return (
    <div className="flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
      <span>Terima kasih! Ucapan Anda telah berhasil dikirim.</span>
    </div>
  );
}
