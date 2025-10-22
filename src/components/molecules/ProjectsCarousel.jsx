import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectsCarousel = ({ projects = [], settings = {} }) => {
  const defaultSettings = {
    infinite: true,
    speed: 4000,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 3, 
    slidesToScroll: 1,
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
        },
      },
    ],
    ...settings,
  };
  
  

  return (
    <>
    <Slider {...defaultSettings} className="h-full w-full">
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
