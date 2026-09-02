"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import Compliance from "@/components/sections/Compliance";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-obsidian text-gray-100 selection:bg-[#00f5d4] selection:text-[#060709] relative">
        <Header />
        
        <main className="flex-1">
          <Hero />
          <Capabilities />
          <Compliance />
          <FAQ />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
