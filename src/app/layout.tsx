import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Sowjanya Dental Hospitals | Luxury Dental Care in Hyderabad",
  description: "Human-designed, professional dental care in Himayat Nagar, Hyderabad. Premium, trustworthy, and expert dental treatments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
       <body className="antialiased overflow-x-hidden bg-[#F9F5EE] text-[#0A1628]">
        {children}
      </body>
    </html>
  );
}
