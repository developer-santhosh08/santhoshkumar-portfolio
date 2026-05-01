import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowClockwise, SquaresFour, List } from '@phosphor-icons/react';

const SettingsModal = ({ isOpen, onClose, accentColor, setAccentColor, bgVideo, setBgVideo, onResetColor, onResetBackground, menuLayout, setMenuLayout }) => {
  const colors = [
    '#a855f7',
    '#A6A678',
    '#27ae60',
    '#8e44ad',
    '#8b5cf6',
    '#6366f1',
    '#ffffff',
    '#000000',
    '#1a1aff',
    '#006666'
  ];

  const backgrounds = [
    { name: 'Solid Color', path: '' },
    { name: 'Water Waves', path: '/img/bg-3d/video3.mp4' },
    { id: 'video5', name: 'Simple Strings', path: '/img/bg-3d/video5.mp4' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="settings-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.8)',
              zIndex: 10000005,
              backdropFilter: 'blur(10px)'
            }}
          />
          <motion.div
            className="settings-modal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 'min(400px, 100%)',
              height: '100dvh',
              background: '#151515',
              zIndex: 10000006,
              padding: 'clamp(20px, 5vw, 40px)',
              color: '#fff',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'Teko', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '32px' }}>Configuration</h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={32} />
              </button>
            </div>

            <div className="settings-section" style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'Teko', textTransform: 'uppercase', color: '#888', margin: 0, letterSpacing: '1px' }}>Colors</h4>
                <button
                  onClick={onResetColor}
                  title="Reset Color"
                  style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', transition: 'color 0.3s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#555'}
                >
                  <ArrowClockwise size={20} />
                </button>
              </div>
              <div className="color-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: accentColor === color ? '2px solid #fff' : '2px solid transparent',
                      cursor: 'pointer',
                      padding: 0,
                      outlineOffset: '2px',
                      outline: accentColor === color ? `2px solid ${color}` : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
              <div className="custom-color" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '14px', color: '#888' }}>Custom Color:</span>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            <div className="settings-section" style={{ marginBottom: '40px' }}>
              <h4 style={{ fontFamily: 'Teko', textTransform: 'uppercase', color: '#888', marginBottom: '20px', letterSpacing: '1px' }}>Navigation Layout</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <button
                  onClick={() => setMenuLayout('vertical')}
                  className="layout-btn"
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: menuLayout === 'vertical' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                    color: menuLayout === 'vertical' ? '#fff' : '#888',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Teko',
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <SquaresFour size={24} />
                  Vertical
                </button>
                <button
                  onClick={() => setMenuLayout('horizontal')}
                  className="layout-btn"
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: menuLayout === 'horizontal' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                    color: menuLayout === 'horizontal' ? '#fff' : '#888',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Teko',
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <List size={24} />
                  Horizontal
                </button>
              </div>
            </div>

            <div className="settings-section" style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'Teko', textTransform: 'uppercase', color: '#888', margin: 0, letterSpacing: '1px' }}>Background Video</h4>
                <button
                  onClick={onResetBackground}
                  title="Reset Background"
                  style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', transition: 'color 0.3s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#555'}
                >
                  <ArrowClockwise size={20} />
                </button>
              </div>
              <div className="shapes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                {backgrounds.map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => setBgVideo(bg.path)}
                    className="default-btn"
                    style={{
                      padding: '0 20px',
                      fontSize: '14px',
                      lineHeight: '40px',
                      height: '40px',
                      backgroundColor: bgVideo === bg.path ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                      opacity: bgVideo === bg.path ? 1 : 0.6,
                      justifyContent: 'center',
                      width: '100%',
                      marginBottom: '5px'
                    }}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
