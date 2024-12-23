"use client";

import Feed from "@/components/Feed";
import { PostProvider } from "@/context/PostContext";
import { createDotPattern } from "@/utils/pattern";
import { useEffect, useRef } from "react";

export default function FeedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <div className="min-h-screen relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
      />
      <PostProvider>
        <main className="relative z-10 min-h-screen py-4">
          <Feed />
        </main>
      </PostProvider>
    </div>
  );
}
