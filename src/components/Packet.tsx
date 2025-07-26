// src/components/Packet.tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; // ✅ Import THREE namespace
import { latLongToVector3 } from "../utils/latlong";

interface PacketProps {
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  latencyMs: number;
}

export default function Packet({
  startLat,
  startLon,
  endLat,
  endLon,
  latencyMs,
}: PacketProps) {
  const pointRef = useRef<THREE.Mesh>(null);

  const startVec = latLongToVector3(startLat, startLon);
  const endVec = latLongToVector3(endLat, endLon);
  const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  midVec.normalize().multiplyScalar(1.1);

  const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);

  const speed = 1 / (latencyMs / 1000);
  let t = Math.random();

  useFrame(() => {
    if (pointRef.current) {
      t += speed * 0.001;
      if (t > 1) t = 0;
      const point = curve.getPoint(t);
      pointRef.current.position.set(point.x, point.y, point.z);
    }
  });

  return (
    <mesh ref={pointRef}>
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}