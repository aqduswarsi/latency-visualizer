// src/components/HistoricalLatencyPanel.tsx
"use client";

import { useState } from "react";
import HistoricalLatencyChart from "./HistoricalLatencyChart";

const exchanges = ["Binance", "Coinbase", "Kraken", "Gemini", "Bitfinex"];
const ranges: ("1h" | "24h" | "7d" | "30d")[] = ["1h", "24h", "7d", "30d"];

export default function HistoricalLatencyPanel() {
  const [source, setSource] = useState("Binance");
  const [target, setTarget] = useState("Coinbase");
  const [range, setRange] = useState<"1h" | "24h" | "7d" | "30d">("1h");

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {exchanges.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            {exchanges.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Range</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
          >
            {ranges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <HistoricalLatencyChart from={source} to={target} range={range} />
    </div>
  );
}