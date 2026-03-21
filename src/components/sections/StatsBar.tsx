"use client";

import React from "react";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: "1196+", label: "Happy Patients" },
  { value: "4.6★", label: "Google Rating" },
  { value: "10+", label: "Years Experience" },
  { value: "15+", label: "Treatments" },
];

export const StatsBar = () => {
  return (
    <div className="bg-navy py-12 lg:py-16 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 grain-overlay" />
      
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2 relative group">
              {/* Divider for desktop */}
              {index !== stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-px h-12 bg-white/10 -translate-y-1/2" />
              )}
              
              <div className="text-4xl lg:text-5xl font-heading font-bold gradient-gold-text">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-white/50 group-hover:text-gold transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <style jsx>{`
        .gradient-gold-text {
          background: linear-gradient(135deg, #C9A96E 0%, #F9F5EE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};
