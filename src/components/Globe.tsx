"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

import CloudRegions from "./CloudRegions";
import Pin from "./Pin";
import Arc from "./Arc";
import AnimatedArc from "./AnimatedArc";
import { latLongToVector3 } from "../utils/latlong";
import { exchanges } from "../data/exchangeData";

// 🟢 Latency-based color logic
const getLatencyColor = (latency: number) => {
  if (latency < 80) return "#00ff00"; // Green
  if (latency < 140) return "#ffff00"; // Yellow
  return "#ff0000"; // Red
};

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const colorMap = useLoader(TextureLoader, "/textures/earthColorMap.jpg");

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

// 🎯 Mock latency
const getMockLatency = (i: number, j: number) => {
  const seed = (i + 1) * (j + 1);
  return 50 + (seed % 5) * 30;
};

export default function Globe() {
  const [visibleProviders, setVisibleProviders] = useState({
    AWS: true,
    GCP: true,
    Azure: true,
  });

  const toggleProvider = (provider: "AWS" | "GCP" | "Azure") => {
    setVisibleProviders((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* ✅ Toggle UI */}
      <div className="absolute top-4 left-4 z-20 bg-black/70 p-3 rounded-xl text-white text-sm shadow-lg max-w-[180px]">
        <div className="font-semibold mb-2">Toggle Providers</div>
        {(["AWS", "GCP", "Azure"] as const).map((provider) => (
          <label key={provider} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={visibleProviders[provider]}
              onChange={() => toggleProvider(provider)}
              className="mr-2 accent-blue-500"
            />
            {provider}
          </label>
        ))}
      </div>

      {/* 🌍 3D Globe Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ height: "100vh", width: "100vw", background: "black" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Earth />

          {/* 📍 Exchange Pins */}
          {exchanges.map((exchange, idx) => (
            <Pin
              key={`pin-${idx}`}
              position={latLongToVector3(exchange.latitude, exchange.longitude)}
              label={exchange.name}
            />
          ))}

          {/* 🔁 Arcs + Packets */}
          {exchanges.flatMap((source, i) =>
            exchanges.map((target, j) => {
              if (i === j) return null;
              const latency = getMockLatency(i, j);
              const color = getLatencyColor(latency);

              return [
                <Arc
                  key={`arc-${i}-${j}`}
                  start={latLongToVector3(source.latitude, source.longitude)}
                  end={latLongToVector3(target.latitude, target.longitude)}
                  color={color}
                />,
                <AnimatedArc
                  key={`packet-${i}-${j}`}
                  startLat={source.latitude}
                  startLon={source.longitude}
                  endLat={target.latitude}
                  endLon={target.longitude}
                  latencyMs={latency}
                />,
              ];
            })
          )}

          <Stars radius={100} depth={50} count={5000} factor={4} />
          <CloudRegions visibleProviders={visibleProviders} />
          <OrbitControls
            makeDefault
            target={[0, 0, 0]}
            enableZoom
            enableRotate
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
