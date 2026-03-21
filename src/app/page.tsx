import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Doctors } from "@/components/sections/Doctors";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingForm } from "@/components/sections/BookingForm";
import { LocationContact } from "@/components/layout/LocationContact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Testimonials />
      <BookingForm />
      <LocationContact />
      <Footer />
    </main>
  );
}
