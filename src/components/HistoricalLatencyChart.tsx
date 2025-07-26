'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export interface HistoricalLatencyChartProps {
  from: string;
  to: string;
  range: string;
  dark?: boolean;
}

type LatencyEntry = {
  date: string;
  latency: number;
};

const sampleLatencyData: Record<string, LatencyEntry[]> = {
  'Bybit → Deribit': [
    { date: '2023-01-01', latency: 120 },
    { date: '2023-01-02', latency: 100 },
    { date: '2023-01-03', latency: 110 },
    { date: '2023-01-04', latency: 90 },
    { date: '2023-01-05', latency: 130 },
  ],
  'Binance → OKX': [
    { date: '2023-01-01', latency: 80 },
    { date: '2023-01-02', latency: 95 },
    { date: '2023-01-03', latency: 100 },
    { date: '2023-01-04', latency: 85 },
    { date: '2023-01-05', latency: 90 },
  ],
};

const HistoricalLatencyChart: React.FC<HistoricalLatencyChartProps> = ({
  from,
  to,
  range,
  dark = false,
}) => {
  const pairs = Object.keys(sampleLatencyData);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pairs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [pairs.length]);

  const activePair = pairs[activeIndex];
  const data = sampleLatencyData[activePair];

  const backgroundColor = dark ? '#171717' : '#ffffff';
  const textColor = dark ? '#ffffff' : '#171717';
  const lineColor = '#ff0000';

  // Latency Stats
  const latencies = data.map((entry) => entry.latency);
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;

  return (
    <div
      className="w-full h-full p-4 rounded-xl shadow-md transition-colors duration-500"
      style={{ backgroundColor, color: textColor }}
    >
      <h2 className="text-xl font-semibold mb-2 text-center">
        Historical Latency: {activePair}
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePair}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#333' : '#ccc'} />
              <XAxis dataKey="date" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="latency"
                stroke={lineColor}
                strokeWidth={2}
                dot={{ fill: lineColor }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      {/* Stats Panel */}
      <div className="mt-4 text-sm text-center space-y-1">
        <p>📉 Min Latency: <span className="font-semibold">{minLatency} ms</span></p>
        <p>📈 Max Latency: <span className="font-semibold">{maxLatency} ms</span></p>
        <p>📊 Avg Latency: <span className="font-semibold">{avgLatency.toFixed(2)} ms</span></p>
      </div>
    </div>
  );
};

export default HistoricalLatencyChart;