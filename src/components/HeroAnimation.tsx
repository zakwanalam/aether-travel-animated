import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 442;

const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Map scroll progress (0..1) to frame index (0..FRAME_COUNT - 1)
  // Reversed: [0, 1] -> [FRAME_COUNT - 1, 0] to go from plane to hotel
  const frameIndex = useTransform(scrollYProgress, [0, 1], [FRAME_COUNT - 1, 0]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // Construct filename based on the provided pattern: travel_0XXX_Layer YYY.jpg
        // Note: The original filenames have two numbers that seem related. 
        // Based on the list_dir output: travel_0000_Layer 441.jpg, etc.
        // Wait, let's re-verify the naming pattern.
        // travel_0000_Layer 442.jpg
        // travel_0441_Layer 1.jpg
        const paddedIndex = i.toString().padStart(4, '0');
        const layerIndex = FRAME_COUNT - i;
        img.src = `/frames/travel_${paddedIndex}_Layer ${layerIndex}.jpg`;
        
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setIsLoading(false);
          }
        };
        loadedImages[i] = img;
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const renderFrame = (index: number) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      const img = images[Math.round(index)];

      if (canvas && context && img) {
        // Clear and draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Handle aspect ratio (Cover)
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Update canvas size on resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(frameIndex.get());
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Subscribe to frame index changes
    const unsubscribe = frameIndex.on('change', (latest) => {
      renderFrame(latest);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} style={{ height: '800vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
        <div className="lux-vignette" />
        <div className="lux-scrim-bottom" />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.15)', pointerEvents: 'none', zIndex: 3 }} />
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lux-glass"
            style={{ 
              position: 'absolute', 
              inset: 0, 
              zIndex: 100, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              color: 'white'
            }}
          >
            <h2 style={{ marginBottom: '20px', fontWeight: 200 }}>Arriving in Maldives</h2>
            <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--color-accent)', width: `${loadProgress}%` }}
              />
            </div>
            <p style={{ marginTop: '10px', fontSize: '12px', letterSpacing: '2px' }}>{loadProgress}%</p>
          </motion.div>
        )}
        <canvas 
          ref={canvasRef}
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
        />

        {/* Dynamic Text Overlays synced to Hero Scroll */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
          {/* Section 1 - Intro (Plane) */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, -50]),
              position: 'absolute',
              top: '30%',
              left: '10%',
              maxWidth: '600px'
            }}
          >
            <h1 className="lux-text-gradient lux-text-shadow" style={{ fontSize: '5rem', lineHeight: 1, fontWeight: 300 }}>Aether<br/>Residency</h1>
            <p className="lux-text-shadow" style={{ marginTop: '20px', color: 'var(--color-text)', letterSpacing: '4px', fontSize: '14px', textTransform: 'uppercase' }}>
              Descending into paradise
            </p>
          </motion.div>

          {/* Section 2 - Mid Journey */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0, 1, 0]),
              y: useTransform(scrollYProgress, [0.3, 0.45, 0.6], [50, 0, -50]),
              position: 'absolute',
              top: '50%',
              right: '10%',
              textAlign: 'right',
              maxWidth: '500px'
            }}
          >
            <h2 className="lux-text-shadow" style={{ fontSize: '3.5rem', fontWeight: 400 }}>Horizon Unbound</h2>
            <p className="lux-text-shadow" style={{ marginTop: '20px', color: 'var(--color-text-dim)', letterSpacing: '2px', fontSize: '14px' }}>
              Your journey begins where the ocean meets the infinite sky.
            </p>
          </motion.div>

          {/* Section 3 - The Arrival (Resort) - Centered Flex Container */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            {/* Dark background specifically for this section */}
            <motion.div 
               style={{ 
                 position: 'absolute', 
                 inset: 0, 
                 background: 'black', 
                 opacity: useTransform(scrollYProgress, [0.8, 0.92, 1], [0, 0.5, 0.5]),
                 zIndex: -1 
               }} 
            />
            
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0.8, 0.92, 1], [0, 1, 1]),
                y: useTransform(scrollYProgress, [0.8, 0.92, 1], [50, 0, 0]),
                textAlign: 'center',
                width: '90%',
                maxWidth: '1000px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 1
              }}
            >
              <h2 className="lux-text-shadow" style={{ fontSize: '4.5rem', fontWeight: 200, letterSpacing: '12px' }}>Welcome Home</h2>
              <div style={{ width: '40px', height: '1px', background: 'var(--color-accent)', margin: '40px auto' }} />
              <p className="lux-text-shadow" style={{ color: 'var(--color-text)', letterSpacing: '6px', fontSize: '16px', textTransform: 'uppercase' }}>
                Experience the pinnacle of coastal luxury
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          style={{ 
            position: 'absolute', 
            bottom: '40px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            opacity: useTransform(scrollYProgress, [0, 0.1], [0.6, 0]), 
            fontSize: '10px', 
            letterSpacing: '4px', 
            zIndex: 10 
          }}
        >
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAnimation;
