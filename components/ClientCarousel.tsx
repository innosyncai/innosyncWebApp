'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  { name: "Zoop", logo: "/Zoop.png" },
  { name: "Haleon", logo: "/haleon-logo-2.png" },
  { name: "Citywide Global", logo: "/citywide.png" },
  { name: "My Next Film", logo: "/MNF.png" },
  { name: "My Next Film", logo: "/mnf2.png" },
];

export default function ClientCarousel() {
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorPressed, setIsCursorPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    document.body.setAttribute("data-custom-cursor", "carousel");
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsDragging(false);
    setIsCursorPressed(false);
    document.body.removeAttribute("data-custom-cursor");
    startAutoScroll();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsCursorPressed(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsCursorPressed(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isHovering) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
      handleInfiniteScroll();
    }
  };

  const startAutoScroll = () => {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1; // Adjust speed as needed
        handleInfiniteScroll();
      }
    }, 20); // Adjust interval for smoother or faster scrolling
    setAutoScrollInterval(interval);
  };

  const handleInfiniteScroll = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      
      if (carousel.scrollLeft >= scrollWidth - clientWidth - 1) {
        carousel.scrollLeft -= scrollWidth / 3;
      } else if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft += scrollWidth / 3;
      }
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <div className="relative overflow-hidden py-8 bg-gray-100 w-full">
      <div
        ref={carouselRef}
        className="flex items-center space-x-8 overflow-x-scroll scrollbar-hide select-none"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: "none" }}
      >
        {[...clients, ...clients, ...clients].map((client, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={150}
              height={50}
              objectFit="contain"
              draggable={false}
              style={{ pointerEvents: "none" }}
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-100 to-transparent w-20" />
      <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-100 to-transparent w-20" />
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: `translate(-50%, -50%) scale(${
              isCursorPressed ? 0.8 : 1
            })`,
            transition: "transform 0.1s",
          }}
        >
          <Image
            src="/carousel-cursor.png"
            alt="Cursor"
            width={58}
            height={58}
            objectFit="contain"
          />
        </div>
      )}
    </div>
  );
}
