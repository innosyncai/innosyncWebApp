'use client';

import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('black');
  const [isOverShowreel, setIsOverShowreel] = useState(false);
  const [isOverCarousel, setIsOverCarousel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        setColor(getOppositeColor(bgColor));
        setIsOverShowreel(element.closest('[data-custom-cursor="showreel"]') !== null);
        setIsOverCarousel(element.closest('[data-custom-cursor="carousel"]') !== null);
      }
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, [isMobile]);

  const getOppositeColor = (rgbColor: string) => {
    const rgb = rgbColor.match(/\d+/g);
    if (rgb) {
      const [r, g, b] = rgb.map(Number);
      return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    }
    return 'white';
  };

  if (isMobile || isOverShowreel || isOverCarousel) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: color,
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default CustomCursor;