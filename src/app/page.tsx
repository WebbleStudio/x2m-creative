import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Vision from "@/components/sections/Vision";
import Works from "@/components/sections/Works";
import ClientScrollHandler from "@/components/global/ClientScrollHandler";

export default function HomePage() {
  return (
    <main className="w-full">
      <ClientScrollHandler />
      <Hero 
        quote="Creativity is intelligence having fun"
        author="Albert Einstein"
        title={{
          firstLine: "Creativity",
          secondLine: {
            text: "Intelligence",
            gradient: true
          },
          thirdLine: "Having fun"
        }}
        showScrollIndicator={true}
      />
      <Vision />
      <div className="w-full px-[15px] sm:px-5 md:px-[30px]">
        <div className="w-full max-w-[1300px] 2xl:max-w-[1650px] mx-auto">
          <Services />
          <Works />
          <Contact />
        </div>
      </div>
    </main>
  );
} 