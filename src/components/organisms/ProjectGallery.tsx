import React, { useState } from 'react';
import ImageModal from '../molecules/ImageModal';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[280px]">
        {images.map((url, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? 'md:col-span-2 md:row-span-2' : 
              index % 5 === 1 || index % 5 === 2 ? 'md:row-span-2' : 
              'row-span-1'
            }`}
          >
            <button
              onClick={() => openModal(index)}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full w-full cursor-pointer"
            >
              <img 
                src={url} 
                alt={`${title} - Imagen ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  Ver imagen completa
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <ImageModal
        images={images}
        currentIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
        title={title}
      />

    </>
  );
}
