"use client";
import { useMemo } from "react";
import { Html, Sphere } from "@react-three/drei";

type CloudRegion = {
  name: string;
  provider: "AWS" | "GCP" | "Azure";
  lat: number;
  lng: number;
};

type VisibleProviders = {
  AWS: boolean;
  GCP: boolean;
  Azure: boolean;
};

const cloudRegions: CloudRegion[] = [
  { name: "us-east-1", provider: "AWS", lat: 37.7749, lng: -77.0365 },
  { name: "us-west1", provider: "GCP", lat: 37.3382, lng: -121.8863 },
  { name: "centralus", provider: "Azure", lat: 41.8781, lng: -87.6298 },
  // Add more as needed
];

function latLngToXYZ(lat: number, lng: number, radius = 1.03) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

const CloudRegions = ({ visibleProviders }: { visibleProviders: VisibleProviders }) => {
  const regions = useMemo(() => cloudRegions, []);

  return (
    <>
      {regions
        .filter(region => visibleProviders[region.provider])
        .map(region => {
          const [x, y, z] = latLngToXYZ(region.lat, region.lng);

          const color =
            region.provider === "AWS"
              ? "#ff9900"
              : region.provider === "GCP"
              ? "#4285F4"
              : "#0072C6";

          return (
            <group key={region.name} position={[x, y, z]}>
              <Sphere args={[0.007, 16, 16]}>
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={1.3}
                />
              </Sphere>

              <Html position={[0, 0.02, 0]} distanceFactor={12}>
                <div
                  style={{
                    color: "white",
                    fontSize: "0.32rem",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    textShadow: "0 0 3px rgba(0,0,0,0.7)",
                  }}
                >
                  <div><strong>{region.name}</strong></div>
                  <div style={{ fontSize: "0.28rem" }}>{region.provider}</div>
                </div>
              </Html>
            </group>
          );
        })}
    </>
  );
};

export default CloudRegions;