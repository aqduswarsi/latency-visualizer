"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HistoricalLatencyChart from "@/components/HistoricalLatencyChart";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
});

const exchangePairs = [
  { from: "Binance", to: "Coinbase" },
  { from: "Kraken", to: "Binance" },
  { from: "Bybit", to: "OKX" },
  { from: "Coinbase", to: "Kraken" },
  { from: "OKX", to: "Binance" },
];

export default function Home() {
  const [view, setView] = useState<"real-time" | "historical">("real-time");

  // Step 7 state for cycling
  const [pairIndex, setPairIndex] = useState(0);
  const [from, setFrom] = useState(exchangePairs[0].from);
  const [to, setTo] = useState(exchangePairs[0].to);
  const range = "1d";

  // Step 7: Cycle exchange pairs every 6 seconds
  useEffect(() => {
    if (view !== "historical") return;

    const interval = setInterval(() => {
      setPairIndex((prevIndex) => (prevIndex + 1) % exchangePairs.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [view]);

  // Update `from` and `to` when pairIndex changes
  useEffect(() => {
    setFrom(exchangePairs[pairIndex].from);
    setTo(exchangePairs[pairIndex].to);
  }, [pairIndex]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Toggle */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() =>
            setView((prev) =>
              prev === "real-time" ? "historical" : "real-time"
            )
          }
          className="px-4 py-2 bg-white text-black rounded-xl shadow-lg hover:bg-gray-200 transition"
        >
          {view === "real-time" ? "📊 Historical View" : "🌐 Real-Time View"}
        </button>
      </div>

      {/* Views with animation */}
      <AnimatePresence mode="wait">
        {view === "real-time" ? (
          <motion.div
            key="globe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Globe />
          </motion.div>
        ) : (
          <motion.div
            key="chart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white flex items-center justify-center p-4"
          >
            <HistoricalLatencyChart from={from} to={to} range={range} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}