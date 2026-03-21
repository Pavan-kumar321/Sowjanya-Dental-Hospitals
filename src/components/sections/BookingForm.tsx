"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Phone, Mail, Calendar, Clock, CreditCard, 
  CheckCircle2, ChevronRight, ChevronLeft, Loader2, Award, MapPin, Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { 
  format, addDays, isToday, parse, isAfter, 
  startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameMonth, isSameDay, startOfWeek, endOfWeek, isBefore, startOfToday 
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import Script from "next/script";
import { doctors } from "@/data/doctors";
import Image from "next/image";

const IST_TIMEZONE = "Asia/Kolkata";

const services = [
  "General Dentistry", "Root Canal Treatment", "Dental Implants", 
  "Braces & Aligners", "Cosmetic Dentistry", "Pediatric Dentistry", "Others"
];

const timeSlots = [
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"
];

export const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<"doctor" | "general">("general");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "",
    otherTreatmentDetail: "",
    date: new Date(),
    timeSlot: "",
    doctor: "",
  });
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error" | "pending">("idle");
  const [bookingId, setBookingId] = useState("");

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // Fetch unavailable slots when date changes
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const dateStr = format(formData.date, "yyyy-MM-dd");
        const res = await fetch(`/api/bookings?date=${dateStr}&doctor=${encodeURIComponent(formData.doctor)}`);
        const data = await res.json();
        setUnavailableSlots(data.unavailableSlots || []);
      } catch (err) {
        console.error("Availability fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvailability();
  }, [formData.date, formData.doctor]);

  // Handle doctor pre-selection event from Doctors.tsx
  useEffect(() => {
    const handleSelectDoctor = (e: any) => {
      setBookingType("doctor");
      setFormData(prev => ({ ...prev, doctor: e.detail, timeSlot: "" }));
      setStep(1); // Ensure we are on the first step
    };
    window.addEventListener('select-doctor', handleSelectDoctor);
    return () => window.removeEventListener('select-doctor', handleSelectDoctor);
  }, []);

  const handleDateChange = (date: Date) => {
    setFormData(prev => ({ ...prev, date, timeSlot: "" }));
  };

  const isSlotPast = (slot: string) => {
    if (!isToday(formData.date)) return false;
    
    const nowIST = toZonedTime(new Date(), IST_TIMEZONE);
    const slotTime = parse(slot, "hh:mm a", formData.date);
    const slotIST = toZonedTime(slotTime, IST_TIMEZONE);
    
    return isAfter(nowIST, slotIST);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      // Create Razorpay Order with Fee of 300
      const res = await fetch("/api/razorpay", {
        method: "POST",
        body: JSON.stringify({ amount: 300 }),
      });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      // Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Sowjanya Dental Hospitals",
        description: "Consultation Fee",
        order_id: order.id,
        handler: async (response: any) => {
          await finalizeBooking(response.razorpay_payment_id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#0A1628" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      setBookingStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalizeBooking = async (paymentId: string) => {
    setBookingStatus("pending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: format(formData.date, "yyyy-MM-dd"), // Normalize for storage
          paymentId,
          amount: 300,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingId(data.bookingId);
        setBookingStatus("success");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Finalize Error:", err);
      setBookingStatus("error");
    }
  };

  if (bookingStatus === "success") {
    return (
      <Section id="booking" className="bg-cream">
        <Container>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-premium text-center"
          >
            <div className="w-20 h-20 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Booking Pending Confirmation</h2>
            <p className="text-navy/60 mb-8 leading-relaxed">
              Thank you, {formData.name.split(" ")[0]}! Your appointment {formData.doctor ? `with ${formData.doctor}` : `for ${formData.treatment || 'General Checkup'}`} on {format(formData.date, "PPP")} at {formData.timeSlot} is under review.
            </p>
            <div className="bg-cream p-4 rounded-xl border border-navy/5 mb-8">
              <span className="text-xs uppercase tracking-widest font-bold text-navy/40">Booking ID</span>
              <div className="text-lg font-mono font-bold text-gold">{bookingId}</div>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full">
              Back to Home
            </Button>
          </motion.div>
        </Container>
      </Section>
    );
  }

  // Common Calendar Component
  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isDisabled = isBefore(day, startOfToday()) || !isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, formData.date);
        
        days.push(
          <div
            key={day.toISOString()}
            className={`flex justify-center flex-1`}
          >
            <button
              disabled={isDisabled}
              onClick={() => handleDateChange(cloneDay)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors ${
                isDisabled ? "text-navy/20 cursor-not-allowed" : 
                isSelected ? "bg-navy text-white font-bold" : 
                "text-navy hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {formattedDate}
            </button>
          </div>
        );
        day = addDays(day, 1);
      }
    }

    return (
      <div className="mb-8 border border-navy/5 p-6 rounded-2xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-lg text-navy">{format(currentMonth, "MMMM yyyy")}</h4>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(addDays(currentMonth, -30))} className="p-2 border rounded-full hover:bg-cream">
              <ChevronLeft size={16}/>
            </button>
            <button onClick={() => setCurrentMonth(addDays(currentMonth, 30))} className="p-2 border rounded-full hover:bg-cream">
              <ChevronRight size={16}/>
            </button>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(dayName => (
            <div key={dayName} className="flex-1 text-center font-bold text-navy/40 text-xs">{dayName}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {days}
        </div>
      </div>
    );
  };

  const doc = doctors.find(d => d.name === formData.doctor);

  return (
    <Section id="booking" className="bg-cream">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-4">Book Your Appointment</h2>
            <p className="text-navy/60">Take the first step towards a perfect smile today.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
             <button 
                onClick={() => { setBookingType("general"); setFormData({...formData, doctor: ""}); }}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                  bookingType === "general" ? "bg-gold text-white border-gold" : "bg-white text-navy/50 border-navy/10 hover:border-gold/50"
                }`}
              >
                Book General Appointment
             </button>
             <button 
                onClick={() => setBookingType("doctor")}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                  bookingType === "doctor" ? "bg-gold text-white border-gold" : "bg-white text-navy/50 border-navy/10 hover:border-gold/50"
                }`}
              >
                Book with Specific Doctor
             </button>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-premium border border-gold/5 min-h-[500px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {bookingType === "doctor" && (
                    <>
                      {/* Doctor Selection or Doctor Profile View */}
                      {!formData.doctor ? (
                        <div className="space-y-4 mb-8">
                          <label className="text-xs font-bold uppercase tracking-widest text-navy/50 flex items-center gap-2">
                            Select Doctor
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {doctors.map((d) => (
                              <button
                                key={d.id}
                                onClick={() => setFormData({ ...formData, doctor: d.name })}
                                className="flex items-center gap-4 text-left p-4 rounded-xl border border-navy/5 bg-cream hover:border-gold/50 transition-all"
                              >
                                <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0 bg-white shadow-sm border border-navy/5">
                                   <Image src={d.image} alt={d.name} fill className="object-cover" />
                                </div>
                                <div>
                                   <p className="font-bold text-navy text-sm">{d.name}</p>
                                   <p className="text-xs text-navy/60">{d.specialty}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : doc && (
                        <div className="mb-8 p-6 bg-cream border border-navy/5 rounded-2xl flex flex-col md:flex-row gap-6 items-start relative overflow-hidden">
                           <div className="absolute top-4 right-4 text-xs font-bold bg-white text-navy px-3 py-1 rounded-full shadow-sm">
                             Fees ₹300
                           </div>
                           <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-white shadow-sm border border-gold/20 flex-shrink-0">
                             <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                           </div>
                           <div>
                             <h3 className="text-xl font-heading font-bold text-navy">{doc.name} <span className="text-sm font-body text-navy/60">(Sowjanya Dental Hospital)</span></h3>
                             <p className="text-gold font-bold text-sm uppercase tracking-wide mt-1 mb-2">{doc.specialty}</p>
                             <div className="flex items-center gap-2 text-navy/60 text-sm mb-1">
                                <Award size={14} className="text-gold" /> {doc.experience || "Expert Specialist"}
                             </div>
                             <div className="flex items-start gap-2 text-navy/60 text-sm max-w-lg mt-3 bg-white p-3 rounded-xl border border-navy/5">
                                <MapPin size={16} className="text-teal mt-0.5 flex-shrink-0" />
                                <span>C/o Sowjanya Dental Hospital, House No 3-6-198 Sowjanya Dental 1st Floor, Shreemukh Complex, Near KFC, Himayat Nagar-500029</span>
                             </div>
                           </div>
                           <button 
                             onClick={() => setFormData({...formData, doctor: ""})}
                             className="absolute bottom-4 right-4 text-xs underline text-navy/40 hover:text-navy"
                           >
                             Change Doctor
                           </button>
                        </div>
                      )}
                    </>
                  )}

                  {((bookingType === "doctor" && formData.doctor) || bookingType === "general") && (
                     <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                           <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                              <CalendarIcon size={18} className="text-gold"/> Select Appointment Date
                           </h3>
                           {renderCalendar()}
                        </div>
                        
                        <div>
                           {/* General Booking fields if no doctor is pre-selected */}
                           {bookingType === "general" && (
                              <div className="mb-6 space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-navy/50 flex items-center gap-2">
                                  Select Treatment
                                </label>
                                <select 
                                  value={formData.treatment} 
                                  onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                                  className="w-full bg-cream border border-navy/5 p-4 rounded-xl focus:border-gold outline-none text-sm"
                                >
                                  <option value="">-- Choose Treatment (Optional) --</option>
                                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {formData.treatment === "Others" && (
                                  <input
                                    type="text"
                                    placeholder="Please specify..."
                                    className="w-full bg-cream border border-navy/5 p-3 flex-1 rounded-xl focus:border-gold outline-none text-sm mt-2"
                                    value={formData.otherTreatmentDetail}
                                    onChange={(e) => setFormData({ ...formData, otherTreatmentDetail: e.target.value })}
                                  />
                                )}
                              </div>
                           )}

                           <div className="bg-cream border border-navy/5 rounded-2xl p-4 mb-6 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                   <CheckCircle2 size={20} className="text-gold"/>
                                </div>
                                <span className="font-bold text-navy">Clinic Visit</span>
                             </div>
                             <div className="text-right">
                                <p className="text-gold font-bold">Fees ₹300</p>
                                <p className="text-xs text-navy/50 font-bold">{format(formData.date, "do MMM yyyy")}</p>
                             </div>
                           </div>

                           <div className="mb-6">
                              <div className="flex items-center justify-between mb-4">
                                 <h4 className="font-bold text-navy text-sm">Evening Slots</h4>
                                 <span className="text-xs text-navy/60 bg-cream px-2 py-1 rounded-lg">04:00 PM - 07:30 PM</span>
                              </div>
                              {isLoading ? (
                                 <div className="flex items-center gap-2 text-navy/40 text-sm italic p-4 bg-cream rounded-xl">
                                    <Loader2 className="animate-spin" size={16} /> Checking availability...
                                 </div>
                              ) : (
                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {timeSlots.map((slot) => {
                                    const isUnavailable = unavailableSlots.includes(slot) || isSlotPast(slot);
                                    const isSelected = formData.timeSlot === slot;
                                    return (
                                       <button
                                          key={slot}
                                          disabled={isUnavailable}
                                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                                          className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                                          isUnavailable 
                                          ? "bg-navy/5 border-transparent text-navy/20 cursor-not-allowed" 
                                          : isSelected
                                          ? "bg-navy border-navy text-white shadow-md transform scale-105"
                                          : "bg-white border-navy/10 text-navy hover:border-gold"
                                          }`}
                                       >
                                          {slot}
                                       </button>
                                    );
                                    })}
                                 </div>
                              )}
                           </div>
                           
                           <div className="flex justify-end mt-4">
                              <Button 
                                 disabled={!formData.timeSlot}
                                 onClick={nextStep}
                                 className="w-full sm:w-auto"
                              >
                                 Next: Your Details <ChevronRight size={20} className="ml-2" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-1 max-w-2xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-navy mb-6">Patient Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-navy/50 flex items-center gap-2">
                        <User size={14} /> Full Name
                       </label>
                       <input
                         type="text"
                         placeholder="e.g. Rahul Sharma"
                         className="w-full bg-cream border border-navy/5 p-4 rounded-xl focus:border-gold outline-none transition-colors"
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-navy/50 flex items-center gap-2">
                        <Phone size={14} /> Phone Number
                       </label>
                       <input
                         type="tel"
                         placeholder="090000 00000"
                         className="w-full bg-cream border border-navy/5 p-4 rounded-xl focus:border-gold outline-none transition-colors"
                         value={formData.phone}
                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy/50 flex items-center gap-2">
                      <Mail size={14} /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      className="w-full bg-cream border border-navy/5 p-4 rounded-xl focus:border-gold outline-none transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="pt-8 flex justify-between">
                     <Button variant="ghost" onClick={prevStep}>
                        <ChevronLeft size={20} className="mr-2" /> Back
                     </Button>
                     <Button 
                       disabled={!formData.name || !formData.phone || !formData.email}
                       onClick={nextStep}
                     >
                       Confirm Details <ChevronRight size={20} className="ml-2" />
                     </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto"
                >
                  <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-6">
                    <CreditCard size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-2">Secure Booking</h3>
                    <p className="text-navy/60 max-w-sm mx-auto">
                      A small consultation fee of <span className="text-gold font-bold">₹300</span> is required to confirm your preferred slot.
                    </p>
                  </div>

                  <div className="w-full bg-cream rounded-2xl p-6 text-left border border-navy/5">
                    <div className="flex justify-between items-center pb-4 border-b border-navy/5 mb-4">
                      <span className="text-navy font-bold">{formData.doctor ? `Consultation with ${formData.doctor}` : (formData.treatment || "General Checkup")}</span>
                      <span className="text-gold font-bold">₹300.00</span>
                    </div>
                    <div className="space-y-2 text-sm text-navy/60">
                      <div className="flex items-center gap-2"><User size={14} /> {formData.name}</div>
                      <div className="flex items-center gap-2"><Calendar size={14} /> {format(formData.date, "PPP")}</div>
                      <div className="flex items-center gap-2"><Clock size={14} /> {formData.timeSlot}</div>
                    </div>
                  </div>

                  <div className="w-full pt-8 flex justify-between gap-4">
                    <Button variant="ghost" onClick={prevStep} disabled={isSubmitting}>
                      <ChevronLeft size={20} className="mr-2" /> Edit Details
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={handlePayment}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={20} /> Processing...
                        </div>
                      ) : (
                        "Pay ₹300 & Book Now"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
};
