"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TimeDisplay() {
  const [mounted, setMounted] = useState(false);
  const [timeInfo, setTimeInfo] = useState<{
    time: string;
    city: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const date = new Date();
      const time = date.toLocaleTimeString();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const city = timezone.split("/").pop()?.replace(/_/g, " ") ?? "";

      setTimeInfo({ time, city });
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Render nothing on SSR to avoid mismatches
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-sm"
    >
      {timeInfo?.time} {timeInfo?.city}
    </motion.div>
  );
}
