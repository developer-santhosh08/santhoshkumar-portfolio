import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import SettingsModal from './components/SettingsModal';
import Background from './components/Background';
import { AnimatePresence } from 'framer-motion';
import {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo
} from '@phosphor-icons/react';

// CSS Imports
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-menu.css';
import './assets/css/animate.min.css';
import './assets/css/themify-icons.css';
import './assets/css/elegant-line-icons.css';
import './assets/css/venobox/venobox.css';
import './assets/css/owl.carousel.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/main.css';

function App() {
  const [activeSection, setActiveSection] = React.useState('0');
  const [isLoading, setIsLoading] = React.useState(true);
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');
  const [accentColor, setAccentColor] = React.useState(localStorage.getItem('accentColor') || '#a855f7');
  const [bgVideo, setBgVideo] = React.useState(localStorage.getItem('bgVideo') || '');
  const [showSettings, setShowSettings] = React.useState(false);
  const [menuLayout, setMenuLayout] = React.useState(localStorage.getItem('menuLayout') || 'horizontal');

  const onResetColor = () => {
    setAccentColor('#a855f7');
    localStorage.removeItem('accentColor');
  };

  const onResetBackground = () => {
    setBgVideo('');
    localStorage.removeItem('bgVideo');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  React.useEffect(() => {
    // Add necessary classes to body for the template layout
    if (menuLayout === 'vertical') {
      document.body.classList.add('body-fixed-sidebar');
      document.body.classList.remove('layout-horizontal');
    } else {
      document.body.classList.remove('body-fixed-sidebar');
      document.body.classList.add('layout-horizontal');
    }

    // Apply theme class
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    // Hide loader after 2 seconds to allow assets and brand to show
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 2000);

    // Scroll Spy Logic
    const sectionRatios = {};
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Focus on the middle of the viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    const observer = new IntersectionObserver((entries) => {
      // Home failsafe: If at the very top, prioritize Home
      if (window.scrollY < 100) {
        setActiveSection('0');
        // Still update ratios for consistency
        entries.forEach((entry) => {
          const index = entry.target.getAttribute('data-scroll-index');
          if (index) sectionRatios[index] = entry.intersectionRatio;
        });
        return;
      }

      entries.forEach((entry) => {
        const index = entry.target.getAttribute('data-scroll-index');
        if (index) {
          sectionRatios[index] = entry.intersectionRatio;
        }
      });

      // Find the index with the highest ratio among ALL observed sections
      let finestIndex = activeSection;
      let maxRatio = -1;

      for (const [idx, ratio] of Object.entries(sectionRatios)) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          finestIndex = idx;
        }
      }

      if (maxRatio > 0) {
        setActiveSection(finestIndex);
      }
    }, options);

    // Also add a direct scroll listener for immediate Home activation
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('0');
      }
    };
    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('header[data-scroll-index], section[data-scroll-index]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      document.body.classList.remove('body-fixed-sidebar', 'loaded', 'light-mode');
      clearTimeout(timer);
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme, menuLayout]);

  // Helper to convert hex to rgb for CSS variables
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '197, 164, 130';
  };

  // Update Accent Color
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--accent-color-rgb', hexToRgb(accentColor));
    
    // Dynamic contrast logic: white accent needs black text
    const contrastColor = accentColor.toLowerCase() === '#ffffff' ? '#000000' : '#ffffff';
    document.documentElement.style.setProperty('--accent-contrast', contrastColor);
    
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  React.useEffect(() => {
    localStorage.setItem('menuLayout', menuLayout);
  }, [menuLayout]);

  React.useEffect(() => {
    if (bgVideo) {
      localStorage.setItem('bgVideo', bgVideo);
      document.body.classList.add('has-bg-video');
    } else {
      localStorage.removeItem('bgVideo');
      document.body.classList.remove('has-bg-video');
    }
  }, [bgVideo]);

  return (
    <div className="app-container">
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>

      {!isLoading && (
        <Sidebar
          activeSection={activeSection}
          theme={theme}
          toggleTheme={toggleTheme}
          openSettings={() => setShowSettings(true)}
          layout={menuLayout}
        />
      )}

      <div className="dl-side-content">
        <Hero />
        <About />
        <Resume />
        {/* <Services /> */}
        <Portfolio />
        {/* <Testimonials /> */}

        {/* <section className="cta-section section-padding bd-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 xs-padding">
                <div className="cta-content">
                  <h3>Need a Consultant for Your Business?</h3>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <a href="#" className="default-btn">Hire Me Now!</a>
              </div>
            </div>
          </div>
        </section> */}

        <Contact />

        <footer className="footer-section">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-sm-6">
                <p>© {new Date().getFullYear()} Santhosh  <a href="#" target="_blank"></a></p>
              </div>
              <div className="col-sm-6">
                <div className="footer-social">
                  <a href="https://www.linkedin.com/in/santhosh-kumar-bb39b42bb/" target="_blank" rel="noopener noreferrer" className="social-icon-link"><LinkedinLogo size={24} weight="fill" /></a>
                  <a href="https://github.com/developer-santhosh08" target="_blank" rel="noopener noreferrer" className="social-icon-link"><GithubLogo size={24} weight="fill" /></a>
                  <a href="https://www.instagram.com/_black_crowned_smile" target="_blank" rel="noopener noreferrer" className="social-icon-link"><InstagramLogo size={24} weight="fill" /></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>


      {!isLoading && <ScrollToTop />}

      <Background videoSrc={bgVideo} />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        bgVideo={bgVideo}
        setBgVideo={setBgVideo}
        onResetColor={onResetColor}
        onResetBackground={onResetBackground}
        menuLayout={menuLayout}
        setMenuLayout={setMenuLayout}
      />
    </div>
  );
}

export default App;
