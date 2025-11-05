import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  title?: string;
}

export default function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  title
}: ImageModalProps) {
  const currentImage = images[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) onPrevious();
          break;
        case 'ArrowRight':
          if (currentIndex < images.length - 1) onNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onNext, onPrevious, onClose]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Dialog.Close className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200">
              <X size={24} />
            </Dialog.Close>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 disabled:opacity-50"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 disabled:opacity-50"
                  disabled={currentIndex === images.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src={currentImage}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                className="max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] md:max-w-[calc(100vw-4rem)] md:max-h-[calc(100vh-4rem)] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
