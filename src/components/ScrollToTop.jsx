import React, { useState, useEffect } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Transform scroll progress to water height (e.g. 0 to 100%)
  const waterHeight = useTransform(smoothProgress, [0, 0.9, 1], ["0%", "20%", "100%"]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.div
      className="scroll-to-top"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#1a1a1a',
        cursor: 'pointer',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        border: '2px solid rgba(255,255,255,0.1)'
      }}
    >
      {/* Water Fill Layer */}
      <motion.div
        className="water-fill"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: waterHeight,
          backgroundColor: 'var(--accent-color)',
          zIndex: 1,
          opacity: 0.8
        }}
      >
        {/* Wave Animation SVG */}
        <div className="wave-wrapper" style={{ position: 'absolute', top: '-38px', height: '40px', width: '200%', left: '-50%' }}>
          <svg className="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto" style={{ width: '100%', height: '100%' }}>
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(var(--accent-color-rgb), 0.7)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(var(--accent-color-rgb), 0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(var(--accent-color-rgb), 0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--accent-color)" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Arrow Icon */}
      <ArrowUp size={28} color="white" style={{ zIndex: 2, position: 'relative' }} />
    </motion.div>
  );
};

export default ScrollToTop;
