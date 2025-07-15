"use client";

import { useState } from 'react';
import ExpandableServiceCard from '../animations/ExpandableServiceCard';

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'video-making',
      title: 'Video Making',
      content: `Diamo vita alle tue idee attraverso video coinvolgenti, pensati per comunicare al meglio il tuo messaggio su ogni piattaforma.\nDalla scrittura alla post-produzione, curiamo ogni fase con creatività e precisione.`
    },
    {
      id: 'social-media',
      title: 'Social Media Strategy',
      content: `Progettiamo strategie social su misura per far crescere la tua presenza online.\nAnalizziamo, pianifichiamo e creiamo contenuti mirati per connetterti davvero con il tuo pubblico.`
    },
    {
      id: 'branding',
      title: 'Branding e visual identity',
      content: `Costruiamo identità visive coerenti e memorabili, capaci di rappresentare davvero i valori del tuo brand. Naming, logo, palette, stile: ogni elemento parla di te.`
    },
    {
      id: 'contact',
      title: 'Contattaci',
      content: `Prenota una call gratuita con il nostro team: ti ascoltiamo, analizziamo i tuoi bisogni e ti proponiamo la soluzione più adatta.\nBastano pochi clic su Calendly per fissare il tuo appuntamento.`,
      calendly: true
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="relative w-full min-h-[700px] md:min-h-[800px] lg:min-h-[850px] xl:min-h-[900px] flex flex-col items-center justify-center overflow-hidden py-16">
      {/* Layout responsive: mobile/tablet verticale, lg orizzontale */}
      <div className="w-full flex flex-col lg:flex-row lg:gap-6 lg:h-[500px]">
        {/* Advertisement box - 55% width */}
        <div 
          className="w-full lg:w-[55%] h-[480px] lg:h-[540px] bg-gray-400 rounded-[30px] flex items-start justify-start p-[35px] mb-6 lg:mb-0 relative"
          style={{
            backgroundImage: "url('/img/adv.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col">
            <h2 className="font-raleway font-semibold text-[30px] 2xl:text-[40px] text-[#0c0c0c] mb-4">
              Advertisement
            </h2>
            <p className="font-raleway font-medium text-[15px] lg:text-[18px] text-[#0c0c0c] max-w-2xl">
              Massimizziamo l&apos;impatto del tuo brand con campagne pubblicitarie strategiche e mirate. Dalla creatività al risultato, ogni annuncio è progettato per far crescere il tuo business.
            </p>
          </div>
          
          {/* External icon in basso a destra */}
          <div className="absolute bottom-[25px] right-[25px]">
            <img 
              src="/img/icons/External-Link.svg" 
              alt="External link icon"
              width={45}
              height={45}
              className="w-[45px] h-[45px]"
            />
          </div>
        </div>

        {/* Services cards - 45% width */}
        <div className="w-full lg:w-[45%] lg:flex-none">
          {/* Mobile/tablet: animazioni layout mobile */}
          <div className="w-full space-y-2 relative block lg:hidden">
            {services.map((service, index) => (
              <ExpandableServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === service.id}
                onToggle={handleServiceToggle}
                layout="mobile"
              />
            ))}
          </div>
          
          {/* Desktop lg: animazioni layout lg */}
          <div className="hidden lg:block lg:h-full">
            <div className="w-full space-y-2 relative h-full">
              {services.map((service, index) => (
                <ExpandableServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={activeService === service.id}
                  onToggle={handleServiceToggle}
                  layout="lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 