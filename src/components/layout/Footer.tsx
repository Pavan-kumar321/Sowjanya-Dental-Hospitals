import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Instagram, MapPin, Phone, MessageSquare } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-navy pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] grain-overlay" />
      
      <Container>
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/5 pb-20 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="font-heading text-2xl font-bold text-white leading-tight">
                Sowjanya <br /> <span className="text-gold font-normal text-sm uppercase tracking-widest">Dental Hospitals</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              A confident smile starts with good dental care. Providing premium dental services in the heart of Hyderabad for over a decade. ✨
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com/sowjanyadental" },
                { icon: MessageSquare, href: "https://wa.me/919000455700" },
                { icon: MapPin, href: "https://maps.app.goo.gl/..." },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Services", "About Us", "Reviews", "Book Appointment"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-white/50 hover:text-gold transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-8">Our Services</h4>
            <ul className="space-y-4">
              {["General Dentistry", "Teeth Whitening", "Dental Implants", "Braces & Aligners", "Cosmetic Dentistry"].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-white/50 hover:text-gold transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Phone className="text-gold flex-shrink-0" size={18} />
                <span className="text-white/50 text-sm">090004 55700 / 075056 00600</span>
              </li>
              <li className="flex gap-4">
                <MapPin className="text-gold flex-shrink-0" size={18} />
                <span className="text-white/50 text-sm">himayat nagarrd, hyderabad, telangana 500029</span>
              </li>
              <li>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Women-Owned Clinic</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            © 2026 Sowjanya Dental Hospitals. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
