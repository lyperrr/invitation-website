/** @format */

import { motion as Motion, AnimatePresence } from "motion/react";
import { Button } from "../../ui/button";
import Typography from "../../ui/typography";
import { X, Download } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../ui/carousel";

/**
 * ImageModal Component
 * Modal carousel dengan zoom dan pan functionality
 */
const ImageModal = ({
  isOpen,
  selectedIndex,
  images,
  zoom,
  position,
  isDragging,
  onClose,
  onPrevious,
  onNext,
  onDownload,
  onWheel,
  onMouseDown,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  if (!isOpen || selectedIndex === null) return null;

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    onDownload(images[selectedIndex], selectedIndex);
  };

  const handlePreviousClick = (e) => {
    e.stopPropagation();
    onPrevious();
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    onNext();
  };

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Download & Close Buttons */}
        <div className="absolute space-x-4 top-4 right-4 z-50 *:size-12 *:cursor-pointer *:rounded-full">
          <Button onClick={handleDownloadClick} variant="secondary">
            <Download size={20} />
          </Button>
          <Button onClick={onClose} variant="secondary">
            <X size={16} />
          </Button>
        </div>

        {/* Carousel */}
        <Carousel className="w-full max-w-4xl">
          <CarouselPrevious onClick={handlePreviousClick} />
          <CarouselNext onClick={handleNextClick} />

          <CarouselContent>
            <CarouselItem
              onClick={(e) => e.stopPropagation()}
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="cursor-move touch-none"
            >
              <Motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center overflow-hidden"
              >
                <img
                  src={images[selectedIndex]}
                  alt={`Gallery ${selectedIndex + 1}`}
                  className="max-h-[85vh] w-auto max-w-full rounded-lg shadow-2xl object-contain select-none"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transition: isDragging ? "none" : "transform 0.2s ease-out",
                    cursor:
                      zoom > 1
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                  loading="lazy"
                  onMouseDown={onMouseDown}
                  draggable={false}
                />
              </Motion.div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {/* Image Counter & Zoom Level */}
        <div className="absolute flex items-center gap-2 bottom-4 lg:bottom-2 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
          <Typography className="text-sm font-medium text-primary">
            {selectedIndex + 1} / {images.length}
          </Typography>
          {zoom > 1 && (
            <Typography className="text-sm font-medium text-primary mt-0!">
              <span className="text-accent">{Math.round(zoom * 100)}%</span>
            </Typography>
          )}
        </div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
