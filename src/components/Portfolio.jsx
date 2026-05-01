import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import {
  Browser,
  ArrowSquareOut,
  X,
  Monitor,
  RocketLaunch,
  Code,
  Layout,
  Database
} from '@phosphor-icons/react';

const ProjectCard = ({ project, onClick }) => {
  const { t } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"]));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`col-lg-4 col-md-6 padding-15`}
      layout
    >
      <motion.div
        className="portfolio-studio-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onClick={onClick}
      >
        <div className="card-media-box">
          {project.image && (
            <motion.img
              src={project.image}
              alt={project.title}
              className="card-contained-img"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <div className="media-glow-overlay"></div>
        </div>

        <div className="card-info-box" style={{ transform: "translateZ(20px)" }}>
          <div className="project-category-tag">
            {project.categoryLabel}
          </div>

          <h3 className="project-title">{project.title}</h3>
          {/* <span className='project-sub mb-1'>{project.sub}</span> */}

          <div className="tech-ribbon py-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="tech-pill">{tag}</span>
            ))}
          </div>

          <div className="project-actions">
            <button className="preview-trigger-btn">
              <Monitor size={18} weight="bold" />
              <span>{t('livePreview')}</span>
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowSquareOut size={18} weight="bold" />
            </a>
          </div>
        </div>

        {/* Dynamic Highlight Glow */}
        <div className="card-dynamic-glow"></div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('*');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Reset loading state when project changes
  useEffect(() => {
    if (selectedProject) {
      setIsIframeLoading(true);
    }
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: t('proj1_title'),
      sub: t('proj1_desc'),
      category: 'erp',
      categoryLabel: t('proj1_label'),
      url: 'https://erp.macawfit.com/',
      image: '/img/projects/gym_erp.png',
      tags: ['PHP', 'CakePHP', 'MySQL'],
      color: '#a855f7'
    },
    {
      id: 2,
      title: t('proj2_title'),
      category: 'erp',
      categoryLabel: t('proj2_label'),
      url: 'https://erp.thermosen.in/',
      image: '/img/projects/thermistor.png',
      tags: ['PHP', 'MySQL', 'CodeIgniter4' ,'Architecture Design'],
      color: '#ec4899'
    },
    {
      id: 3,
      title: t('proj3_title'),
      category: 'erp',
      categoryLabel: t('proj3_label'),
      url: 'https://newlook.ahattrickz.com/',
      image: '/img/projects/upvc.png',
      tags: ['PHP', 'Real-time Flow', 'MySQL', 'CodeIgniter4'],
      color: '#3b82f6'
    },
    {
      id: 4,
      title: t('proj4_title'),
      category: 'website',
      categoryLabel: t('proj4_label'),
      url: 'https://bluestoneiasacademy.com/',
      image: '/img/projects/ias_academy.png',
      tags: ['Vue','Laravel', 'PHP', 'Clean UI', 'Performance'],
      color: '#10b981'
    },
    {
      id: 5,
      title: t('proj5_title'),
      category: 'website',
      categoryLabel: t('proj5_label'),
      url: 'https://www.autosmsf.com.au/',
      image: '/img/projects/smsf.png',
      tags: ['Wordpress', 'Business UI', 'CSS3'],
      color: '#f59e0b'
    },
    {
      id: 6,
      title: t('proj6_title'),
      category: 'website',
      categoryLabel: t('proj6_label'),
      url: 'https://bangaloretechconference.com/',
      image: '/img/projects/aiconference.png',
      tags: ['Wordpress', 'Business UI', 'CSS3'],
      color: '#06b6d4'
    },
    {
      id: 7,
      title: t('proj7_title'),
      category: 'crm',
      categoryLabel: t('proj7_label'),
      url: 'https://www.bluestoneoverseas.com/admin/',
      image: '/img/projects/AbroadStudiesCRM.png',
      tags: ['PHP', 'CodeIgniter3'],
      color: '#ef4444'
    },
    // { 
    //   id: 8, 
    //   title: 'Ahattrickz Info Tech Pvt. Ltd', 
    //   category: 'website', 
    //   categoryLabel: 'Corporate IT Website',
    //   url: 'https://ahattrickz.com/',
    //   image: '/img/projects/upvc.png',
    //   tags: ['Corporate UI', 'IT Solutions', 'Full Stack'],
    //   color: '#0ea5e9'
    // },
  ];

  const categories = [
    { label: t('allProjects'), value: '*' },
    { label: t('erpSystems'), value: 'erp' },
    { label: t('websites'), value: 'website' },
    { label: t('customCRM'), value: 'crm' },
  ];

  const filteredProjects = filter === '*'
    ? projects
    : projects.filter(p => p.category === filter);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  return (
    <section id="portfolios" className="portfolio-section section-padding bd-bottom" data-scroll-index="5">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
          <div className="row justify-content-center text-center">
            <div className="col-12 col-lg-8 mb-60">
              <div className="section-heading flex flex-col items-center">
                <TextReveal
                  text={t('featuredProjects')}
                  className="section-title-modern !text-center !justify-center"
                  stagger={0.05}
                />
                <div className="accent-line-glow mt-10 mx-auto"></div>
                <p className="section-subtitle mt-20 text-center w-full px-4 mx-auto">{t('projectSubtitle')}</p>
              </div>
            </div>
          </div>

        <div className="portfolio-wrapper">
          {/* Elite Filter Pills */}
          <div className="portfolio-filter-container mb-50">
            <div className="filter-pills">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  className={`filter-pill ${filter === cat.value ? 'active' : ''}`}
                  onClick={() => setFilter(cat.value)}
                >
                  {filter === cat.value && (
                    <motion.div
                      layoutId="filter-bg"
                      className="filter-bg-active"
                      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    />
                  )}
                  <motion.span
                    className="pill-text"
                    animate={{ color: filter === cat.value ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {cat.label}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>

          <div className="row portfolio-items-elite">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}

              {/* Coming Soon Card */}
              <motion.div
                layout
                className="col-lg-4 col-md-6 padding-15"
              >
                <div className="portfolio-studio-card coming-soon-card">
                  <div className="card-glass-overlay"></div>
                  <div className="portfolio-card-content justify-center align-center">
                    <RocketLaunch size={48} weight="duotone" className="pulse-icon" />
                    <h3 className="project-title mt-20">{t('saasProject')}</h3>
                    <p className="coming-soon-text">{t('comingSoon')}</p>
                    <div className="tech-ribbon mt-10">
                      <span className="tech-pill">Next.js 14</span>
                      <span className="tech-pill">AI Engine</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Elite Project Console Modal - Portal for Top-Level Stacking */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="project-console-overlay"
            >
              {/* High-Visibility Floating Close Button */}
              <motion.button
                className="console-floating-close"
                onClick={() => setSelectedProject(null)}
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, backgroundColor: "#ff5f56", rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={26} weight="bold" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="project-console-window"
              >
                <div className="console-header">
                  <div className="console-controls">
                    <div className="control-dot red" onClick={() => setSelectedProject(null)}></div>
                    <div className="control-dot yellow"></div>
                    <div className="control-dot green"></div>
                  </div>

                  <div className="console-address-bar">
                    <Browser size={16} />
                    <span>{selectedProject.url}</span>
                  </div>

                  <div className="console-actions">
                    <motion.a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="console-gateway-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* <span>Full Access</span> */}
                      <ArrowSquareOut size={16} weight="bold" />
                    </motion.a>

                    <button className="console-close" onClick={() => setSelectedProject(null)}>
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="console-body">
                  <AnimatePresence>
                    {isIframeLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="console-loader-overlay"
                      >
                        <div className="loader-orbit-container">
                          <motion.div
                            className="loader-orbit"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="loader-inner-dot"></div>
                        </div>
                        <p className="loading-text">{t('secureConnection')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <iframe
                    src={selectedProject.url}
                    title={selectedProject.title}
                    className="project-iframe"
                    style={{ opacity: isIframeLoading ? 0 : 1 }}
                    onLoad={() => setIsIframeLoading(false)}
                  ></iframe>

                  {/* Fallback & Safety Info */}
                  <div className="iframe-safety-bar">
                    <p>{t('iframeSafety')}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .portfolio-section { position: relative; overflow: hidden; }

        .portfolio-filter-container {
          display: flex;
          justify-content: center;
        }
          .tech-ribbon {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

        .filter-pills {
          display: flex;
          gap: 10px;
          background: rgba(255,255,255,0.03);
          padding: 6px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
        }

        .filter-pill {
          position: relative;
          padding: 8px 24px;
          border-radius: 100px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .filter-pill.active { color: var(--accent-contrast); }

        .filter-bg-active {
          position: absolute;
          inset: 0;
          background: var(--accent-color);
          border-radius: 100px;
          box-shadow: 0 4px 15px rgba(var(--accent-color-rgb), 0.3);
          z-index: 0;
        }

        .pill-text { position: relative; z-index: 1; }

        .portfolio-studio-card { 
          position: relative; 
          background: #0d0f14;
          border-radius: 20px;
          min-height: 420px;
          height: auto;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          margin-bottom: 40px;
        }

        .portfolio-studio-card:hover {
          border-color: rgba(var(--accent-color-rgb), 0.4);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .card-media-box {
          position: relative;
          height: 55%;
          width: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .card-contained-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
        }

        .media-glow-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(var(--accent-color-rgb), 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .card-info-box {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: linear-gradient(to bottom, #11141a, #0d0f14);
        }

        .project-category-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .project-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .tech-pill {
          font-size: 0.72rem;
          padding: 4px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        .project-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: auto;
        }

        .preview-trigger-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #000;
          border: none;
          padding: 0 24px;
          height: 44px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .preview-trigger-btn:hover {
          background: var(--accent-color);
          color: var(--accent-contrast);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(var(--accent-color-rgb), 0.3);
        }

        .preview-trigger-btn:hover span,
        .preview-trigger-btn:hover svg {
          color: var(--accent-contrast) !important;
        }

        .external-link-btn {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          color: #fff;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .external-link-btn:hover {
          background: var(--accent-color);
          color: var(--accent-contrast);
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(var(--accent-color-rgb), 0.3);
          border-color: var(--accent-color);
        }

        .external-link-btn:hover svg {
          color: var(--accent-contrast) !important;
        }

        .coming-soon-card {
           background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.05), transparent);
           border-style: dashed;
           justify-content: center;
           align-items: center;
           text-align: center;
        }

        .coming-soon-text { color: rgba(255,255,255,0.3); font-family: 'Space Mono', monospace; }
        
        .pulse-icon {
          color: var(--accent-color);
          animation: pulseIcon 3s infinite ease-in-out;
        }

        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 15px var(--accent-color)); }
        }

        /* Console Modal Styling */
        .project-console-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(30px);
          z-index: 100000000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 0;
          overflow-y: auto;
        }

        .console-floating-close {
          position: fixed;
          top: 25px;
          right: 25px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100000001;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(20px);
        }

        .console-floating-close:hover {
          background: #ff5f56;
          transform: rotate(90deg) scale(1.1);
        }

        .project-console-window {
          width: 96%;
          max-width: 1440px;
          height: 92vh;
          margin-top: 4vh;
          background: #0d0f14;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 100px 200px rgba(0,0,0,0.9);
          position: relative;
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .project-console-window {
            width: 100%;
            height: 100vh;
            margin-top: 0;
            border-radius: 0;
          }
          .console-header {
            padding: 10px 15px;
          }
          .console-address-bar {
            display: none;
          }
          .console-floating-close {
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
          }
        }

        /* Acrylic Header Effect */
        .console-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          background: rgba(30, 34, 40, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); /* Inner Rim Glow */
          flex-shrink: 0;
          z-index: 10;
        }

        .console-controls { 
          display: flex; 
          gap: 12px; 
          min-width: 120px;
        }
        
        .control-dot { 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          cursor: pointer; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .control-dot:hover { transform: translateY(-1px) scale(1.2); filter: brightness(1.2); }
        .control-dot.red { background: #ff5f56; border: 0.5px solid rgba(0,0,0,0.2); }
        .control-dot.yellow { background: #ffbd2e; border: 0.5px solid rgba(0,0,0,0.2); }
        .control-dot.green { background: #27c93f; border: 0.5px solid rgba(0,0,0,0.2); }

        .console-address-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,0.4);
          padding: 6px 24px;
          border-radius: 12px;
          width: 45%;
          border: 1px solid rgba(255,255,255,0.04);
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .console-address-bar:hover {
          background: rgba(0,0,0,0.6);
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.1);
        }

        .console-actions { 
          display: flex; 
          align-items: center; 
          gap: 20px; 
          color: rgba(255,255,255,0.4);
          min-width: 120px;
          justify-content: flex-end;
        }
        
        .console-close { 
          background: transparent; 
          border: none; 
          color: inherit; 
          cursor: pointer; 
          transition: color 0.3s, transform 0.2s; 
        }
        
        .console-close:hover { color: #fff; transform: scale(1.1); }

        .console-body { 
          flex: 1; 
          position: relative; 
          background: #000;
          overflow: hidden;
        }

        .console-loader-overlay {
          position: absolute;
          inset: 0;
          background: #0d0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
          padding: 20px;
          text-align: center;
        }

        .loader-orbit-container {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .loader-orbit {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid rgba(var(--accent-color-rgb), 0.1);
          border-top: 3px solid var(--accent-color);
          border-radius: 50%;
        }

        .loader-inner-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-color);
          border-radius: 50%;
          box-shadow: 0 0 15px var(--accent-color);
          animation: pulseDot 1.5s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        .loading-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          max-width: 250px;
        }
        
        .project-iframe { 
          width: 100%; 
          height: 100%; 
          border: none;
          opacity: 1;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .iframe-safety-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(26, 29, 35, 0.95);
          backdrop-filter: blur(10px);
          padding: 10px 30px;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          text-align: center;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .portfolio-section { padding-top: 60px; padding-bottom: 60px; }
          .section-title-modern { font-size: 1.8rem !important; margin-bottom: 10px !important; }
          .section-subtitle { font-size: 0.85rem !important; max-width: 90%; margin: 0 auto !important; line-height: 1.6; }
          
          .portfolio-filter-container {
            margin-bottom: 30px;
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .filter-pills {
            overflow-x: auto;
            display: flex;
            flex-wrap: nowrap;
            max-width: 100vw;
            padding: 8px 20px 15px; /* Added bottom padding for scrollbar */
            gap: 12px;
            border-radius: 0;
            background: transparent;
            border: none;
          }
          
          .filter-pills::-webkit-scrollbar {
            height: 3px;
          }

          .filter-pills::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }

          .filter-pills::-webkit-scrollbar-thumb {
            background: var(--accent-color);
            border-radius: 10px;
            box-shadow: 0 0 10px var(--accent-color);
          }

          .filter-pill {
            padding: 8px 20px;
            font-size: 0.75rem;
            flex-shrink: 0;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
          }

          .filter-pill.active {
            background: var(--accent-color);
            border-color: var(--accent-color);
          }

          .portfolio-studio-card { 
            width: 94% !important;
            margin: 0 auto 30px !important;
            min-height: 480px !important; 
            border-radius: 30px !important; /* Premium rounded aesthetic */
          }
          
          .project-title { font-size: 1.25rem !important; }
          .preview-trigger-btn { padding: 0 12px !important; font-size: 0.8rem !important; }
          .card-info-box { padding: 20px !important; }
          .portfolio-items-elite { justify-content: center !important; }
          .project-console-overlay { padding: 0; }
          .project-console-window { border-radius: 0; }
          .console-address-bar { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
