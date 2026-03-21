import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-4 lg:p-12 relative">
        <div className="absolute inset-0 opacity-[0.02] grain-overlay pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
