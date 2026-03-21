"use client";

import React, { useEffect, useState } from "react";
import { 
  Search, Filter, Check, X, 
  MoreVertical, User, Calendar, Clock,
  ChevronLeft, ChevronRight, Loader2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setBookings(data.bookings || []);
      setFilteredBookings(data.bookings || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let result = bookings;
    if (filter !== "all") {
      result = result.filter(b => b.status === filter);
    }
    if (search) {
      result = result.filter(b => 
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.phone.includes(search) ||
        b.treatment.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredBookings(result);
  }, [filter, search, bookings]);

  const handleStatusUpdate = async (id: string, status: string, reason?: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, declineReason: reason }),
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status, declineReason: reason } : b));
        setSelectedBooking(null);
        setDeclineReason("");
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-navy mb-2">Bookings</h1>
          <p className="text-navy/50">Manage patient appointments and track treatment history.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..."
              className="pl-12 pr-6 py-3 bg-white rounded-2xl border border-navy/5 shadow-premium outline-none focus:border-gold transition-all text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="bg-white px-6 py-3 rounded-2xl border border-navy/5 shadow-premium outline-none focus:border-gold transition-all text-sm font-bold text-navy"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-premium border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Patient Info</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Treatment Details</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Date & Slot</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Payment ID</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Status</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <Loader2 className="animate-spin text-gold mx-auto mb-4" size={32} />
                    <span className="text-navy/40 font-bold uppercase tracking-widest text-xs">Loading records...</span>
                  </td>
                </tr>
              ) : filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-cream/10 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold">
                        {booking.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-navy">{booking.name}</div>
                        <div className="text-xs text-navy/40">{booking.email}</div>
                        <div className="text-xs text-navy/40">{booking.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-navy">{booking.treatment}</div>
                    {booking.otherTreatmentDetail && (
                      <div className="text-xs text-navy/40 mt-1 italic">&quot;{booking.otherTreatmentDetail}&quot;</div>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-navy">
                      <Calendar size={14} className="text-gold" />
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-navy/40 mt-1">
                      <Clock size={14} />
                      {booking.timeSlot}
                    </div>
                  </td>
                  <td className="p-6">
                    <code className="text-[10px] bg-navy/5 px-2 py-1 rounded text-navy/50">{booking.paymentId}</code>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      booking.status === 'declined' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    {booking.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(booking._id, "confirmed")}
                          className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 shadow-sm transition-all active:scale-90"
                          title="Confirm Booking"
                        >
                          <Check size={20} />
                        </button>
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center hover:bg-rose-600 shadow-sm transition-all active:scale-90"
                          title="Decline Booking"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <button className="text-navy/20 hover:text-navy/40">
                        <MoreVertical size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!isLoading && filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <AlertCircle className="text-navy/10 mx-auto mb-4" size={48} />
                    <p className="text-navy/40 italic">No bookings found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decline Reason Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
              onClick={() => setSelectedBooking(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-heading font-bold text-navy mb-6">Decline Booking</h3>
              <p className="text-sm text-navy/60 mb-6">
                Please provide a reason for declining <span className="font-bold text-navy">{selectedBooking.name}&apos;s</span> appointment. This will be sent to the patient.
              </p>
              
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Slot Not Available",
                  "Doctor Unavailability",
                  "Equipment Maintenance",
                  "Out of Business Hours",
                  "Other Reason"
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setDeclineReason(reason)}
                    className={`text-left p-4 rounded-xl border text-sm font-bold transition-all ${
                      declineReason === reason
                      ? "bg-rose-500 border-rose-500 text-white shadow-lg"
                      : "bg-cream border-navy/5 text-navy/70 hover:border-rose-200"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
                {declineReason === "Other Reason" && (
                  <textarea
                    placeholder="Provide details..."
                    className="w-full bg-cream border border-navy/5 p-4 rounded-xl text-sm outline-none focus:border-rose-500 h-24"
                    value={declineReason === "Other Reason" ? "" : declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  className="flex-1 py-4 font-bold text-navy/40 hover:text-navy transition-colors"
                  onClick={() => setSelectedBooking(null)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-2 bg-rose-500 text-white py-4 px-8 rounded-2xl font-bold shadow-premium hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
                  disabled={!declineReason || isProcessing}
                  onClick={() => handleStatusUpdate(selectedBooking._id, "declined", declineReason)}
                >
                  {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Confirm Decline"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
