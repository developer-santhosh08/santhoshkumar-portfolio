import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';

const Particle = ({ x, y, color }) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 40;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    return (
        <motion.div
            initial={{ x, y, scale: 1, opacity: 1 }}
            animate={{ 
                x: x + destX, 
                y: y + destY, 
                scale: 0, 
                opacity: 0 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                position: 'fixed',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: color || 'var(--accent-color)',
                zIndex: 9999,
                pointerEvents: 'none',
                boxShadow: `0 0 10px ${color || 'var(--accent-color)'}`
            }}
        />
    );
};

const Shockwave = ({ x, y }) => (
    <motion.div
        initial={{ x, y, scale: 0, opacity: 0.5 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
            position: 'fixed',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid rgba(var(--accent-color-rgb), 0.8)',
            zIndex: 9998,
            pointerEvents: 'none',
            top: -10,
            left: -10
        }}
    />
);

const MagneticButton = ({ children, className = "", distance = 0.35, strength = 30 }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState([]);
    const [shockwaves, setShockwaves] = useState([]);

    // Core Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Icon Parallax (slightly stronger pull)
    const iconX = useMotionValue(0);
    const iconY = useMotionValue(0);

    // Glow Tracking
    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    
    const iconSpringX = useSpring(iconX, springConfig);
    const iconSpringY = useSpring(iconY, springConfig);

    const rotateX = useTransform(springY, [-strength, strength], [15, -15]);
    const rotateY = useTransform(springX, [-strength, strength], [-15, 15]);

    const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(var(--accent-color-rgb), 0.4) 0%, transparent 80%)`;
    const edgeBeam = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(var(--accent-color-rgb), 1) 0%, transparent 50%)`;

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;

        // Base Magnetic Motion
        x.set(offsetX * distance);
        y.set(offsetY * distance);

        // Icon Parallax (Double the distance pull)
        iconX.set(offsetX * (distance * 0.5));
        iconY.set(offsetY * (distance * 0.5));

        // Glow Tracking (Percent based)
        glowX.set(((clientX - left) / width) * 100);
        glowY.set(((clientY - top) / height) * 100);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
        iconX.set(0);
        iconY.set(0);
    };

    const handleClick = (e) => {
        const { clientX, clientY } = e;
        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + i,
            x: clientX,
            y: clientY
        }));
        
        const newShockwave = { id: Date.now(), x: clientX, y: clientY };

        setParticles(prev => [...prev, ...newParticles]);
        setShockwaves(prev => [...prev, newShockwave]);
        
        // Final Cleanups
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 600);
        setTimeout(() => {
            setShockwaves(prev => prev.filter(s => s.id !== newShockwave.id));
        }, 800);
    };

    return (
        <>
            <motion.div
                ref={ref}
                className={`magnetic-wrapper ${className}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
                style={{
                    x: springX,
                    y: springY,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                }}
            >
                {/* Layered Content with Icon Parallax */}
                <div style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    transformStyle: 'preserve-3d'
                }}>
                    <motion.div style={{ x: iconSpringX, y: iconSpringY, translateZ: 50 }}>
                        {children}
                    </motion.div>
                </div>
                
                {/* Dynamic Flashlight Glow */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="aurora-glow-dynamic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: glowBackground,
                                zIndex: 1,
                                borderRadius: 'inherit',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Edge Tracking Laser Beam */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="edge-beam"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: -2,
                                background: edgeBeam,
                                mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                                WebkitMask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                                maskComposite: 'exclude',
                                WebkitMaskComposite: 'xor',
                                padding: '2px',
                                borderRadius: 'inherit',
                                zIndex: 3,
                                pointerEvents: 'none',
                                filter: 'blur(1px)'
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Ambient Depth Glow */}
                <div style={{
                    position: 'absolute',
                    inset: '-15%',
                    background: 'radial-gradient(circle at center, rgba(var(--accent-color-rgb), 0.15) 0%, transparent 70%)',
                    zIndex: -1,
                    filter: 'blur(20px)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                }} />
            </motion.div>

            {/* Global Interaction Systems */}
            <AnimatePresence mode="popLayout">
                {particles.map(p => (
                    <Particle key={p.id} x={p.x} y={p.y} />
                ))}
                {shockwaves.map(s => (
                    <Shockwave key={s.id} x={s.x} y={s.y} />
                ))}
            </AnimatePresence>
        </>
    );
};

export default MagneticButton;
