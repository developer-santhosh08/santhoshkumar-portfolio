import React from 'react';
import { motion } from 'framer-motion';

/**
 * TextReveal Component
 * Animates text word-by-word or character-by-character for a premium 'Studio' feel.
 */
const TextReveal = ({
  text,
  className,
  delay = 0,
  stagger = 0.01,
  variant = 'word', // 'word' or 'char'
  once = true,
  threshold = 0.2
}) => {
  const items = variant === 'word' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      },
    },
  };

  const itemVariant = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium quintic easeOut
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: 10,
    },
  };

  return (
    <motion.div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          variants={itemVariant}
          style={{
            display: "inline-block",
            marginRight: variant === 'word' ? "0.25em" : "0",
            whiteSpace: "pre"
          }}
          key={index}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
