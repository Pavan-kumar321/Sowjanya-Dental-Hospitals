"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-navy py-4 shadow-xl" : "bg-transparent py-6"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-navy"
              }`}
            >
              <path
                d="M20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2ZM20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6C27.732 6 34 12.268 34 20C34 27.732 27.732 34 20 34Z"
                fill="currentColor"
              />
              <path
                d="M20 10C17.2386 10 15 12.2386 15 15V18C15 20.7614 17.2386 23 20 23C22.7614 23 25 20.7614 25 18V15C25 12.2386 22.7614 10 20 10Z"
                fill="currentColor"
                className="text-gold"
              />
              <path
                d="M20 25C14.4772 25 10 29.4772 10 35H30C30 29.4772 25.5228 25 20 25Z"
                fill="currentColor"
                className="text-teal"
              />
            </svg>
            <span
              className={`font-heading text-xl font-bold leading-tight transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-navy"
              }`}
            >
              Sowjanya <br /> <span className="text-gold font-normal text-sm uppercase tracking-widest">Dental Hospitals</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-gold ${
                  isScrolled ? "text-white/80" : "text-navy/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              size="sm"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-white" : "text-navy"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden bg-navy text-white"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={32} />
                </button>
              </div>
              <div className="flex flex-col gap-8 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-heading hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book Appointment
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/60">
                  <Phone size={18} />
                  <span>090004 55700</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
