"use client";
import React from "react";

type VisibleProviders = {
  AWS: boolean;
  GCP: boolean;
  Azure: boolean;
};

type ProviderFilterProps = {
  visibleProviders: VisibleProviders;
  onToggleProvider: (provider: keyof VisibleProviders) => void;
};

const ProviderFilter: React.FC<ProviderFilterProps> = ({
  visibleProviders,
  onToggleProvider,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        padding: "12px 16px",
        borderRadius: "8px",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: "0.9rem",
      }}
    >
      <div><strong>Toggle Cloud Providers</strong></div>
      {(["AWS", "GCP", "Azure"] as const).map((provider) => (
        <div key={provider} style={{ marginTop: 6 }}>
          <label>
            <input
              type="checkbox"
              checked={visibleProviders[provider]}
              onChange={() => onToggleProvider(provider)}
            />{" "}
            {provider}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProviderFilter;