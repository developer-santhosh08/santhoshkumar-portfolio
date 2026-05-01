import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import santhoshImg from '../assets/img/santhosh.jpg';
import TextReveal from './TextReveal';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const watermarkZ = useTransform(scrollYProgress, [0, 0.5, 1], [-200, -100, 0]);
  const watermarkRotateX = useTransform(scrollYProgress, [0, 1], [10, -5]);

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const rawImageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageY = useSpring(rawImageY, { stiffness: 100, damping: 30 });

  const rawImageZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 0]);
  const imageZ = useSpring(rawImageZ, { stiffness: 100, damping: 30 });

  const rawImageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const imageRotateX = useSpring(rawImageRotateX, { stiffness: 100, damping: 30 });

  const rawImageRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const imageRotateY = useSpring(rawImageRotateY, { stiffness: 100, damping: 30 });

  const buttonY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const contentRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const rawLineWidth = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const lineWidth = useSpring(rawLineWidth, { stiffness: 100, damping: 30 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="about-section section-padding bd-bottom"
      data-scroll-index="1"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* <motion.div
        style={{
          y: watermarkY,
          z: watermarkZ,
          rotateX: watermarkRotateX,
          transformStyle: "preserve-3d"
        }}
        className="about-watermark"
      >
        ABOUT
      </motion.div> */}

      <motion.div
        className="container"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <div className="row align-items-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            className="col-md-7 sm-padding"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              rotateX: contentRotateX,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="about-content flex flex-col items-center text-center md:items-start md:text-left" style={{ transformStyle: "preserve-3d" }}>
              <div className="flex flex-col items-center md:items-start mb-6">
                <TextReveal
                  text="Let Me Introduce Myself."
                  className="section-title-modern !text-center !justify-center md:!text-left md:!justify-start"
                  stagger={0.05}
                />
                <motion.div
                  className="animated-underline-static mt-1"
                  style={{ width: lineWidth }}
                />
              </div>
              <div className="w-full px-2 py-3 sm:px-0">
                <TextReveal
                  text="Full Stack Developer with 1 year of experience specializing in ERP systems and web applications. Skilled in Laravel, CodeIgniter, React, Vue, and database management, focused on building scalable and efficient business solutions."
                  className="about-description !text-center md:!text-left"
                  delay={0.3}
                  stagger={0.015}
                />
              </div>

              <div className="profile-info-grid w-full grid grid-cols-1 sm:grid-cols-2 justify-items-center md:justify-items-start gap-x-4 gap-y-6 mt-4">
                {[
                  { label: 'Full Name', value: 'Santhosh Kumar' },
                  { label: 'Birth Date', value: '08-07-2004' },
                  { label: 'Address', value: 'Tamil Nadu, India' },
                  { label: 'Email', value: 'dev.santhosh@gmail.com', isEmail: true }
                ].map((info, idx) => (
                  <motion.div key={idx} className="info-item-modern w-full flex flex-col items-center md:items-start" variants={textVariants}>
                    <span className="info-label-mini uppercase tracking-widest text-[9px] opacity-50 mb-1 whitespace-nowrap text-center w-full md:text-left">{info.label}</span>
                    <h5 className="text-[0.7rem] sm:text-[0.9rem] md:text-lg font-bold text-white whitespace-nowrap text-center w-full md:text-left">
                      {info.isEmail ? (
                        <a href={`mailto:${info.value}`} className="info-value-link hover:text-[var(--accent-color)] transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        info.value
                      )}
                    </h5>
                  </motion.div>
                ))}
              </div>

              {/* <motion.div
                variants={textVariants}
                className="mt-5"
                style={{ y: buttonY, transformStyle: "preserve-3d", zIndex: 10 }}
              >
                <div className="d-flex justify-content-start" style={{ transformStyle: "preserve-3d" }}>
                  <a href="/santhosh-cv.pdf" download="Santhosh_Kumar_CV.pdf" className="default-btn">
                    Download CV <i className="ti-download"></i>
                  </a>
                </div>
              </motion.div> */}
            </div>
          </motion.div>

          <div className="col-md-5 sm-padding flex justify-center" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              className="about-image-frame"
              style={{
                y: imageY,
                z: imageZ,
                rotateX: imageRotateX,
                rotateY: imageRotateY,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="profile-frame-outer" style={{ translateZ: "-30px" }}></div>
              <div className="profile-frame-inner" style={{ translateZ: "20px" }}></div>
              <img src={santhoshImg} alt="Portrait" className="about-img-modern circle-profile-img" style={{ translateZ: "50px" }} />
              <div className="profile-light-glow" style={{ translateZ: "-40px" }}></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

