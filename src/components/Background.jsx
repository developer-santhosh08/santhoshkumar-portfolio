import React from 'react';

const Background = ({ videoSrc }) => {
  if (!videoSrc) return null;

  return (
    <div 
      className="bg-video-container hide-mobile-bg" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        key={videoSrc} // Important for re-mounting when src changes
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          opacity: 0.6 // Subtle but more visible
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div 
        className="bg-overlay" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)', // Darken the video for readability
          zIndex: 1
        }}
      />
    </div>
  );
};

export default Background;
