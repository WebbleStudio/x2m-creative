export default function Footer() {
  return (
    <footer className="bg-[#131313] text-main-white py-8 px-4 mt-16 border-t" style={{ borderTop: '1px solid rgba(250,250,250,0.2)' }} role="contentinfo">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          {/* Colonna sinistra */}
          <div className="flex flex-row items-center gap-4 md:gap-6">
            <div className="flex flex-row items-end min-h-[70px] gap-4 md:gap-4">
              <div className="flex flex-col items-start">
                <span className="text-sm text-[#fff]/70 mb-1" style={{ transform: 'translateY(20px)' }}>Owner</span>
                <address className="text-2xl font-bold tracking-tight mb-1 not-italic" style={{ transform: 'translateY(10px)' }}>
                  <span itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">X2 Marco</span>
                  </span>
                </address>
              </div>
              <div className="flex gap-4" role="list" aria-label="Social media X2M Creative">
                <a 
                  href="https://www.instagram.com/x2marco/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                                      aria-label="Segui X2M Creative su Instagram (si apre in una nuova finestra)" 
                  className="hover:text-creative-blue transition-colors"
                  role="listitem"
                >
                  <svg width="18" height="18" fill="#ffffff99" viewBox="0 0 24 24" aria-hidden="true">
                    <title>Instagram</title>
                    <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.052.072 5.77.13 4.77.312 4.01.54c-.77.23-1.42.54-2.07 1.19C1.29 2.38.98 3.03.75 3.8.52 4.57.338 5.57.28 6.85.22 8.13.208 8.534.208 12c0 3.466.012 3.87.072 5.15.058 1.28.24 2.28.47 3.05.23.77.54 1.42 1.19 2.07.65.65 1.3.96 2.07 1.19.77.23 1.77.412 3.05.47C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.28-.058 2.28-.24 3.05-.47.77-.23 1.42-.54 2.07-1.19.65-.65.96-1.3 1.19-2.07.23-.77.412-1.77.47-3.05.06-1.28.072-1.684.072-5.15 0-3.466-.012-3.87-.072-5.15-.058-1.28-.24-2.28-.47-3.05-.23-.77-.54-1.42-1.19-2.07C21.22 1.29 20.57.98 19.8.75c-.77-.23-1.77-.412-3.05-.47C15.668.013 15.264 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.844a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@X2Marco" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                                      aria-label="Guarda i video di X2M Creative su YouTube (si apre in una nuova finestra)" 
                  className="hover:text-creative-blue transition-colors"
                  role="listitem"
                >
                  <svg width="18" height="18" fill="#ffffff99" viewBox="0 0 24 24" aria-hidden="true">
                    <title>YouTube</title>
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.379 3.5 12 3.5 12 3.5s-7.379 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.2 0 12 0 12s0 3.8.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.621 20.5 12 20.5 12 20.5s7.379 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.8 24 12 24 12s0-3.8-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

          {/* Linea divisoria verticale */}
          <div className="h-12 border-l border-[#ffffff22] mx-4 mt-6" role="separator" aria-hidden="true" />

          {/* Colonna destra */}
          <div className="flex flex-row items-center gap-4 md:gap-6">
            <div className="flex flex-row items-end min-h-[70px] gap-4 md:gap-4">
              <div className="flex flex-col items-start">
                <span className="text-sm text-[#fff]/70 mb-1">Made by</span>
                <div itemScope itemType="https://schema.org/Organization">
                  <img 
                    src="/img/webble-logo.svg" 
                    alt="Webble Studio - Agenzia di sviluppo web" 
                    className="h-4 w-auto"
                    itemProp="logo"
                  />
                  <meta itemProp="name" content="Webble Studio" />
                  <meta itemProp="url" content="https://webblestudio.com" />
                </div>
              </div>
              <div className="flex gap-4" role="list" aria-label="Social media Webble Studio">
                <a 
                  href="https://www.instagram.com/studiowebble" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Segui Webble Studio su Instagram (si apre in una nuova finestra)" 
                  className="hover:text-creative-blue transition-colors"
                  role="listitem"
                >
                  <svg width="18" height="18" fill="#ffffff99" viewBox="0 0 24 24" aria-hidden="true">
                    <title>Instagram</title>
                    <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.052.072 5.77.13 4.77.312 4.01.54c-.77.23-1.42.54-2.07 1.19C1.29 2.38.98 3.03.75 3.8.52 4.57.338 5.57.28 6.85.22 8.13.208 8.534.208 12c0 3.466.012 3.87.072 5.15.058 1.28.24 2.28.47 3.05.23.77.54 1.42 1.19 2.07.65.65 1.3.96 2.07 1.19.77.23 1.77.412 3.05.47C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.28-.058 2.28-.24 3.05-.47.77-.23 1.42-.54 2.07-1.19.65-.65.96-1.3 1.19-2.07.23-.77.412-1.77.47-3.05.06-1.28.072-1.684.072-5.15 0-3.466-.012-3.87-.072-5.15-.058-1.28-.24-2.28-.47-3.05-.23-.77-.54-1.42-1.19-2.07C21.22 1.29 20.57.98 19.8.75c-.77-.23-1.77-.412-3.05-.47C15.668.013 15.264 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.844a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://webblestudio.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visita il sito web di Webble Studio (si apre in una nuova finestra)" 
                  className="hover:text-creative-blue transition-colors"
                  role="listitem"
                >
                  <svg width="18" height="18" fill="none" stroke="#ffffff99" strokeWidth="1.2" viewBox="0 0 24 24" aria-hidden="true">
                    <title>Sito Web</title>
                    <circle cx="12" cy="12" r="10" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" />
                    <ellipse cx="12" cy="12" rx="4" ry="10" />
                    <ellipse cx="12" cy="12" rx="7" ry="10" />
                    <ellipse cx="12" cy="12" rx="10" ry="7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="text-xs text-[#ffffff99] mt-8 text-center w-full">
          <p itemScope itemType="https://schema.org/Organization">
            © 2025 <span itemProp="name">X2M Creative</span>. Tutti i diritti riservati.
            <span className="sr-only">
              Agenzia creativa specializzata in branding, social media strategy, video making e advertisement per la crescita del brand.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
} 