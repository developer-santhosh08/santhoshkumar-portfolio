import React from 'react';
import { useLanguage, translations } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Loader = () => {
  const { t, language, isFirstVisit } = useLanguage();
  const showTamil = language === 'ta' || isFirstVisit;
  
  // Custom translation helper for the loader
  const getLoaderText = (key) => {
    if (showTamil) {
      return translations.ta[key] || key;
    }
    return t(key);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        color: 'var(--text-color)',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ marginBottom: '30px', width: '100%' }}
        >
          {showTamil && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}
            >
              <img 
                src="/img/barathi.jpeg" 
                alt="Bharathiyar" 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '3px solid var(--accent-color)',
                  boxShadow: '0 0 30px rgba(var(--accent-color-rgb), 0.4)'
                }} 
              />
            </motion.div>
          )}
          <motion.span
            style={{
              fontSize: showTamil ? 'clamp(14px, 4.5vw, 17px)' : 'clamp(16px, 5vw, 20px)',
              textTransform: showTamil ? 'none' : 'uppercase',
              letterSpacing: showTamil ? '0px' : '6px',
              fontFamily: showTamil ? 'inherit' : "'Unbounded', sans-serif",
              fontWeight: showTamil ? 500 : 400,
              color: 'var(--heading-color)',
              display: 'block',
              lineHeight: 1.6,
              maxWidth: showTamil ? '600px' : 'auto',
              margin: '0 auto'
            }}
          >
            {getLoaderText('loadingExp')}
          </motion.span>
          <motion.div
            animate={{ 
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              fontSize: '10px',
              letterSpacing: '2px',
              marginTop: '12px',
              color: 'var(--accent-color)',
              fontFamily: 'var(--mono-font)'
            }}
          >
            {getLoaderText('initializing')}
          </motion.div>
        </motion.div>
        
        <div style={{ 
          width: '140px', 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
            }}
          />
        </div>
        
        {/* Subtle glow behind the loader */}
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(var(--accent-color-rgb), 0.1) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(20px)'
        }} />
      </div>
    </motion.div>
  );
};

export default Loader;
