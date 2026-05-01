import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  CaretRight
} from '@phosphor-icons/react';
import TextReveal from './TextReveal';

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: ['a Full Stack Developer'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      backDelay: 1500,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  const bgVariants = {
    hidden: { y: "0%", opacity: 0 },
    visible: {
      y: "-50%",
      opacity: 1,
      transition: { duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.2 }
    }
  };

  return (
    <section id="home" className="hero-section bd-bottom" data-scroll-index="0">
      <motion.div
        className="hero-aurora-glow"
        style={{ x: "-50%", left: "50%", top: "100%" }}
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>
      <motion.div
        className="hero-aurora-pinch"
        style={{ x: "-50%", left: "50%", top: "100%" }}
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>
      <motion.div
        className="hero-aurora-beam"
        style={{ x: "-50%", left: "50%", top: "100%" }}
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <motion.div
            className="col-lg-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="hero-content">
              <TextReveal
                text="Hello, my name is"
                className="text-accent hero-intro-mini"
                delay={0.1}
                stagger={0.02}
              />
              <TextReveal
                text="Santhosh Kumar"
                className="hero-name-modern"
                variant="word"
                delay={0.2}
                stagger={0.05}
              />
              <div className="overflow-hidden w-full flex justify-center mt-2">
                <motion.h2 
                  initial={typeof window !== 'undefined' && window.innerWidth < 576 ? { opacity: 0, y: 0 } : "hidden"}
                  whileInView={typeof window !== 'undefined' && window.innerWidth < 576 ? { opacity: 1, y: 0 } : "visible"}
                  animate={typeof window !== 'undefined' && window.innerWidth < 576 ? {
                    x: ["25%", "-25%"],
                    transition: { 
                      duration: 8, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "linear",
                      opacity: { duration: 1 }
                    }
                  } : {}}
                  className="hero-typed-modern text-[0.8rem] sm:text-[1.6rem] md:text-[2.2rem] whitespace-nowrap"
                >
                  {typeof window !== 'undefined' && window.innerWidth < 576 ? (
                    <>I'm <span className="text-[var(--accent-color)]">a Full Stack Developer</span></>
                  ) : (
                    <>I'm <span ref={el} className="typed text-[var(--accent-color)]"></span></>
                  )}
                </motion.h2>
              </div>

              <motion.ul variants={textVariants} className="hero-social-modern justify-content-center mt-6 mb-8">
                <li>
                  <a
                    href="https://www.linkedin.com/in/santhosh-kumar-bb39b42bb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                  >
                    <LinkedinLogo size={24} weight="fill" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/developer-santhosh08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                  >
                    <GithubLogo size={24} weight="fill" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/_black_crowned_smile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                  >
                    <InstagramLogo size={24} weight="fill" />
                  </a>
                </li>
              </motion.ul>
              <motion.div variants={textVariants} className="d-flex justify-content-center mt-4">
                <a href="#contact" className="default-btn flex items-center gap-2 group">
                  <span>Hire Me Now</span>
                  <CaretRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
