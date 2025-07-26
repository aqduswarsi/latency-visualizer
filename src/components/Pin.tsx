// src/components/Pin.tsx
"use client";

import { Text, Sphere } from "@react-three/drei";
import { Vector3 } from "three";

interface PinProps {
  position: Vector3;
  label?: string;
}

export default function Pin({ position, label }: PinProps) {
  return (
    <>
      <Sphere args={[0.01, 8, 8]} position={position}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {label && (
        <Text
          position={[position.x, position.y + 0.03, position.z]}
          fontSize={0.025}
          color="white"
          anchorX="center"
          anchorY="bottom"
          billboard // ✅ makes text always face the camera
        >
          {label}
        </Text>
      )}
    </>
  );
}