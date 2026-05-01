import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';
import { Envelope, MapPin, Phone, ArrowRight, CheckCircle, XCircle, Spinner } from '@phosphor-icons/react';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "94b36274-9627-40ae-86c0-d4d42e081d8e",
          ...formData,
          from_name: "Santhosh Kumar Portfolio",
          subject: `New Message from Portfolio: ${formData.subject || 'No Subject'}`
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form Error:", error);
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="contact-section section-padding" data-scroll-index="7">
      <motion.div
        className="container"
        style={{ maxWidth: '95%' }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <motion.div
          className="contact-card-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="contact-card-glow"></div>
          <div className="contact-card-glow-2"></div>

          <div className="row">
            {/* Left Side: Info */}
            <div className="col-lg-5 mb-50 mb-lg-0">
              <div className="section-heading mb-30 flex flex-col items-center">
                <TextReveal
                  text="Get Ready To Create Great"
                  className="section-title-modern !text-center !justify-center"
                  stagger={0.05}
                />
              </div>

              <div className="contact-info-list" style={{ marginTop: '50px' }}>
                <motion.div className="contact-item" variants={itemVariants}>
                  <div className="contact-icon-box">
                    <Envelope size={28} weight="fill" />
                  </div>
                  <div className="contact-text">
                    <span className="info-label-mini">E-mail:</span>
                    <h5><a href="mailto:dev.santhosh08@gmail.com" className="contact-link" target="_blank" rel="noopener noreferrer">dev.santhosh08@gmail.com</a></h5>
                  </div>
                </motion.div>

                <motion.div className="contact-item" variants={itemVariants}>
                  <div className="contact-icon-box">
                    <MapPin size={28} weight="fill" />
                  </div>
                  <div className="contact-text">
                    <span className="info-label-mini">Location:</span>
                    <h5>Komarapalayam</h5>
                  </div>
                </motion.div>

                <motion.div className="contact-item" variants={itemVariants}>
                  <div className="contact-icon-box">
                    <Phone size={28} weight="fill" />
                  </div>
                  <div className="contact-text">
                    <span className="info-label-mini">Contact:</span>
                    <h5><a href="tel:+917871646640" className="contact-link" target="_blank" rel="noopener noreferrer">+91 78716- 46640</a></h5>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="col-lg-7">
              <motion.div variants={itemVariants} style={{ position: 'relative' }}>
                <h3 className="contact-form-title">GET IN TOUCH</h3>
                <form id="ajax_form" className="modern-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <textarea
                        name="message"
                        className="form-control"
                        placeholder="Your Message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="col-md-12 mt-20">
                      <button
                        type="submit"
                        className="default-btn w-100"
                        disabled={status === 'sending'}
                        style={{ justifyContent: 'center' }}
                      >
                        {status === 'sending' ? (
                          <>Sending Message <Spinner size={22} className="spinning-icon" style={{ marginLeft: '10px' }} /></>
                        ) : (
                          <>Appointment Now <ArrowRight size={22} style={{ marginLeft: '10px' }} /></>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Status Overlay Notifications */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      className="form-status-overlay success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <CheckCircle size={64} weight="duotone" color="var(--accent-color)" />
                      <h4>Success!</h4>
                      <p>Your message has been safely delivered.</p>
                      <button onClick={() => setStatus('idle')} className="status-close-btn">Send Another</button>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="error"
                      className="form-status-overlay error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <XCircle size={64} weight="duotone" color="#ef4444" />
                      <h4>Error</h4>
                      <p>Something went wrong. Please try again.</p>
                      <button onClick={() => setStatus('idle')} className="status-close-btn">Try Again</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .spinning-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .contact-link {
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-link:hover {
          color: var(--accent-color);
        }

        .form-status-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 5, 8, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 10;
          border-radius: 20px;
          padding: 30px;
        }

        .form-status-overlay h4 {
          font-size: 2rem;
          margin: 20px 0 10px;
          color: #fff;
        }

        .form-status-overlay p {
          color: rgba(255,255,255,0.6);
          margin-bottom: 30px;
        }

        .status-close-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 10px 25px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        @media (max-width: 576px) {
          .contact-card-container { padding: 40px 15px !important; border-radius: 25px !important; margin-top: 20px !important; }
          .contact-text h5 { font-size: 15px !important; word-break: break-all; }
          .contact-icon-box { width: 45px !important; height: 45px !important; }
          .contact-icon-box svg { width: 20px !important; height: 20px !important; }
          .contact-item { gap: 12px !important; }
          .modern-form .form-control { font-size: 14px !important; padding: 12px 15px !important; }
          .default-btn { 
            height: 50px !important; 
            font-size: 12px !important; 
            padding: 0 15px !important; 
            letter-spacing: 1px !important;
            white-space: nowrap !important; 
            justify-content: center !important;
          }
        }

        .status-close-btn:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
        }
      `}</style>
    </section>
  );
};

export default Contact;
