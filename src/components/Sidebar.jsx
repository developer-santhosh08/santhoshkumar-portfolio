import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  House,
  Stack,
  User,
  FileText,
  Tag,
  Envelope,
  List,
  X,
  Gear,
  SquaresFour,
  PaperPlaneTilt,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  CaretRight,
  Globe,
  CaretDown
} from '@phosphor-icons/react';

const Sidebar = ({ activeSection, theme, toggleTheme, openSettings, layout = 'vertical' }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'Tamil' }
  ];

  const menuItems = [
    { label: t('home'), href: '#home', nav: '0', icon: <House size={22} weight="fill" /> },
    { label: t('about'), href: '#about', nav: '1', icon: <User size={22} weight="fill" /> },
    { label: t('resume'), href: '#resume', nav: '2', icon: <FileText size={22} weight="fill" /> },
    { label: t('skills'), href: '#skills', nav: '3', icon: <Tag size={22} weight="fill" /> },
    { label: t('projects'), href: '#portfolios', nav: '5', icon: <Stack size={22} weight="fill" /> },
    { label: t('contact'), href: '#contact', nav: '7', icon: <Envelope size={22} weight="fill" /> },
  ];

  if (layout === 'horizontal') {
    return (
      <>
        <header className="dl-horizontal-header" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          zIndex: 10000000,
          background: 'rgba(5, 5, 5, 0.5)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          justifyContent: 'space-between'
        }}>
          <div className="header-logo">
            <a href="/" className="text-logo-elite" style={{
              textDecoration: 'none',
              fontSize: '1.9rem',
              fontWeight: 900,
              fontFamily: "'Unbounded', sans-serif",
              letterSpacing: '4px',
              color: '#fff',
              textShadow: '0 0 20px rgba(255,255,255,0.2)'
            }}>SK</a>
          </div>

          <nav className="header-nav d-none d-lg-flex" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <ul style={{ display: 'flex', gap: '50px', listStyle: 'none', margin: 0, padding: 0 }}>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    style={{
                      color: activeSection === item.nav ? 'var(--accent-color)' : '#fff',
                      textTransform: 'uppercase',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      opacity: activeSection === item.nav ? 1 : 0.7,
                      transition: 'all 0.3s',
                      textDecoration: 'none'
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions d-none d-lg-flex" style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowLang(!showLang)} 
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 15px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s'
                }}
                className="hover:bg-white/10"
              >
                <Globe size={20} color="#fff" />
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>
                  {language}
                </span>
                <CaretDown size={14} color="#fff" style={{ transform: showLang ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </div>

              <AnimatePresence>
                {showLang && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      background: 'rgba(15, 15, 20, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '15px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '10px',
                      minWidth: '150px',
                      zIndex: 1000,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  >
                    {languages.map((lang) => (
                      <div
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLang(false);
                        }}
                        style={{
                          padding: '10px 15px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          color: language === lang.code ? 'var(--accent-color)' : '#fff',
                          fontSize: '14px',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                          background: language === lang.code ? 'rgba(255,255,255,0.05)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        className="hover:bg-white/5"
                      >
                        {lang.label}
                        {language === lang.code && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }} />}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div onClick={openSettings} style={{ cursor: 'pointer', opacity: 0.7 }}>
              <Gear size={24} color="#fff" />
            </div>
            <a href="#contact" className="default-btn" style={{
              padding: '0 25px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              borderRadius: '20px',
              textDecoration: 'none'
            }}>
              <span>{t('craft')} </span>
              <PaperPlaneTilt size={18} weight="bold" />
            </a>
          </div>

          <div 
            className="mobile-toggle flex lg:hidden" 
            onClick={() => setIsOpen(true)} 
            style={{ cursor: 'pointer' }}
          >
            <List size={32} color="#fff" />
          </div>
        </header>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[20000000]"
              />
              
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed top-0 right-0 h-full w-[290px] sm:w-[330px] z-[20000001] shadow-2xl flex flex-col p-8 overflow-y-auto"
                style={{ 
                  background: 'rgba(10, 10, 15, 0.85)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTopLeftRadius: '40px',
                  borderBottomLeftRadius: '40px',
                  boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
                }}
              >
                {/* Drawer Header: Window Controls (Centered) & Close Button (Right) */}
                <div className="relative flex justify-end items-center mb-6 pt-3 px-4" style={{ display: 'flex', minHeight: '50px' }}>
                  <div className="absolute left-1/2 -translate-x-1/2 flex gap-2.5 items-center" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-md" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-md" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-md" />
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10 shadow-lg"
                  >
                    <X size={20} color="#fff" weight="bold" />
                  </motion.div>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-10 px-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a2b45] to-[#1a1b2e] flex items-center justify-center border border-white/10 shadow-xl">
                    <User size={28} weight="bold" className="text-white/40" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{t('hello_sidebar')}</span>
                      <motion.div
                        animate={{ rotate: [0, 20, 0, 20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <SquaresFour size={14} weight="fill" className="text-[var(--accent-color)]" />
                      </motion.div>
                    </div>
                    <span className="text-white text-xl font-bold leading-tight" style={{ fontFamily: "'Unbounded', sans-serif" }}>Santhosh.</span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/5 mb-8"></div>
                
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    }
                  }}
                  className="flex flex-col gap-1"
                  style={{ display: 'flex' }}
                >
                  {menuItems.map((item, index) => (
                    <motion.a 
                      key={index} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      variants={{
                        hidden: { x: 20, opacity: 0 },
                        visible: { x: 0, opacity: 1 }
                      }}
                      className={`group w-full py-4 px-5 flex items-center no-underline transition-all duration-300 relative rounded-2xl ${activeSection === item.nav ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                      style={{ 
                        fontFamily: "'Unbounded', sans-serif",
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '20px',
                        textDecoration: 'none'
                      }}
                    >
                      <div className={`flex items-center justify-center transition-all ${activeSection === item.nav ? 'text-white' : 'text-white/40'}`}>
                        {item.icon}
                      </div>
                      <span className="text-[12px] font-bold uppercase tracking-[0.15em] flex-1 whitespace-nowrap">{item.label}</span>
                      
                      {activeSection === item.nav && (
                        <>
                          <CaretRight size={14} weight="bold" className="text-white/30" />
                          <motion.div 
                            layoutId="indicatorGlow"
                            className="absolute left-[-10px] w-[5px] h-[26px] bg-[#27c93f] rounded-full shadow-[0_0_15px_#27c93f]"
                          />
                        </>
                      )}
                    </motion.a>
                  ))}
                </motion.div>

                <div className="flex flex-col gap-3 mb-4">
                  <div 
                    onClick={() => setShowLang(!showLang)}
                    className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-white/[0.02] cursor-pointer hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={18} weight="bold" className="text-white/40" />
                      <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: "'Unbounded', sans-serif" }}>{t('language')}</span>
                    </div>
                    <span className="text-white text-[10px] uppercase font-bold" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                      {languages.find(l => l.code === language)?.label}
                    </span>
                  </div>

                  <AnimatePresence>
                    {showLang && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-2"
                      >
                        {languages.map((lang) => (
                          <div
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setShowLang(false);
                            }}
                            className={`p-3 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all ${language === lang.code ? 'bg-white/10 text-[var(--accent-color)]' : 'bg-white/[0.02] text-white/40'}`}
                            style={{ fontFamily: "'Unbounded', sans-serif" }}
                          >
                            {lang.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-auto pt-10">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setIsOpen(false); openSettings(); }}
                      className="flex items-center justify-center gap-3 text-white/40 text-[10px] uppercase tracking-[0.2em] cursor-pointer hover:bg-white/5 hover:text-white font-bold transition-all p-4 border border-white/5 rounded-2xl bg-white/[0.02] mb-4"
                      style={{ fontFamily: "'Unbounded', sans-serif", display: 'flex' }}
                    >
                      <Gear size={18} weight="bold" />
                      <span>{t('settings')}</span>
                    </motion.div>

                    <motion.a 
                      href="#contact" 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex justify-center items-center gap-3 bg-[var(--accent-color)] text-white font-black py-5 rounded-2xl uppercase tracking-[0.25em] text-[11px] shadow-xl transition-all"
                      style={{ 
                        fontFamily: "'Unbounded', sans-serif", 
                        border: 'none', 
                        display: 'flex',
                        textDecoration: 'none'
                      }}
                       onClick={() => setIsOpen(false)}
                    >
                      <span style={{ color: '#fff', opacity: 1 }}>{t('lets_talk')}</span>
                      <PaperPlaneTilt size={16} weight="bold" color="#fff" />
                    </motion.a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div
        className={`dl-burger-menu lg:hidden ${isOpen ? 'dl-menu-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 10000000 }}
      >
        {isOpen ? <X size={32} color="#fff" /> : <List size={32} color="#fff" />}
      </div>

      <motion.div 
        initial={false}
        animate={{ width: isOpen ? 300 : 85 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`dl-fixed-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          left: '20px',
          top: '20px',
          bottom: '20px',
          height: 'calc(100vh - 40px)',
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(40px) saturate(180%)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 1000000,
          display: 'flex',
          flexDirection: 'column',
          padding: '25px 15px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="sidebar-top" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="logo-container" style={{ 
            height: '80px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isOpen ? 'flex-start' : 'center',
            paddingLeft: isOpen ? '20px' : '0',
            marginBottom: '40px'
          }}>
            <a href="/" style={{
              textDecoration: 'none',
              fontSize: isOpen ? '2rem' : '1.5rem',
              fontWeight: 900,
              fontFamily: "'Unbounded', sans-serif",
              letterSpacing: '4px',
              color: '#fff',
              textShadow: '0 0 20px rgba(255,255,255,0.2)',
              transition: 'all 0.3s'
            }}>SK</a>
          </div>

          <nav className="sidebar-nav" style={{ flex: 1 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isOpen ? 'flex-start' : 'center',
                      padding: '15px',
                      borderRadius: '18px',
                      textDecoration: 'none',
                      color: activeSection === item.nav ? 'var(--accent-color)' : 'rgba(255,255,255,0.5)',
                      transition: 'color 0.3s',
                      position: 'relative',
                      background: activeSection === item.nav ? 'rgba(255,255,255,0.03)' : 'transparent'
                    }}
                  >
                    <div className="icon-wrapper" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      minWidth: '24px'
                    }}>
                      {item.icon}
                    </div>
                    {isOpen && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ 
                          marginLeft: '20px', 
                          fontSize: '12px', 
                          fontWeight: 700, 
                          textTransform: 'uppercase', 
                          letterSpacing: '2px',
                          fontFamily: "'Unbounded', sans-serif"
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {activeSection === item.nav && (
                      <motion.div 
                        layoutId="activePill"
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '4px',
                          height: '24px',
                          backgroundColor: 'var(--accent-color)',
                          borderRadius: '0 4px 4px 0',
                          boxShadow: '0 0 15px var(--accent-color)'
                        }}
                      />
                    )}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-bottom" style={{ 
            marginTop: 'auto', 
            paddingTop: '20px', 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            position: 'relative'
          }}>
            <div style={{ position: 'relative' }}>
              <motion.div
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => setShowLang(!showLang)}
                style={{
                  width: '100%',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isOpen ? 'flex-start' : 'center',
                  padding: isOpen ? '0 20px' : '0',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.03)',
                  transition: 'all 0.3s'
                }}
              >
                <Globe size={24} weight="regular" />
                {isOpen && <span style={{ marginLeft: '15px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{languages.find(l => l.code === language)?.label}</span>}
              </motion.div>

              <AnimatePresence>
                {showLang && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{
                      position: 'absolute',
                      left: 'calc(100% + 15px)',
                      bottom: 0,
                      background: 'rgba(15, 15, 20, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '10px',
                      minWidth: '150px',
                      zIndex: 1000,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  >
                    {languages.map((lang) => (
                      <div
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLang(false);
                        }}
                        style={{
                          padding: '10px 15px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          color: language === lang.code ? 'var(--accent-color)' : '#fff',
                          fontSize: '12px',
                          fontWeight: 600,
                          transition: 'all 0.2s',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontFamily: "'Unbounded', sans-serif"
                        }}
                        className="hover:bg-white/5"
                      >
                        {lang.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={openSettings}
              style={{
                width: '100%',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOpen ? 'flex-start' : 'center',
                padding: isOpen ? '0 20px' : '0',
                borderRadius: '18px',
                cursor: 'pointer',
                color: '#fff',
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.3s'
              }}
            >
              <Gear size={24} weight="regular" />
              {isOpen && <span style={{ marginLeft: '15px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{t('settings')}</span>}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={() => setIsOpen(!isOpen)}
              style={{
                width: '100%',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isOpen ? '0 20px' : '0',
                borderRadius: '18px',
                cursor: 'pointer',
                color: '#fff',
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.3s'
              }}
            >
              {isOpen ? <X size={24} weight="bold" /> : <SquaresFour size={28} weight="regular" />}
              {isOpen && <span className="text-center" style={{ marginLeft: '15px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}></span>}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
