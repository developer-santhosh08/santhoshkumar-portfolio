import React, { useEffect, useRef, useState } from 'react';

const NeonCursor = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothedMouse = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const maxPoints = 60; // Length of the trail

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const animate = () => {
      if (isTouchDevice) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse movement using lerp (factor 0.15)
      smoothedMouse.current.x += (mouse.current.x - smoothedMouse.current.x) * 0.15;
      smoothedMouse.current.y += (mouse.current.y - smoothedMouse.current.y) * 0.15;

      // Add smoothed mouse position
      points.current.push({ ...smoothedMouse.current });
      if (points.current.length > maxPoints) {
        points.current.shift();
      }

      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#00f2ff';

      if (points.current.length > 1) {
        // Draw the neon trail
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Outer Glow (Bloom)
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);
        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }

        ctx.shadowBlur = 15;
        ctx.shadowColor = accentColor;
        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 12;
        ctx.stroke();

        // Inner Bright Core
        ctx.shadowBlur = 5;
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 5;
        ctx.stroke();

        // High Bright Center
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Permanent Outer Circle (Subtle)
      const ringRadius = isHovered ? 30 : 10;
      const ringOpacity = isHovered ? 0.6 : 0.2;
      const ringGlow = isHovered ? 25 : 10;

      // Outer Glow
      ctx.beginPath();
      ctx.arc(smoothedMouse.current.x, smoothedMouse.current.y, ringRadius, 0, Math.PI * 2);
      ctx.shadowBlur = ringGlow;
      ctx.shadowColor = accentColor;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = isHovered ? 2 : 1.2;
      ctx.globalAlpha = ringOpacity;
      ctx.stroke();

      // Inner Core (Only when hovered or very subtle)
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(smoothedMouse.current.x, smoothedMouse.current.y, ringRadius, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.9;
        ctx.stroke();

        // Extra Shadow for Depth
        ctx.beginPath();
        ctx.arc(smoothedMouse.current.x, smoothedMouse.current.y, ringRadius, 0, Math.PI * 2);
        ctx.shadowBlur = 40;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Attach hover listeners to all buttons and links
    const updateListeners = () => {
      const targets = document.querySelectorAll('a, button, .clickable');
      targets.forEach(target => {
        target.addEventListener('mouseenter', handleMouseEnter);
        target.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateListeners();
    // Re-check for new elements occasionally (due to React rendering)
    const interval = setInterval(updateListeners, 2000);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 20000000,
      }}
    />
  );
};

export default NeonCursor;
