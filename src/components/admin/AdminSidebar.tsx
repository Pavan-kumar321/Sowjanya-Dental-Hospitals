"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, CalendarCheck, Settings, 
  LogOut, Menu, X, LucideIcon 
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: CalendarCheck, label: "Bookings", href: "/admin/dashboard/bookings" },
  { icon: Settings, label: "Settings", href: "/admin/dashboard/settings" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-[60] bg-navy text-white p-3 rounded-full shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-navy text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full p-8">
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-gold">Sowjanya</h2>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Admin Portal</p>
          </div>

          <nav className="flex-1 space-y-4">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    isActive 
                    ? "bg-gold text-white shadow-premium" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 mt-auto"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
