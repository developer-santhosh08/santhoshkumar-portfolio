import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import TextReveal from './TextReveal';

const ServiceCard = ({ service, index }) => {
  const x = useSpring(0, { damping: 20, stiffness: 150 });
  const y = useSpring(0, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (clientX - centerX) / (width / 2);
    const offsetY = (clientY - centerY) / (height / 2);

    x.set(offsetX * 15); // max rotation 15deg
    y.set(offsetY * -15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="col-md-4 col-sm-6 sm-padding"
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <motion.div
        className="services-item-modern"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY: x,
          rotateX: y,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="card-glow-overlay" style={{ transform: 'translateZ(-20px)' }}></div>
        <div className="icon-wrapper-modern" style={{ transform: 'translateZ(50px)' }}>
          <i className={service.icon}></i>
        </div>
        <h3 style={{ transform: 'translateZ(40px)' }}>{service.title}</h3>
        <p style={{ transform: 'translateZ(30px)' }}>{service.description}</p>
        <div className="energy-dot" style={{ transform: 'translateZ(20px)' }}></div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const services = [
    {
      icon: 'icon-genius',
      title: 'Web Development',
      description: 'Expertly crafting high-performance, responsive websites with state-of-the-art tech stacks.',
      color: 'rgba(var(--accent-color-rgb), 1)',
    },
    {
      icon: 'icon-tools',
      title: 'UX UI Design',
      description: 'Human-centric design approach focused on creating intuitive and visually stunning user journeys.',
      color: 'rgba(var(--accent-color-rgb), 1)',
    },
    {
      icon: 'icon-search',
      title: 'Digital Marketing',
      description: 'Strategic data-driven marketing to scale your digital presence and maximize conversions.',
      color: 'rgba(var(--accent-color-rgb), 1)',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="services"
      className="services-section section-padding bd-bottom"
      data-scroll-index="4"
      style={{ position: 'relative', overflow: 'hidden', perspective: '1200px' }}
    >


      <motion.div
        className="container"
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <div className="section-heading mb-60 flex flex-col items-center">
          <TextReveal
            text="Professional Expertise"
            className="section-title-modern !text-center !justify-center"
            stagger={0.05}
          />
        </div>
        <div className="row">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
