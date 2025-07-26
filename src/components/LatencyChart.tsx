'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

type LatencyPoint = {
  timestamp: string;
  latency: number;
};

type HistoricalLatencyChartProps = {
  source: string;
  target: string;
  range: '1h' | '24h' | '7d' | '30d';
};

const generateMockLatencyData = (range: '1h' | '24h' | '7d' | '30d'): LatencyPoint[] => {
  const now = new Date();
  const data: LatencyPoint[] = [];

  const points = {
    '1h': 60,
    '24h': 24,
    '7d': 7,
    '30d': 30,
  }[range];

  for (let i = 0; i < points; i++) {
    const timestamp = new Date(now.getTime() - i * (range === '1h' ? 60000 : 3600000)).toISOString();
    data.unshift({
      timestamp,
      latency: Math.floor(Math.random() * 200) + 20,
    });
  }

  return data;
};

export default function HistoricalLatencyChart({ source, target, range }: HistoricalLatencyChartProps) {
  const [data, setData] = useState<LatencyPoint[]>([]);

  useEffect(() => {
    setData(generateMockLatencyData(range));
  }, [range]);

  const latencies = data.map(d => d.latency);
  const min = Math.min(...latencies);
  const max = Math.max(...latencies);
  const avg = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Latency: {source} → {target}</h3>
      <div className="text-sm mb-2 text-gray-500">Min: {min}ms | Max: {max}ms | Avg: {avg}ms</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}