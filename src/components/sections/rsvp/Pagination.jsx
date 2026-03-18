/** @format */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
}) {
  const [isInputVisible, setIsInputVisible] = useState(null);
  const [jumpValue, setJumpValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isInputVisible !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if total <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handleEllipsisClick = (index) => {
    setIsInputVisible(index);
    setJumpValue("");
  };

  const handleInputSubmit = () => {
    const page = parseInt(jumpValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setIsInputVisible(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
    if (e.key === "Escape") {
      setIsInputVisible(null);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={currentPage === 1}
        className="size-8 p-0 bg-primary-foreground text-secondary-foreground border-secondary hover:bg-secondary/80 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            if (isInputVisible === index) {
              return (
                <div key={`ellipsis-input-${index}`} className="w-10">
                  <Input
                    ref={inputRef}
                    type="number"
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value)}
                    onBlur={handleInputSubmit}
                    onKeyDown={handleKeyDown}
                    className="h-8 px-1 text-center text-xs w-full bg-white text-black font-medium"
                    min={1}
                    max={totalPages}
                  />
                </div>
              );
            }
            return (
              <Button
                key={`ellipsis-${index}`}
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-secondary/40 hover:text-secondary hover:bg-black/5 rounded-full"
                onClick={() => handleEllipsisClick(index)}
                title="Jump to page"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={[
                "size-8 p-0 text-xs",
                currentPage === page
                  ? "bg-accent hover:bg-accent/80"
                  : "bg-primary/70 text-secondary hover:text-secondary hover:bg-primary/80",
              ].join(" ")}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="size-8 p-0 bg-primary-foreground text-secondary-foreground border-secondary hover:bg-secondary/80 disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
