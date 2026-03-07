/** @format */

import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { X, Download } from "lucide-react";
import WaveShape4 from "../shapes/WaveShape4";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselClose,
} from "../ui/carousel";
import gallery1 from "@/assets/image/gallery/gallery (1).jpg";
import gallery2 from "@/assets/image/gallery/gallery (2).jpg";
import gallery3 from "@/assets/image/gallery/gallery (3).jpg";
import gallery4 from "@/assets/image/gallery/gallery (4).jpg";
import gallery5 from "@/assets/image/gallery/gallery (5).jpg";
import gallery6 from "@/assets/image/gallery/gallery (6).jpg";
import gallery7 from "@/assets/image/gallery/gallery (7).jpg";
import gallery8 from "@/assets/image/gallery/gallery (8).jpg";
import gallery9 from "@/assets/image/gallery/gallery (9).jpg";
import gallery10 from "@/assets/image/gallery/gallery (10).jpg";
import gallery11 from "@/assets/image/gallery/gallery (11).jpg";
import gallery12 from "@/assets/image/gallery/gallery (12).jpg";
import gallery13 from "@/assets/image/gallery/gallery (13).jpg";
import gallery14 from "@/assets/image/gallery/gallery (14).jpg";
import gallery15 from "@/assets/image/gallery/gallery (15).jpg";
import gallery16 from "@/assets/image/gallery/gallery (16).jpg";
import gallery17 from "@/assets/image/gallery/gallery (17).jpg";
import gallery18 from "@/assets/image/gallery/gallery (18).jpg";
import gallery19 from "@/assets/image/gallery/gallery (19).jpg";
import gallery20 from "@/assets/image/gallery/gallery (20).jpg";
import gallery21 from "@/assets/image/gallery/gallery (21).jpg";
import gallery22 from "@/assets/image/gallery/gallery (22).jpg";
import gallery23 from "@/assets/image/gallery/gallery (23).jpg";
import gallery24 from "@/assets/image/gallery/gallery (24).jpg";
import gallery25 from "@/assets/image/gallery/gallery (25).jpg";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);

  const galleryImages = [
    gallery17,
    gallery4,
    gallery22,
    gallery9,
    gallery1,
    gallery13,
    gallery25,
    gallery6,
    gallery19,
    gallery3,
    gallery14,
    gallery8,
    gallery21,
    gallery11,
    gallery2,
    gallery24,
    gallery7,
    gallery16,
    gallery10,
    gallery5,
    gallery23,
    gallery12,
    gallery20,
    gallery15,
    gallery18,
  ];

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 10);
  const hasMoreImages = galleryImages.length > 10;

  const handlePrevious = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(1, zoom + delta), 4);

    setZoom(newZoom);

    // Reset position when zoom is 1
    if (newZoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && zoom > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, zoom]);

  // Touch handlers for mobile
  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getDistance(e.touches);
      setInitialDistance(distance);
      setInitialZoom(zoom);
    } else if (e.touches.length === 1 && zoom > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getDistance(e.touches);
      const scale = distance / initialDistance;
      const newZoom = Math.min(Math.max(1, initialZoom * scale), 4);
      setZoom(newZoom);

      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialDistance(0);
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    const imageUrl = galleryImages[selectedImageIndex];
    const fileName = `gallery-${selectedImageIndex + 1}.jpg`;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <section>
        <WaveShape4 rotate={true} fillColors="fill-primary/5" />
        <div className="container bg-primary/5 py-5">
          <Typography
            variant="h5"
            className="text-center font-medium uppercase tracking-[0.35em] sm:tracking-[0.45em] text-accent mb-8"
          >
            Foto Galeri
          </Typography>

          {/* Pinterest Layout */}
          <div className="columns-2 md:columns-3 lg:columns-2 gap-2 space-y-2">
            {displayedImages.map((image, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full object-cover transition duration-300 brightness-75 group-hover:scale-105 group-hover:brightness-100"
                />
              </Motion.div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMoreImages && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="ghost"
                className="hover:bg-transparent hover:underline text-accent!"
              >
                {showAll
                  ? "Tampilkan Lebih Sedikit"
                  : `Lihat ${galleryImages.length - 10} Foto Lainnya`}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal Carousel */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleClose}
          >
            {/* Download Button */}
            <div className="absolute space-x-4 top-4 right-4 z-50 *:size-12 *:cursor-pointer *:rounded-full">
              <Button onClick={handleDownload} variant="secondary">
                <Download size={20} />
              </Button>

              {/* Close Button - Outside Carousel */}
              <Button onClick={handleClose} variant="secondary">
                <X size={16} />
              </Button>
            </div>

            <Carousel className="w-full max-w-4xl">
              <CarouselPrevious onClick={handlePrevious} />
              <CarouselNext onClick={handleNext} />

              <CarouselContent>
                <CarouselItem
                  onClick={(e) => e.stopPropagation()}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="cursor-move touch-none"
                >
                  <Motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={galleryImages[selectedImageIndex]}
                      alt={`Gallery ${selectedImageIndex + 1}`}
                      className="max-h-[85vh] w-auto max-w-full rounded-lg shadow-2xl object-contain select-none"
                      style={{
                        transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                        transition: isDragging
                          ? "none"
                          : "transform 0.2s ease-out",
                        cursor:
                          zoom > 1
                            ? isDragging
                              ? "grabbing"
                              : "grab"
                            : "default",
                      }}
                      loading="lazy"
                      onMouseDown={handleMouseDown}
                      draggable={false}
                    />
                  </Motion.div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            {/* Image Counter */}
            <div className="absolute flex items-center gap-2 bottom-4 lg:bottom-2 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <Typography className="text-sm font-medium text-primary">
                {selectedImageIndex + 1} / {galleryImages.length}
              </Typography>
              {zoom > 1 && (
                <Typography className="text-sm font-medium text-primary mt-0!">
                  <span className="text-accent">{Math.round(zoom * 100)}%</span>
                </Typography>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
