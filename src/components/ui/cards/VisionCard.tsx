"use client"; // Cards will likely have interactions

import Image from 'next/image'; // Import next/image
import RedlineReveal from '../../animations/effects/RedlineReveal'; // Import the new animation component
import ScaleOnActive from '../../animations/transitions/ScaleOnActive'; // Import ScaleOnActive
import TranslateOnActive from '../../animations/transitions/TranslateOnActive'; // Import TranslateOnActive

interface VisionCardProps {
  title: string;
  cardNumber: number;
  content: string;
  imageUrl?: string; // Added imageUrl prop
  overlayImageUrl?: string; // Added overlayImageUrl prop
  animateOverlay?: boolean; // Added prop to control overlay animation
  onClick?: () => void;
  isActive?: boolean; // To potentially style the active/front card
  zIndex?: number;
  transform?: string;
  size?: 'lg'; // Nuova prop opzionale
}

export default function VisionCard({
  title,
  cardNumber,
  content,
  imageUrl,
  overlayImageUrl, // Destructure overlayImageUrl
  animateOverlay = false, // Default to false if not provided
  onClick,
  isActive = false,
  zIndex,
  transform,
  size
}: VisionCardProps) {
  const lampScale = 1.15;
  const toolsScale = 1 / lampScale; // Approx 0.8695

  return (
    <div
      onClick={onClick}
      onTouchEnd={onClick}
      className={`
        w-80 h-72 bg-main-black text-main-white rounded-[25px] 
        border border-main-white/40 
        flex flex-col justify-start items-center p-4  /* Changed justify-center to justify-start */
        cursor-pointer select-none 
        transition-all duration-500 ease-in-out
        ${isActive ? 'border-1 border-creative-blue' : 'border-main-white/40'}
        ${size === 'lg' ? 'lg:w-[340px] lg:h-[320px] lg:p-6 2xl:w-[420px] 2xl:h-[380px] 2xl:p-10' : ''}
      `}
      style={{
        zIndex: zIndex,
        transform: transform,
      }}
    >
      <h3 className={`text-3xl font-semibold mt-2 mb-4 w-full text-center ${size === 'lg' ? 'lg:text-3xl' : ''}`}>{title}</h3>
      <div className="flex-grow flex items-center justify-center w-full relative"> {/* Added position: relative here */}
        {imageUrl && (
          title === "Creativo" ? (
            <ScaleOnActive isActive={isActive} targetScale={lampScale} className="z-0" >
              <div style={{ transform: 'translateY(-15px)' }}>
                <Image 
                  src={imageUrl} 
                  alt={`Image for ${title}`}
                  width={230}
                  height={130}
                  className="object-contain"
                  style={{height: 'auto'}}
                />
              </div>
            </ScaleOnActive>
          ) : title === "Affidabile" ? (
            <TranslateOnActive isActive={isActive} initialX={10} activeX={0} className="z-0">
              <Image 
                src={imageUrl} 
                alt={`Image for ${title}`}
                width={220}
                height={120}
                className="object-contain"
                style={{height: 'auto'}}
              />
            </TranslateOnActive>
          ) : (
            <Image 
              src={imageUrl} 
              alt={`Image for ${title}`}
              width={270}
              height={160}
              className="object-contain z-0"
              style={{height: 'auto'}}
            />
          )
        )}
        {overlayImageUrl && (
          animateOverlay ? (
            <RedlineReveal
              src={overlayImageUrl}
              alt={`Overlay for ${title}`}
              width={270}
              height={160}
              isActive={isActive}
              className="absolute top-7 left-2 z-10"
            />
          ) : title === "Creativo" ? (
            <ScaleOnActive isActive={isActive} targetScale={toolsScale} className="absolute top-0 left-2 z-10">
              <Image
                src={overlayImageUrl}
                alt={`Overlay for ${title}`}
                width={270}
                height={160}
                className="object-contain"
                style={{height: 'auto'}}
              />
            </ScaleOnActive>
          ) : title === "Affidabile" ? (
            <TranslateOnActive 
              isActive={isActive} 
              initialX={0} 
              activeX={10}
              className="absolute top-5 left-15 z-10"
            >
              <Image
                src={overlayImageUrl}
                alt={`Overlay for ${title}`}
                width={130}
                height={90}
                className="object-contain"
                style={{height: 'auto'}}
              />
            </TranslateOnActive>
          ) : (
            <Image
              src={overlayImageUrl}
              alt={`Overlay for ${title}`}
              width={20}
              height={160}
              className="object-contain absolute top-7 left-2 z-10"
              style={{height: 'auto'}}
            />
          )
        )}
        {!imageUrl && !overlayImageUrl && (
          <p className="text-sm">{content}</p> /* Smaller text for content if no image */
        )}
      </div>
    </div>
  );
} 