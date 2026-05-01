import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import TextReveal from './TextReveal';
import {
  DownloadSimple,
  CaretRight,
  BookmarkSimple,
  IdentificationCard
} from '@phosphor-icons/react';

const BentoCard = ({ children, domain, delay = 0 }) => {
  const containerRef = useRef(null);

  // Mouse position values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position values for background mesh
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Executive Tuning: Subtle tilt for HR Professional look
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // For tilt
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // For mesh glow
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bento-nebula-wrapper"
    >
      <div className="bento-nebula-inner">
        {/* Subtle Mesh Background */}
        <motion.div
          className="bento-mesh-glow"
          style={{
            left: mouseX,
            top: mouseY,
          }}
        />

        {/* Content Layer (Floating) */}
        <div className="bento-content-layer">
          <h4 className="bento-nebula-label">{domain}</h4>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const Resume = () => {
  const { t } = useLanguage();
  const experiences = [
    {
      date: t('exp1_date'),
      title: t('exp1_company'),
      role: t('exp1_role'),
      description: t('exp1_desc'),
      responsibilities: [
        t('exp1_resp1'),
        t('exp1_resp2'),
        t('exp1_resp3'),
        t('exp1_resp4'),
      ]
    },
  ];

  const skillCategories = [
    {
      domain: t('frontend'),
      summary: 'Specializing in high-performance, responsive UIs with extreme focus on seamless UX and pixel-perfect design.',
      highlight: 'Interactivity Expert',
      skills: [
        { name: 'HTML5', icon: '/img/icon/html5.png' },
        { name: 'CSS3', icon: '/img/icon/css3.png' },
        { name: 'Bootstrap', icon: '/img/icon/bootstrap.png' },
        { name: 'Tailwind CSS', icon: '/img/icon/tailwind.png' },
        { name: 'JavaScript (ES6+)', icon: '/img/icon/js.png' },
        { name: 'React.js', icon: '/img/icon/react.png' },
        { name: 'Vue.js', icon: '/img/icon/vue.png' },
        { name: 'WordPress', icon: '/img/icon/wordpress.png' },
      ]
    },
    {
      domain: t('backend'),
      summary: 'Architecting secure, scalable API structures and automated business logic for enterprise-level systems.',
      highlight: 'ERP Logic Architect',
      skills: [
        { name: 'PHP', icon: '/img/icon/php.png' },
        { name: 'Python', icon: '/img/icon/python.png' },
        { name: 'Laravel', icon: '/img/icon/laravel.png' },
        { name: 'CakePHP', icon: '/img/icon/cakephp.png' },
        { name: 'CodeIgniter 4', icon: '/img/icon/codeignitor.png' },
      ]
    },
    {
      domain: t('database'),
      summary: 'Optimizing data integrity, indexing, and complex query performance for large-scale data architecture.',
      highlight: 'System Integrity',
      skills: [
        { name: 'MySQL', icon: '/img/icon/mysql.png' },
        { name: 'PostgreSQL', icon: '/img/icon/postgres.png' },
      ]
    },
    {
      domain: t('devops'),
      summary: 'Ensuring 99.9% uptime and efficient deployment cycles through professional server and VPS management.',
      highlight: 'High Availability',
      skills: [
        { name: 'Hostinger', icon: '/img/icon/hostinger.png' },
        { name: 'Cpanel', icon: '/img/icon/cpanel.png' },
        { name: 'VPS', icon: '/img/icon/vps.jpg' },
      ]
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <section id="resume" className="resume-section section-padding bd-bottom" data-scroll-index="2">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <div className="row">
            {/* Excellent Work Experience Section */}
            <div className="col-lg-6 col-12 sm-padding">
              <div className="section-heading mb-50 flex flex-col items-center lg:items-start">
                <TextReveal
                  text={t('workExperience')}
                  className="section-title-modern !text-center !justify-center lg:!text-left lg:!justify-start whitespace-nowrap"
                  stagger={0.05}
                />
                <div className="accent-line-glow mt-10 lg:ml-0"></div>
              </div>

              <div className="experience-timeline">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="exp-item-excellent"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="exp-side-accent">
                      <div className="exp-dot-glow"></div>
                    </div>

                    <div className="exp-content-box">
                      <div className="exp-header-flex">
                        <span className="exp-date-pill">{exp.date}</span>
                        <BookmarkSimple size={20} weight="fill" className="exp-icon-accent" />
                      </div>

                      <a href="https://ahattrickz.com/" target="_blank"><h3 className="exp-company-title">{exp.title}</h3></a>
                      <h4 className="exp-role-subtitle">{exp.role}</h4>
                      <p className="exp-main-desc">{exp.description}</p>

                      <ul className="exp-bullets-modern">
                        {exp.responsibilities.map((bullet, i) => (
                          <li key={i}>
                            <CaretRight size={14} weight="bold" className="bullet-icon" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Premium Resume Viewer Section */}
            <div className="col-lg-6 col-12 sm-padding">
              <div className="resume-viewer-container" style={{ transform: 'none' }}>
                <div className="viewer-header">
                  <IdentificationCard size={28} weight="duotone" />
                  <h3>{t('resumePreview')}</h3>
                </div>

                <div className="resume-frame-simple" style={{
                  height: '600px',
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transform: 'none'
                }}>
                  <iframe
                    src="/img/santhoshkumar_resume.pdf#toolbar=0&navpanes=0"
                    title="Resume Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      transform: 'none'
                    }}
                  >
                    <p>Your browser does not support iframes.</p>
                  </iframe>
                </div>

                <div className="viewer-footer">
                  <a
                    href="/img/santhoshkumar_resume.pdf"
                    download="Santhosh_Kumar_Resume.pdf"
                    className="download-cv-btn-premium"
                  >
                    <span>{t('downloadResume')}</span>
                    <DownloadSimple size={20} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* World-Class HR-Optimized Tech Stack */}
      <section id="skills" className="skills-section section-padding bd-bottom" data-scroll-index="3">
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-12 mb-80">
              <div className="section-heading flex flex-col items-center">
                <TextReveal
                  text={t('techExpertise')}
                  className="section-title-modern !text-center !justify-center"
                  stagger={0.05}
                />
                <div className="accent-line-glow mt-10 mx-auto"></div>
                <p className="section-subtitle mt-20 py-2">{t('expSubtitle')}</p>
              </div>
            </div>
          </div>

          <div className="bento-nebula-grid">
            {skillCategories.map((cat, idx) => (
              <BentoCard key={idx} domain={cat.domain} delay={idx * 0.1}>
                <div className="nebula-skill-cloud">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      className="nebula-skill-item"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(var(--accent-color-rgb), 0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="nebula-icon-pod">
                        <img src={skill.icon} alt={skill.name} />
                      </div>
                      <span className="nebula-skill-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </BentoCard>
            ))}
          </div>
        </motion.div>
      </section>

      <style>{`
        /* Excellent Experience Styling */
        .experience-timeline {
          position: relative;
          padding-left: 20px;
        }

        .exp-item-excellent {
          position: relative;
          display: flex;
          gap: 30px;
          margin-bottom: 40px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .exp-item-excellent:hover {
          background: rgba(var(--accent-color-rgb), 0.03);
          border-color: rgba(var(--accent-color-rgb), 0.2);
          transform: translateX(10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .exp-side-accent {
          position: absolute;
          left: -21px;
          top: 0;
          height: 100%;
          width: 2px;
          background: linear-gradient(to bottom, var(--accent-color), transparent);
        }

        .exp-dot-glow {
          width: 12px;
          height: 12px;
          background: var(--accent-color);
          border-radius: 50%;
          position: absolute;
          left: -5px;
          top: 40px;
          box-shadow: 0 0 15px var(--accent-color);
        }

        .exp-content-box { width: 100%; }

        .exp-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .exp-date-pill {
          font-size: 0.75rem;
          font-family: 'Space Mono', monospace;
          background: rgba(var(--accent-color-rgb), 0.1);
          color: var(--accent-color);
          padding: 4px 12px;
          border-radius: 100px;
          letter-spacing: 1px;
        }

        .exp-company-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 5px;
        }

        .exp-role-subtitle {
          font-size: 1rem;
          color: var(--accent-color);
          margin-bottom: 15px;
          opacity: 0.8;
        }

        .exp-main-desc {
          font-size: 1rem;
          line-height: 1.7;
          opacity: 0.75;
          margin-bottom: 20px;
        }

        .exp-bullets-modern {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .exp-bullets-modern li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 10px;
          font-size: 0.9rem;
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .exp-bullets-modern li:hover {
          opacity: 1;
          transform: translateX(5px);
        }

        .bullet-icon {
          margin-top: 4px;
          color: var(--accent-color);
        }

        /* Active Nebula Tech Stack Styling */
        .section-subtitle {
          font-family: 'Space Mono', monospace;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 1px;
        }

        .bento-nebula-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 50px;
          perspective: 2000px;
          width: 100%;
        }

        /* Nebula Tiles Architecture */
        .bento-nebula-wrapper {
          position: relative;
          height: 100%;
          transform-style: preserve-3d;
        }

        .bento-nebula-inner {
          position: relative;
          height: 100%;
          background: rgba(10, 10, 15, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 40px 45px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hr-pro-summary {
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.6;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .nebula-expertise-badge {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          background: rgba(var(--accent-color-rgb), 0.1);
          color: var(--accent-color);
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(var(--accent-color-rgb), 0.2);
        }

        .nebula-card-summary {
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 25px;
          text-align: center;
        }

        .bento-mesh-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(var(--accent-color-rgb), 0.1) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
        }

        .bento-content-layer {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .bento-nebula-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 5px;
          color: var(--accent-color);
          margin-bottom: 35px;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.3);
          text-align: center;
          opacity: 1;
        }

        .nebula-skill-cloud {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .nebula-skill-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          width: 100%;
          min-height: 56px;
        }

        .nebula-skill-item:hover {
          background: rgba(var(--accent-color-rgb), 0.12);
          border-color: rgba(var(--accent-color-rgb), 0.4);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .nebula-icon-pod {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
        }

        .nebula-icon-pod img {
          width: 22px;
          height: 22px;
          object-fit: contain;
          opacity: 0.85;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .nebula-skill-item:hover img {
          opacity: 1;
          transform: scale(1.1);
        }

        .nebula-skill-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.75);
          white-space: nowrap;
          letter-spacing: 0.3px;
        }

        .nebula-skill-item:hover .nebula-skill-name {
          color: #fff;
        }

        .bento-circuit-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(var(--accent-color-rgb), 0.3), transparent);
          z-index: 1;
        }

        .bento-circuit-line.top { top: 15%; left: 0; width: 100%; height: 1px; opacity: 0.2; }
        .bento-circuit-line.right { right: 15%; top: 0; width: 1px; height: 100%; opacity: 0.2; }

        @media (max-width: 1300px) {
          .bento-nebula-grid { 
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 30px !important; 
          }
        }

        @media (max-width: 991px) {
          .bento-nebula-grid { 
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 24px !important;
            width: 100% !important;
          }
          .bento-nebula-wrapper {
            width: 100% !important;
            max-width: 500px !important;
          }
          .nebula-skill-cloud { grid-template-columns: 1fr !important; }
          .resume-frame-simple { height: 450px !important; }
          .exp-item-excellent { padding: 20px; gap: 15px; }
        }

        @media (max-width: 642px) {
          .experience-timeline { 
            padding-left: 0 !important; 
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .exp-item-excellent {
            width: 100%;
            max-width: 500px;
          }
          .exp-side-accent { display: none; }
          .accent-line-glow { margin: 10px auto !important; }
          .section-heading { align-items: center !important; text-align: center !important; }
        }

        @media (max-width: 576px) {
          .bento-nebula-inner { padding: 30px 20px !important; }
          .resume-frame-simple { height: 350px !important; }
          .exp-item-excellent { padding: 12px !important; gap: 8px !important; }
          .exp-company-title { font-size: 1.1rem !important; }
          .viewer-header h3 { font-size: 0.85rem !important; }
          .download-cv-btn-premium { 
            font-size: 11px !important; 
            padding: 0 15px !important; 
            height: 36px !important;
            letter-spacing: 0.5px !important; 
          }
        } 

        .viewer-footer {
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }

        .download-cv-btn-premium {
          padding: 0 25px;
          height: 40px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 20px;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .download-cv-btn-premium:hover {
          background: rgba(var(--accent-color-rgb), 0.2);
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(var(--accent-color-rgb), 0.2);
          color: #fff;
        }

        .download-cv-btn-premium:active {
          transform: translateY(-1px);
        }

        @keyframes pulseGlow {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
};

export default Resume;
