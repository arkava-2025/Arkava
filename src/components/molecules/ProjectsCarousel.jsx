import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectsCarousel = ({ projects = [], settings = {} }) => {
  const [slidesToShow, setSlidesToShow] = useState(1); // Empezar con 1 por defecto
  const sliderRef = useRef(null);

  // Función para determinar cuántos slides mostrar según el ancho de pantalla
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') return 1;
    
    const width = window.innerWidth;
    if (width >= 1024) return 3; // Desktop
    if (width >= 768) return 2;  // Tablet
    return 1; // Mobile
  };

  useEffect(() => {
    // Establecer el valor inicial correcto
    setSlidesToShow(getSlidesToShow());

    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      const newSlidesToShow = getSlidesToShow();
      setSlidesToShow(newSlidesToShow);
      
      // Forzar actualización del slider
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      setSlidesToShow(getSlidesToShow());
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const defaultSettings = {
    infinite: true,
    speed: 4000,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          speed: 50,
          autoplaySpeed: 500,
        },
      },
    ],
    ...settings,
  };
  
  

  return (
    <>
    <Slider ref={sliderRef} {...defaultSettings} className="h-full w-full">
      {projects.map((project) => (
        <div key={project.slug} className="h-full w-full">
          <a href={`/proyectos/${project.slug}`} className="group flex h-full w-full relative overflow-hidden">

          {/* Overlay */}
          <div className="absolute inset-0 overlay-dark overlay-fade group-hover:overlay-fade--reduced"></div>

            <h4 className="absolute bottom-6 left-4 text-center text-white text-base font-pp-sans px-4 py-2 rounded-lg xl:text-lg" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.5)'}}>
              {project.title}
            </h4>
            <img
              src={project.coverImage?.url}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      ))}
    </Slider>


    <style>
      {`
        .slick-list, .slick-track, .slick-slide, .slick-slide > div {
          height: 100%;
        }
      `}
    </style>
    </>
  );
}



export default ProjectsCarousel;
