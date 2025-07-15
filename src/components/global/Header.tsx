"use client"; // Add this directive

import Image from "next/image"; // Import the Next.js Image component
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import { useScrollEffect } from "@/components/animations/useScrollEffect"; // Import the custom hook
import { useState, useEffect } from "react";

export default function Header() {
  const isScrolled = useScrollEffect(50, 200); // 200ms delay
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Check if we're in admin dashboard
  const isAdminDashboard = pathname?.startsWith('/admin/dashboard');

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isClient) return;
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isClient]);

  const handleNavigation = (to: string, label: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    if (pathname === '/') {
      // Se siamo già sulla homepage, fai scroll alla sezione
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigazione client-side verso la homepage con hash
      router.push(`/#${to}`);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { type: 'link' as const, href: "/", label: "Home" },
    { type: 'scroll' as const, to: "services", label: "Servizi", smooth: true, duration: 600 },
    { type: 'link' as const, href: "/progetti", label: "Il nostro lavoro" },
  ];

  return (
    <>
      <header
        className={`
          ${isAdminDashboard ? 'bg-main-white' : (isScrolled ? 'bg-main-white' : 'bg-transparent')} text-main-black px-[15px] sm:px-5 md:px-[30px]
          fixed top-0 left-0 right-0 z-50 
          ${isAdminDashboard ? '' : 'transition-all duration-300 ease-in-out'}
          ${isAdminDashboard ? 'h-[70px]' : (isScrolled ? 'h-[70px]' : 'h-[90px]')}
        `}
      >
        <div className="relative w-full max-w-[1300px] 2xl:max-w-[1650px] mx-auto h-full flex items-center justify-between">
          {/* Left Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.type === 'link' ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-raleway text-[16px] text-main-black hover:text-creative-blue transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                pathname === '/' ? (
                  <ScrollLink
                    key={link.label}
                    to={link.to}
                    smooth={link.smooth}
                    duration={link.duration}
                    offset={-80}
                    className="font-raleway text-[16px] text-main-black hover:text-creative-blue transition-colors duration-200 cursor-pointer"
                    activeClass="text-creative-blue"
                  >
                    {link.label}
                  </ScrollLink>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavigation(link.to, link.label)}
                    className="font-raleway text-[16px] text-main-black hover:text-creative-blue transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                )
              )
            ))}
          </nav>

          {/* Logo - Centered on Desktop using absolute positioning, normal flow on mobile */}
          <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Link href="/" aria-label="X2M Homepage">
              <Image
                src="/img/X2M.png" // Path relative to the public directory
                alt="X2M Logo"
                width={75} // Placeholder width, adjust as needed
                height={40} // Placeholder height, adjust as needed
                priority // Add priority if it's an LCP element
                className={`${isAdminDashboard ? 'scale-90' : `transition-all duration-300 ease-in-out ${isScrolled ? 'scale-90' : 'scale-100'}`}`}
                style={{height: 'auto'}}
              />
            </Link>
          </div>

          {/* Right Navigation Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://www.behance.net/marcoibrahim1?locale=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="font-raleway text-[16px] border-2 border-main-black text-main-black px-4 py-2 rounded-lg hover:bg-main-black hover:text-main-white transition-colors duration-200"
            >
              Portfolio
            </a>
            {pathname === '/' ? (
              <ScrollLink
                to="contact"
                smooth={true}
                duration={600}
                offset={-80}
                className="font-raleway text-[16px] bg-main-black text-main-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 cursor-pointer"
                activeClass="bg-opacity-80"
              >
                Contattaci
              </ScrollLink>
            ) : (
              <button
                onClick={() => handleNavigation('contact', 'Contattaci')}
                className="font-raleway text-[16px] bg-main-black text-main-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 cursor-pointer"
              >
                Contattaci
              </button>
            )}
          </div>

          {/* Burger Menu Icon - Mobile */}
          {!isClient || !isMobileMenuOpen ? (
            <button 
              className={`p-2 lg:hidden ml-auto transition-colors duration-300 relative z-[1001] text-current`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Apri menu mobile"
            >
              <div className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
                <span 
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out transform origin-center rotate-0 translate-y-0`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out opacity-100 scale-100`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out transform origin-center rotate-0 translate-y-0`}
                />
              </div>
            </button>
          ) : null}
        </div>
      </header>

            {/* Mobile Menu Overlay */}
      {isClient && (
        <div 
          className={`fixed inset-0 z-[1000] lg:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible'
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black backdrop-blur-md transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? 'bg-opacity-70' : 'bg-opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            className={`absolute top-0 right-0 h-full w-full bg-black backdrop-blur-lg transition-all duration-500 ease-out ${
              isMobileMenuOpen ? 'translate-x-0 bg-opacity-70' : 'translate-x-full bg-opacity-0'
            }`}
          >
          <div className="flex flex-col items-center justify-center h-full px-8 space-y-8">
            {/* Navigation Links */}
            {navLinks.map((link, index) => (
              <div
                key={link.label}
                className={`transition-all duration-700 ease-out ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 150}ms` : '0ms' 
                }}
              >
                {link.type === 'link' ? (
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="font-raleway text-3xl sm:text-4xl text-white hover:text-creative-blue transition-colors duration-300 block text-center"
                  >
                    {link.label}
                  </Link>
                ) : (
                  pathname === '/' ? (
                    <ScrollLink
                      to={link.to}
                      smooth={link.smooth}
                      duration={link.duration}
                      offset={-80}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-raleway text-3xl sm:text-4xl text-white hover:text-creative-blue transition-colors duration-300 cursor-pointer block text-center"
                    >
                      {link.label}
                    </ScrollLink>
                  ) : (
                    <button
                      onClick={() => handleNavigation(link.to, link.label)}
                      className="font-raleway text-3xl sm:text-4xl text-white hover:text-creative-blue transition-colors duration-300 cursor-pointer block text-center"
                    >
                      {link.label}
                    </button>
                  )
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-col items-center space-y-6 mt-8 w-48">
              <div
                className={`transition-all duration-700 ease-out ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${navLinks.length * 150}ms` : '0ms' 
                }}
              >
                <a
                  href="https://www.behance.net/marcoibrahim1?locale=it_IT"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="font-raleway text-xl border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-300 block text-center w-full box-border"
                >
                  Portfolio
                </a>
              </div>
              
              <div
                className={`transition-all duration-700 ease-out ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 150}ms` : '0ms' 
                }}
              >
                {pathname === '/' ? (
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-raleway text-xl bg-white text-black px-8 py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 cursor-pointer block text-center w-full box-border"
                  >
                    Contattaci
                  </ScrollLink>
                ) : (
                  <button
                    onClick={() => handleNavigation('contact', 'Contattaci')}
                    className="font-raleway text-xl bg-white text-black px-8 py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 cursor-pointer block text-center w-full box-border"
                  >
                    Contattaci
                  </button>
                )}
              </div>
            </div>
                     </div>
         </div>
       </div>
       )}
     {/* X button sopra overlay, solo quando menu mobile è aperto */}
      {isClient && isMobileMenuOpen && (
        <button
          className="fixed top-5 right-5 z-[1001] p-2 text-white lg:hidden animate-xfadein"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Chiudi menu mobile"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
            <span className="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out transform origin-center rotate-45 translate-y-2" />
            <span className="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out opacity-0 scale-0" />
            <span className="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out transform origin-center -rotate-45 -translate-y-2" />
          </div>
        </button>
      )}
     {/* Animazione fade-in e scale per la X */}
     <style jsx global>{`
       @keyframes xfadein {
         0% { opacity: 0; transform: scale(0.7) translateY(-10px); }
         100% { opacity: 1; transform: scale(1) translateY(0); }
       }
       .animate-xfadein {
         animation: xfadein 0.35s cubic-bezier(0.4,0,0.2,1);
       }
     `}</style>
     </>
   );
 }  