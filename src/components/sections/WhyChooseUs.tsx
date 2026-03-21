"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserCheck, Shield, Zap, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = [
  { icon: UserCheck, title: "Expert Doctors", desc: "Our team of specialists has over 10 years of experience in leading dental hospitals." },
  { icon: Shield, title: "Safe & Sanitized", desc: "We follow strict sterilization protocols to ensure a safe environment for all patients." },
  { icon: Zap, title: "Advanced Tech", desc: "From digital X-rays to modern implants, we use the latest technology for better results." },
  { icon: Heart, title: "Compassionate Care", desc: "A patient-first approach that ensures you feel comfortable and cared for during your visit." },
];

export const WhyChooseUs = () => {
  return (
    <section id="about" className="relative group overflow-hidden">
      {/* Upper Diagonal Divider */}
      <div className="absolute top-0 left-0 w-full h-32 bg-white -z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }} />
      
      <div className="bg-cream py-24 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden border-[12px] border-white shadow-premium max-w-lg">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
                  alt="Professional Dentist"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating Element */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -right-6 lg:-right-12 z-20 bg-gold p-8 rounded-3xl shadow-xl text-white max-w-[240px]"
              >
                <div className="text-4xl font-heading font-bold mb-2">100%</div>
                <div className="text-sm font-medium opacity-90 leading-tight">Patient Satisfaction <br /> Recorded in 2025</div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-navy/5 rounded-full -z-10" />
            </motion.div>

            {/* Content Side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4"
              >
                The Sowjanya Advantage
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-8"
              >
                Why Patients <br /> Trust Our Clinic
              </motion.h2>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal">
                      <feature.icon size={24} />
                    </div>
                    <h4 className="text-lg font-heading font-bold text-navy">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-navy/60 font-body leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Lower Diagonal Divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-navy -z-10" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>
  );
};
