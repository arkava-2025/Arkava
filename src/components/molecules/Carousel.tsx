
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function ImageCarousel({ images }: { images: { url: string }[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
        
    );

    // images are passed from Astro as an array of objects with a `url` field

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
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="h-full">
              <div className="relative w-full h-[85vh] overflow-hidden">
                <img
                  src={img.url}
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
