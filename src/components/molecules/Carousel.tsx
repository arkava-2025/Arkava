
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function ImageCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
        
    );

    const images = [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",  
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80", 
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ];

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const apiRef = React.useRef<import("@/components/ui/carousel").CarouselApi | null>(null);

  const handleSetApi = React.useCallback((api?: import("@/components/ui/carousel").CarouselApi) => {
    if (!api) return;
    apiRef.current = api;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    // Limpieza del listener cuando React reprocesa el callback o el componente se desmonta
    return () => {
      try {
        api.off("select", onSelect);
      } catch {}
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Carousel className="w-full h-full" plugins={[plugin.current]} setApi={handleSetApi} opts={{
        loop: true,
        align: "start",
      }}>
        <CarouselContent className="h-full">
          {images.map((src, idx) => (
            <CarouselItem key={src} className="h-full">
              <div className="relative w-full h-[85vh] overflow-hidden">
                <img
                  src={`${src}&w=2560`}
                  srcSet={[
                    `${src}&w=1280 1280w`,
                    `${src}&w=1920 1920w`,
                    `${src}&w=2560 2560w`,
                    `${src}&w=3840 3840w`,
                  ].join(', ')}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
                  alt={`Slide ${idx + 1}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  decoding="async"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                    selectedIndex === idx ? "scale-105" : "scale-100"
                  }`}
                />
                {/* Opcional: degradado inferior para texto futuro sobre la imagen */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
