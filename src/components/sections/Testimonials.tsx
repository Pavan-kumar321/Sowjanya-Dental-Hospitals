"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    name: "Rajesh Kumar",
    quote: "Excellent dental care! The doctors are very professional and the environment is extremely clean. Highly recommended for implants.",
    rating: 5,
    initial: "R",
  },
  {
    name: "Priya Varma",
    quote: "Best clinic for root canal treatment. I was very nervous, but the team made me feel comfortable throughout the procedure.",
    rating: 5,
    initial: "P",
  },
  {
    name: "Suresh Reddy",
    quote: "Affordable and transparent pricing. The technology they use is state-of-the-art. Finally found a dentist I can trust in Hyderabad.",
    rating: 4,
    initial: "S",
  },
  {
    name: "Anitha Rao",
    quote: "Great experience with my daughter's pediatric treatment. The doctors are very gentle with kids. The facility is top-notch.",
    rating: 5,
    initial: "A",
  },
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] grain-overlay" />
      
      <Container>
        <div className="text-center mb-16 lg:mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4"
          >
            Patient Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-6xl font-heading font-bold text-white"
          >
            What Our Patients Say
          </motion.h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Testimonials Carousel (Row 1) */}
        <div className="flex flex-wrap gap-6 justify-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              
              <Quote className="text-gold opacity-20 mb-4" size={32} />
              
              <p className="text-white/80 font-body text-lg mb-8 leading-relaxed italic">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
                  {testimonial.initial}
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-lg">{testimonial.name}</div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">Verified Patient</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <a
            href="https://www.google.com/maps/place/Sowjanya+Dental+Hospitals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full text-navy font-bold shadow-premium hover:shadow-gold/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-gold" />
              ))}
            </div>
            <span>Read 1,196+ Reviews on Google</span>
            <ArrowRight size={20} className="text-gold" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};
