import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingProducts from "@/components/home/TrendingProducts";
import BrandExperience from "@/components/home/BrandExperience"; // 1. Import it
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import TopBrands from "@/components/home/TopBrands";
import PromoBanners from "@/components/home/PromoBanners";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-zinc-50">
      
      <HeroSection />
      <FeaturedCategories />
   
      <TopBrands/>
      <PromoBanners/>
      
      
      {/* 2. Add it here! */}
      <BrandExperience /> 

      <WhatsAppButton />

    </main>
  );
}