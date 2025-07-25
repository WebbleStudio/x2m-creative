import Contact from "@/components/sections/homepage/Contact";
import Hero from "@/components/sections/homepage/Hero";
import PartnersSlider from "@/components/sections/homepage/PartnersSlider";
import Services from "@/components/sections/homepage/Services";
import Vision from "@/components/sections/homepage/Vision";
import Works from "@/components/sections/homepage/Works";
import ClientScrollHandler from "@/components/layout/ClientScrollHandler";
import Script from "next/script";

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.x2mcreative.com/#organization",
    "name": "X2M Creative",
    "alternateName": "X2M",
    "url": "https://www.x2mcreative.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.x2mcreative.com/img/X2M.png",
      "width": 400,
      "height": 400
    },
    "image": "https://www.x2mcreative.com/img/X2M.png",
                "description": "X2M Creative combina creatività e strategia per far crescere il tuo brand in modo misurabile. Agenzia creativa specializzata in branding, social media strategy, video making e advertisement.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IT",
      "addressRegion": "Italia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "info@x2marco.com",
      "availableLanguage": ["Italian", "English"]
    },
    "sameAs": [
      "https://www.instagram.com/x2marco",
      "https://www.youtube.com/@X2Marco",
      "https://www.behance.net/marcoibrahim1"
    ],
    "serviceType": [
      "Branding",
      "Visual Identity",
      "Social Media Strategy", 
      "Video Making",
      "Advertisement",
      "Creative Agency",
      "Marketing Digitale"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Italy"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.x2mcreative.com/#website",
    "url": "https://www.x2mcreative.com",
    "name": "X2M Creative",
    "description": "Agenzia creativa specializzata in branding, social media strategy, video making e advertisement per la crescita del brand",
    "publisher": {
      "@id": "https://www.x2mcreative.com/#organization"
    },
    "inLanguage": "it-IT",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.x2mcreative.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
                  "name": "Servizi Creativi X2M",
    "provider": {
      "@id": "https://www.x2mcreative.com/#organization"
    },
    "serviceType": "Creative Agency Services",
    "description": "Servizi di agenzia creativa comprensivi di branding, social media strategy, video making e advertisement per far crescere il tuo brand",
    "areaServed": {
      "@type": "Country",
      "name": "Italy"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servizi Creativi",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding e Visual Identity",
            "description": "Identità visive uniche che raccontano davvero il tuo brand"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Strategy",
            "description": "Strategie social personalizzate per far crescere il tuo brand online"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Making",
            "description": "Trasformiamo le tue idee in video coinvolgenti e professionali"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Advertisement",
            "description": "Campagne pubblicitarie strategiche e mirate per massimizzare l'impatto del tuo brand"
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      
      <main className="w-full">
        <ClientScrollHandler />
        <Hero 
          quote={undefined}
          author="Albert Einstein"
          title={{
            firstLine: {
              main: "Creativity",
              suffix: "is"
            },
            secondLine: {
              text: "Intelligence",
              gradient: true
            },
            thirdLine: "Having fun"
          }}
          showScrollIndicator={true}
        />
        <PartnersSlider />
        <Vision />
        <div className="w-full px-[15px] sm:px-5 md:px-[30px]">
          <div className="w-full max-w-[1300px] 2xl:max-w-[1650px] mx-auto">
            <Services />
            <Works />
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
} 