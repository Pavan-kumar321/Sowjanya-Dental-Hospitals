"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden bg-cream">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/5 -skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal/5 rounded-full blur-3xl -z-10" />
      
      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gold/20 shadow-sm mb-6"
            >
              <Star className="text-gold fill-gold" size={16} />
              <span className="text-sm font-medium text-navy/80">
                4.6★ Rating • 1,196+ Happy Patients
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-navy leading-[1.1] mb-6">
              Your Smile <br />
              <span className="text-gold">Deserves</span> the <br />
              Best Care
            </h1>

            <p className="text-lg md:text-xl text-navy/70 font-body mb-10 max-w-xl leading-relaxed">
              Experience world-class dental treatments in a warm, premium environment. 
              Hyderabad&apos;s leading women-owned clinic dedicated to your oral wellness.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Appointment
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = 'tel:09000455700'}
              >
                Call Us Now
              </Button>
            </div>

            {/* Floating Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 flex items-center gap-3 text-navy/60"
            >
              <div className="flex items-center gap-2 bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                Open Today
              </div>
              <span className="text-sm">Closes 8:00 PM • Himayat Nagar</span>
            </motion.div>
          </motion.div>

          {/* Image Right */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-20 rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white max-w-lg mx-auto lg:ml-auto"
            >
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Dental Clinic"
                width={600}
                height={700}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </motion.div>

            {/* Overlapping Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 -left-6 lg:-left-12 z-30 bg-white p-6 rounded-2xl shadow-premium border border-gold/10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gold/10 p-3 rounded-xl">
                  <Trophy className="text-gold" size={24} />
                </div>
                <div>
                  <div className="font-heading font-bold text-navy">10+ Years</div>
                  <div className="text-xs text-navy/50 uppercase tracking-widest font-bold">Of Excellence</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
              className="absolute top-10 -right-6 lg:-right-10 z-30 bg-navy text-white p-6 rounded-2xl shadow-premium border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <div className="font-bold">Women-Owned</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-widest">Empowering Care</div>
                </div>
              </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-gold/20 rounded-full -z-10" />
          </div>
        </div>
      </Container>
    </section>
  );
};
