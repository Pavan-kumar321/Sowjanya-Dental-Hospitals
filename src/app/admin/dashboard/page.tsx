"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, Calendar, CheckCircle, XCircle, 
  ArrowUpRight, Clock, User 
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch stats error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) return <div className="text-navy/40 italic">Loading dashboard...</div>;

  const stats = [
    { label: "Total Bookings", value: data?.stats?.total || 0, icon: Calendar, color: "bg-blue-500" },
    { label: "Pending", value: data?.stats?.pending || 0, icon: Clock, color: "bg-amber-500" },
    { label: "Confirmed", value: data?.stats?.confirmed || 0, icon: CheckCircle, color: "bg-emerald-500" },
    { label: "Declined", value: data?.stats?.declined || 0, icon: XCircle, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-heading font-bold text-navy mb-2">Welcome Back, Admin</h1>
        <p className="text-navy/50">Here&apos;s what&apos;s happening with Sowjanya Dental Hospitals today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-premium border border-navy/5"
          >
            <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <div className="text-3xl font-heading font-bold text-navy mb-1">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest font-bold text-navy/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-3xl shadow-premium border border-navy/5 overflow-hidden">
        <div className="p-8 border-b border-navy/5 flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold text-navy">Recent Activity</h3>
          <button className="text-xs font-bold uppercase tracking-widest text-gold hover:text-navy transition-colors flex items-center gap-2">
            View All <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Patient</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Treatment</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Date & Time</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-navy/40">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {data?.bookings?.slice(0, 5).map((booking: any) => (
                <tr key={booking._id} className="hover:bg-cream/20 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center text-navy/40">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-navy">{booking.name}</div>
                        <div className="text-xs text-navy/40">{booking.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium text-navy/70">{booking.treatment}</td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-navy">{new Date(booking.date).toLocaleDateString()}</div>
                    <div className="text-xs text-navy/40">{booking.timeSlot}</div>
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
                </tr>
              ))}
              {(!data?.bookings || data.bookings.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-navy/30 italic">No recent bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
