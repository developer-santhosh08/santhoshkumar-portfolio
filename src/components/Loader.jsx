import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
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
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          fontSize: '4rem',
          fontFamily: "'Teko', sans-serif",
          letterSpacing: '10px',
          fontWeight: 600,
          color: 'var(--accent-color)',
          textTransform: 'uppercase'
        }}
      >
        Santhosh Kumar
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          height: '2px',
          backgroundColor: 'var(--accent-color)',
          marginTop: '10px',
          boxShadow: '0 0 10px var(--accent-color)'
        }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '15px',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontFamily: "'Open Sans', sans-serif"
        }}
      >
        Loading Experience...
      </motion.span>
    </motion.div>
  );
};

export default Loader;
