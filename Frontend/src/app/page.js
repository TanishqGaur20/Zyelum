"use client";
import HeroSection from "@/components/HeroSection";
import Pricing from "@/components/Pricing";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-32">
      <HeroSection />
      <Services />
      <Pricing />
      <Testimonials />
    </div>
  );
}
