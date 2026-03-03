/** @format */
import { motion, useInView, useMotionValue } from "motion/react";
import { useRef } from "react";

// Template animasi dasar untuk fade in
export const FadeIn = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi slide in dari bawah
export const SlideInUp = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi slide in dari atas
export const SlideInDown = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi slide in dari kiri
export const SlideInLeft = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi slide in dari kanan
export const SlideInRight = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi scale in
export const ScaleIn = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi bounce in
export const BounceIn = ({ children, delay = 0, duration = 0.8 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration,
      delay,
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

// Template animasi stagger untuk list
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// Template animasi untuk halaman penuh (seperti WelcomePage geser ke atas)
export const PageSlideUp = ({ children, isVisible, duration = 1 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: isVisible ? 0 : "-100%" }}
    transition={{ duration, ease: "easeInOut" }}
    className="fixed inset-0 z-50"
  >
    {children}
  </motion.div>
);

// Template animasi rotate in
export const RotateIn = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -180 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi flip in
export const FlipIn = ({ children, delay = 0, duration = 0.6 }) => (
  <motion.div
    initial={{ opacity: 0, rotateY: -90 }}
    animate={{ opacity: 1, rotateY: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Template animasi pulse (untuk efek attention)
export const Pulse = ({ children, repeat = Infinity }) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// Template animasi untuk hover effect
export const HoverLift = ({ children }) => (
  <motion.div
    whileHover={{ y: -10 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {children}
  </motion.div>
);

// Template animasi untuk button click
export const TapScale = ({ children }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.div>
);

// Template animasi untuk loading spinner
export const LoadingSpinner = ({ size = 40 }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    style={{
      width: size,
      height: size,
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #3498db",
      borderRadius: "50%",
    }}
  />
);

// Template animasi untuk progress bar
export const ProgressBar = ({ progress, width = "100%" }) => (
  <motion.div className="bg-gray-200 rounded-full h-2" style={{ width }}>
    <motion.div
      className="bg-blue-500 h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </motion.div>
);

// Template animasi untuk modal
export const ModalAnimation = ({ children, isOpen }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isOpen ? 1 : 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      {children}
    </motion.div>
  </motion.div>
);

// Template animasi untuk accordion
export const AccordionItem = ({ children, isOpen }) => (
  <motion.div
    initial={false}
    animate={{ height: isOpen ? "auto" : 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden"
  >
    {children}
  </motion.div>
);

// Template animasi untuk tooltip
export const TooltipAnimation = ({ children, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
    }}
    transition={{ duration: 0.2 }}
    className="absolute z-10 px-2 py-1 bg-black text-white text-sm rounded"
  >
    {children}
  </motion.div>
);

// Template animasi untuk card hover
export const CardHover = ({ children }) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    }}
    transition={{ type: "spring", stiffness: 300 }}
    className="cursor-pointer"
  >
    {children}
  </motion.div>
);

// Template animasi untuk text typing effect
export const TypingText = ({ text, delay = 0 }) => {
  const letters = text.split("");

  return (
    <div>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

// Template animasi untuk image reveal
export const ImageReveal = ({ src, alt, delay = 0 }) => (
  <motion.div
    initial={{ clipPath: "inset(0 100% 0 0)" }}
    animate={{ clipPath: "inset(0 0% 0 0)" }}
    transition={{ duration: 1, delay }}
    className="overflow-hidden"
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </motion.div>
);

// Template animasi untuk parallax effect (sederhana)
export const ParallaxElement = ({ children }) => {
  const y = useMotionValue(0);

  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  );
};

// Catatan: Untuk parallax yang lebih kompleks dengan scroll, gunakan useScroll dan useTransform

// Template animasi untuk scroll-triggered animation
export const ScrollReveal = ({ children, threshold = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
