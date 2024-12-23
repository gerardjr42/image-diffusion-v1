"use client";

import { AuthButton } from "@/components/AuthButton";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Sphere } from "../components/sphere";
import { createDotPattern } from "../utils/pattern";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const updatePattern = () => {
      if (!canvasRef.current || !ctx) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      createDotPattern(ctx, window.innerWidth, window.innerHeight);
    };

    updatePattern();
    window.addEventListener("resize", updatePattern);
    return () => window.removeEventListener("resize", updatePattern);
  }, []);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
      />

      <header className="fixed w-full z-50 px-8 py-6">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-light tracking-widest"
          >
            Monolith-AI
          </motion.div>

          <div className="flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-sm"
            >
              {time}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex space-x-6 text-sm"
            >
              <AuthButton />
            </motion.div>
          </div>
        </nav>
      </header>

      <main>
        <section className="min-h-screen flex items-center relative px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-light leading-tight">
              Transform <span className="italic">words</span> into visual
              <br />
              masterpieces through the
              <br />
              monolith&apos;s <span className="italic">enigmatic power</span>
            </h1>
          </motion.div>
          <Sphere />
        </section>

        <section className="min-h-screen flex items-center px-8 relative">
          <div className="grid grid-cols-2 gap-16 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-light">Our Technology</h2>
              <p className="text-lg text-muted-foreground">
                Monolith-AI harnesses the power of the latest image diffusion
                FLUX model, coupled with NVIDIA&apos;s cutting-edge H100 GPUs.
                This combination allows us to transform text into stunning,
                high-definition images with unparalleled speed and quality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-light">Our Process</h2>
              <p className="text-lg text-muted-foreground">
                Simply input your text, and watch as our advanced AI interprets
                and visualizes your words. Leveraging the FLUX model&apos;s deep
                understanding of language and imagery, combined with the raw
                computational power of the H100 GPU, we deliver breathtaking
                results in seconds.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full px-8 py-6 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-between items-center text-sm"
        >
          <span className="ml-10 text-foreground">© 2024 Monolith-AI</span>
        </motion.div>
      </footer>
    </div>
  );
}
