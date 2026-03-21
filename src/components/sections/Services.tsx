"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, Sparkles, PlusCircle, Smile, Activity, Baby, 
  Palette, Crown, Scissors, ShieldCheck, Layers, MoreHorizontal, ArrowRight 
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const services = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Routine checkups, cleaning, fillings, and preventive care." },
  { icon: Activity, title: "Root Canal Treatment", desc: "Painless root canal procedures to save natural teeth." },
  { icon: PlusCircle, title: "Dental Implants", desc: "Permanent solution for missing teeth with natural appearance." },
  { icon: Smile, title: "Braces & Aligners", desc: "Orthodontic treatment for properly aligned teeth and confident smiles." },
  { icon: Palette, title: "Cosmetic Dentistry", desc: "Smile designing, teeth whitening, and aesthetic treatments." },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle and specialized dental care for children." },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cream rounded-full -z-10 blur-3xl opacity-50" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-teal/5 rounded-full -z-10 blur-3xl" />
      
      <Container>
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal font-bold uppercase tracking-[0.2em] text-sm mb-4"
          >
            Our Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-6xl font-heading font-bold text-navy"
          >
            Comprehensive Dental Care
          </motion.h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-cream border border-navy/5 p-8 rounded-3xl hover:border-gold/30 hover:shadow-premium transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                <service.icon size={28} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-navy/60 font-body mb-6 leading-relaxed">
                {service.desc}
              </p>
              <a 
                href="#booking"
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-teal hover:text-gold transition-colors"
              >
                Learn More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
