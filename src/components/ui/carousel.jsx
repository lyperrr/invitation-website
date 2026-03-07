/** @format */

import * as React from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Carousel = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={`relative ${className || ""}`} {...props}>
      {children}
    </div>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`overflow-hidden ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`min-w-0 shrink-0 grow-0 basis-full ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(
  ({ className, onClick, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-lg transition-all hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(
  ({ className, onClick, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-lg transition-all hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

const CarouselClose = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-lg transition-all hover:bg-white hover:scale-110 ${className || ""}`}
        onClick={onClick}
        {...props}
      >
        <X className="h-6 w-6" />
      </button>
    );
  },
);
CarouselClose.displayName = "CarouselClose";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselClose,
};
