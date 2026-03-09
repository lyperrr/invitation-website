/** @format */

import Typography from "../../ui/typography";
import { Button } from "../../ui/button";
import { Copy, Check } from "lucide-react";

/**
 * AccountInfo Component
 * Panel info dengan nomor rekening dan tombol copy
 */
export default function AccountInfo({
  accountDisplay,
  accountNumber,
  bankId,
  copiedId,
  onCopy,
}) {
  const isCopied = copiedId === bankId;

  return (
    <div className="rounded-lg overflow-hidden border border-accent/20 bg-primary/40 backdrop-blur-sm max-w-95 mx-auto">
      <div className="flex justify-between items-center px-5 py-3">
        <Typography className="text-secondary font-montserrat font-light tracking-wider">
          {accountDisplay}
        </Typography>
        <Button onClick={() => onCopy(accountNumber, bankId)}>
          {isCopied ? (
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
  );
}
