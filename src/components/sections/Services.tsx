"use client";

import { useState } from 'react';
import ExpandableServiceCard from '../animations/ExpandableServiceCard';

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'video-making',
      title: 'Video Making',
      content: {
        intro: 'Trasformiamo le tue idee in video coinvolgenti e professionali.',
        points: [
          'Concept e storytelling creativo',
          'Riprese con equipment professionale', 
          'Editing e post-produzione avanzata',
          'Ottimizzazione per ogni piattaforma'
        ]
      }
    },
    {
      id: 'social-media',
      title: 'Social Media Strategy',
      content: {
        intro: 'Strategie social personalizzate per far crescere il tuo brand online.',
        points: [
          'Analisi del target e competitor',
          'Piano editoriale strategico',
          'Creazione contenuti mirati',
          'Community management e crescita organica'
        ]
      }
    },
    {
      id: 'branding',
      title: 'Branding e visual identity',
      content: {
        intro: 'Identità visive uniche che raccontano davvero il tuo brand.',
        points: [
          'Naming e brand positioning',
          'Logo design e brand identity',
          'Palette colori e typography',
          'Brand guidelines complete'
        ]
      }
    },
    {
      id: 'contact',
      title: 'Contattaci',
      content: {
        intro: 'Iniziamo insieme il tuo progetto con una consulenza gratuita.',
        points: [
          'Call strategica di 30 minuti',
          'Analisi personalizzata dei tuoi obiettivi',
          'Proposta su misura per le tue esigenze',
          'Nessun impegno, solo valore'
        ]
      },
      calendly: true
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="relative w-full min-h-[700px] md:min-h-[800px] lg:min-h-[850px] xl:min-h-[900px] flex flex-col items-center justify-center overflow-hidden py-16">
      <header className="sr-only">
        <h2>I Nostri Servizi Creativi</h2>
        <p>Scopri i servizi di X2M Creative: advertisement, video making, social media strategy e branding per far crescere il tuo brand.</p>
      </header>
      
      {/* Layout responsive: mobile/tablet verticale, lg orizzontale */}
      <div className="w-full flex flex-col lg:flex-row lg:gap-6 lg:h-[500px]">
        {/* Advertisement box - 55% width */}
        <article 
          className="w-full lg:w-[55%] h-[480px] lg:h-[540px] bg-gray-400 rounded-[30px] flex items-start justify-start p-[35px] mb-6 lg:mb-0 relative"
          style={{
            backgroundImage: "url('/img/adv.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          itemScope
          itemType="https://schema.org/Service"
        >
          <div className="flex flex-col">
            <h3 className="font-raleway font-semibold text-[30px] 2xl:text-[40px] text-[#0c0c0c] mb-4" itemProp="name">
              Advertisement
            </h3>
            <p className="font-raleway font-medium text-[15px] lg:text-[18px] text-[#0c0c0c] max-w-2xl" itemProp="description">
              Massimizziamo l&apos;impatto del tuo brand con campagne pubblicitarie strategiche e mirate. Dalla creatività al risultato, ogni annuncio è progettato per far crescere il tuo business.
            </p>
                          <meta itemProp="provider" content="X2M Creative" />
            <meta itemProp="serviceType" content="Advertisement Services" />
          </div>
          
          {/* External icon in basso a destra */}
          <div className="absolute bottom-[25px] right-[25px]" aria-hidden="true">
            <img 
              src="/img/icons/External-Link.svg" 
              alt="Icona link esterno per servizio Advertisement"
              width={45}
              height={45}
              className="w-[45px] h-[45px]"
              loading="lazy"
            />
          </div>
        </article>

        {/* Services cards - 45% width */}
        <aside className="w-full lg:w-[45%] lg:flex-none" role="complementary" aria-label="Altri servizi creativi">
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
        </aside>
      </div>
    </section>
  );
} 