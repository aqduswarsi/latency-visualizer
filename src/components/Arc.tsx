// components/Arc.tsx
"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface ArcProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
}

export default function Arc({ start, end, color = "#00ffff" }: ArcProps) {
  const curve = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.1); // Raised arc
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  const positions = useMemo(() => {
    return new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
  }, [points]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
}