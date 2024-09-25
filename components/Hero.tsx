"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: Particle[] = [];
      const particleCount = 50;

      class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;

        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = 2;
          this.speedX = (Math.random() - 0.5) * 2;
          this.speedY = (Math.random() - 0.5) * 2;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
          if (ctx) {
            ctx.fillStyle = "#52B6FE";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      const init = () => {
        particles.length = 0; // Clear existing particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 123, 255, ${1 - distance / 100})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }

        requestAnimationFrame(animate);
      };

      init();
      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center relative z-10">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-500 block mb-2">Bring intelligence</span>
          <span className="text-white">to The Boring Paperwork</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl mb-10 sm:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We are the architects of smarter, safer, and secure AI Agents for
          enterprises. Flow into growth with Innosync AI.
        </motion.p>
        <motion.a
          href="https://www.linkedin.com/in/rohit-singh-647588137/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative inline-flex h-16 sm:h-18 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#018BF7_0%,#F9FAFB_50%,#018BF7_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-medium text-white backdrop-blur-3xl">
            Talk to an AI Expert
          </span>
        </motion.a>
      </div>
    </section>
  );
}
