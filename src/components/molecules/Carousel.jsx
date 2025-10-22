import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({
  children,
  settings = {},
  className = "",
}) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
    ...settings,
  };

  return (
    <div className={`h-full ${className}`}>
      <Slider {...defaultSettings}>{children}</Slider>

      <style>
      {`
        .slick-slider, .slick-list, .slick-track, .slick-slide, .slick-slide > div {
          height: 100%;
        }
      `}
    </style>
    </div>
  );
};

export default Carousel;
