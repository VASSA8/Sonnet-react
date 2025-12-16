import { useState, useEffect, useRef, useCallback } from 'react';
import type { TouchEvent, MouseEvent } from 'react';
import './banner.css';

// Массив изображений для баннера
const bannerImages = [
  { id: 1, src: '/avatar-defolt.jpg', alt: 'Баннер 1' },
  { id: 2, src: '/avatar-defolt.jpg', alt: 'Баннер 1' },
  { id: 3, src: '/avatar-defolt.jpg', alt: 'Баннер 1' },
  { id: 4, src: '/avatar-defolt.jpg', alt: 'Баннер 1' },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Обновляем ширину контейнера при изменении размера окна
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  // Следующий слайд
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
    setDragOffset(0);
  }, []);

  // Предыдущий слайд
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
    setDragOffset(0);
  }, []);

  // Автоматическая прокрутка
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearTimeout(autoSlideRef.current);
    
    autoSlideRef.current = setTimeout(() => {
      nextSlide();
    }, 3000);
  }, [nextSlide]);

  // Остановка автоматической прокрутки при взаимодействии
  const pauseAutoSlide = () => {
    if (autoSlideRef.current) {
      clearTimeout(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      if (autoSlideRef.current) clearTimeout(autoSlideRef.current);
    };
  }, [currentIndex, startAutoSlide]);

  // Перейти к конкретному слайду
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setDragOffset(0);
  };

  // Обработчики свайпа
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    pauseAutoSlide();
    const startX = e.touches[0].clientX;
    setTouchStartX(startX);
    setTouchEndX(startX); // Инициализируем начальное значение
    setIsDragging(true);
    setDragOffset(0);
    
    // Обновляем ширину контейнера при начале свайпа
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = touchStartX - currentX;
    
    // Ограничиваем смещение шириной одного слайда
    const maxDrag = containerWidth * 0.3; // Максимум 30% от ширины слайда
    const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    
    setDragOffset(limitedDiff);
    setTouchEndX(currentX);
  };

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    
    // Определяем минимальное расстояние для свайпа
    const minSwipeDistance = containerWidth * 0.1; // 10% от ширины контейнера
    
    const diff = touchStartX - touchEndX;
    const absDiff = Math.abs(diff);
    
    if (absDiff > minSwipeDistance) {
      if (diff > 0) {
        // Свайп влево -> следующий слайд
        nextSlide();
      } else {
        // Свайп вправо -> предыдущий слайд
        prevSlide();
      }
    } else {
      // Недостаточное расстояние - возвращаем слайд с анимацией
      setDragOffset(0);
    }
    
    // Возобновляем автопрокрутку
    startAutoSlide();
  }, [containerWidth, touchStartX, touchEndX, nextSlide, prevSlide, startAutoSlide]);

  // Обработчики для мыши (десктоп)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    pauseAutoSlide();
    const startX = e.clientX;
    setTouchStartX(startX);
    setTouchEndX(startX); // Инициализируем начальное значение
    setIsDragging(true);
    setDragOffset(0);
    
    // Обновляем ширину контейнера при начале перетаскивания
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = touchStartX - currentX;
    
    // Ограничиваем смещение шириной одного слайда
    const maxDrag = containerWidth * 0.3; // Максимум 30% от ширины слайда
    const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    
    setDragOffset(limitedDiff);
    setTouchEndX(currentX);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  // Сброс при выходе за пределы элемента
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      startAutoSlide();
    }
  };

  // Вычисляем transform без использования refs
  const transformStyle = () => {
    if (containerWidth === 0 || dragOffset === 0) {
      return `translateX(-${currentIndex * 100}%)`;
    }
    
    // Преобразуем пиксели в проценты
    const offsetPercent = (dragOffset / containerWidth) * 100;
    return `translateX(calc(-${currentIndex * 100}% + ${offsetPercent}px))`;
  };

  return (
    <div className="banner-container">
      <div 
        className="banner-wrapper"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="banner-track"
          style={{
            transform: transformStyle(),
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
        >
          {bannerImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`banner-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="banner-image"
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Индикаторы прогресса */}
      <div className="banner-dots">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      {/* Кнопки навигации */}
      <button 
        className="banner-nav prev"
        onClick={prevSlide}
        aria-label="Предыдущий слайд"
      >
        ‹
      </button>
      <button 
        className="banner-nav next"
        onClick={nextSlide}
        aria-label="Следующий слайд"
      >
        ›
      </button>
    </div>
  );
};

export default Banner;