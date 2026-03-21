"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Clock, Globe, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const contactDetails = [
  { icon: MapPin, label: "Address", text: "sreemukh complex, 1st floor, 3-6-198/F/7, Himayat Nagar Rd, adj. to Westside mall, Hyderabad 500029" },
  { icon: Phone, label: "Phone", text: "090004 55700 / 075056 00600" },
  { icon: Globe, label: "Website", text: "www.sowjanyadental.in" },
];

const schedule = [
  { day: "Mon – Sat", hours: "9:00 AM – 8:00 PM" },
  { day: "Sunday", hours: "By Appointment Only" },
];

export const LocationContact = () => {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-premium min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m11!1m3!1d11974.123!2d78.484!3d17.399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99bf00000000%3A0xe54955c47949a02d!2sSowjanya%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>

          {/* Info Side */}
          <div className="flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-teal font-bold uppercase tracking-[0.2em] text-sm mb-4">Find Us</div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-gold">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-navy/40 mb-1">{item.label}</div>
                      <div className="text-navy font-bold">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 bg-navy p-8 rounded-3xl text-white shadow-premium"
            >
              <div className="flex items-center gap-4 mb-6">
                <Clock className="text-gold" size={24} />
                <h3 className="text-xl font-heading font-bold">Opening Hours</h3>
              </div>
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-white/10 last:border-0">
                    <span className="text-white/60 font-medium">{item.day}</span>
                    <span className="font-bold text-gold">{item.hours}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/919000455700"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-gold transition-all duration-300 py-4 rounded-xl font-bold group"
              >
                <MessageSquare size={20} className="text-teal group-hover:text-white" />
                Contact on WhatsApp
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
