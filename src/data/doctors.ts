export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification?: string;
  experience?: string;
  rating?: number;
  fees?: number;
  image: string;
  services?: string[];
}

export const doctors: Doctor[] = [
  {
    id: "dr-prashanth",
    name: "Dr. Prashanth",
    specialty: "Prosthodontist",
    experience: "15 Yrs of Experience",
    rating: 4.9,
    fees: 300,
    image: "/doctors/prashanth.png",
    services: ["Dental Implants", "Cosmetic Dentistry"],
  },
  {
    id: "dr-d-prathyusha",
    name: "Dr. D Prathyusha",
    specialty: "Pediatric Dentist",
    qualification: "BDS, MDS (Pedodontics)",
    experience: "10 Yrs of Experience",
    rating: 4.8,
    fees: 300,
    image: "/doctors/prathyusha.png",
    services: ["Pediatric Dentistry"],
  },
  {
    id: "dr-dwija",
    name: "Dr. Dwija",
    specialty: "Dentist",
    qualification: "BDS",
    experience: "9 Yrs of Experience",
    rating: 5.0,
    fees: 300,
    image: "/doctors/dwija.png",
    services: ["General Dentistry", "Root Canal Treatment", "Cosmetic Dentistry"],
  },
  {
    id: "dr-ravi-u-d",
    name: "Dr. Ravi U D",
    specialty: "Prosthodontist",
    qualification: "BDS, MDS (Prosthodontist And Crown Bridge)",
    experience: "14 Yrs of Experience",
    rating: 4.8,
    fees: 300,
    image: "/doctors/ravi.png",
    services: ["Dental Implants", "Cosmetic Dentistry"],
  },
  {
    id: "dr-akifuddin",
    name: "Dr. Akifuddin",
    specialty: "Oral And MaxilloFacial Surgeon",
    qualification: "BDS, MDS",
    experience: "14 Yrs of Experience",
    rating: 4.6,
    fees: 300,
    image: "/doctors/akifuddin.png",
    services: ["Dental Implants", "General Dentistry"],
  },
  {
    id: "dr-sowjanya-kancha",
    name: "Dr. Sowjanya Kancha",
    specialty: "Periodontist",
    experience: "16 Yrs of Experience",
    rating: 4.2,
    fees: 300,
    image: "/doctors/sowjanya.png",
    services: ["General Dentistry"],
  },
  {
    id: "dr-srikanth-kura",
    name: "Dr. Srikanth Kura",
    specialty: "Periodontist",
    qualification: "BDS, MDS (Periodontology And Oral Implantology)",
    experience: "13 Yrs of Experience",
    rating: 4.8,
    fees: 300,
    image: "/doctors/srikanth.png",
    services: ["Dental Implants"],
  },
  {
    id: "dr-anil-kumar",
    name: "Dr. Anil Kumar",
    specialty: "Dentist",
    qualification: "BDS, MDS - Pedodontics",
    experience: "11 Yrs of Experience",
    rating: 4.5,
    fees: 300,
    image: "/doctors/anil.png",
    services: ["Pediatric Dentistry", "Braces & Aligners"],
  }
];
