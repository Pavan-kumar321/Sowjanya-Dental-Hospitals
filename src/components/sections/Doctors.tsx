"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, GraduationCap, Clock, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { doctors } from "@/data/doctors";
import Image from "next/image";

export const Doctors = () => {
  return (
    <Section id="doctors" className="bg-white">
      <Container>
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-bold uppercase tracking-widest text-sm"
          >
            Our Experts
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-heading font-bold text-navy mt-4 mb-6"
          >
            Meet Our Specialist Doctors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 max-w-2xl mx-auto"
          >
            Our team of highly qualified specialists is dedicated to providing you with the highest quality dental care using state-of-the-art technology.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 border border-navy/5"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="text-gold fill-gold" size={14} />
                  <span className="text-navy font-bold text-sm">{doctor.rating || "5.0"}</span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-heading font-bold text-navy group-hover:text-gold transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-gold font-bold text-sm uppercase tracking-wide mt-1">
                    {doctor.specialty}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {doctor.qualification && (
                    <div className="flex items-center gap-3 text-navy/60 text-sm">
                      <GraduationCap size={18} className="text-gold" />
                      <span>{doctor.qualification}</span>
                    </div>
                  )}
                  {doctor.experience && (
                    <div className="flex items-center gap-3 text-navy/60 text-sm">
                      <Clock size={18} className="text-gold" />
                      <span>{doctor.experience}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-navy/60 text-sm">
                    <Award size={18} className="text-gold" />
                    <span>Fees: <span className="font-bold text-navy">₹{doctor.fees || 300}</span></span>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                      // Dispatch custom event to notify BookingForm
                      window.dispatchEvent(new CustomEvent('select-doctor', { detail: doctor.name }));
                    }
                  }}
                >
                  Book Appointment <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
