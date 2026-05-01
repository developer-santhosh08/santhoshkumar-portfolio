import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Nav
    home: "Home",
    about: "About",
    resume: "Experience",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    settings: "Settings",
    loadingExp: "Loading Experience",
    initializing: "INITIALIZING ASSETS",
    
    // Hero
    hello: "Hello, my name is",
    name: "Santhosh Kumar",
    role: "a Full Stack Developer",
    im: "I'm",
    workTogether: "Let's Work Together",
    viewProjects: "View Projects",
    
    // About
    aboutMe: "About Me",
    aboutTitle: "Let Me Introduce Myself.",
    aboutDesc: "I’m a Full Stack Developer with hands-on experience in building ERP systems and scalable web applications. I specialize in developing efficient business solutions using modern technologies like React, Laravel, CodeIgniter, and Python, with a strong focus on creating high-performance, user-friendly applications that solve real-world problems. I’m passionate about clean code, performance optimization, and delivering reliable software solutions.",
    birthDate: "Birth Date",
    address: "Address",
    addressVal: "Tamil Nadu, India",
    email: "Email",
    fullName: "Full Name",
    yearsExp: "Years Experience",
    projectsDone: "Projects Completed",
    clients: "Happy Clients",
    
    // Resume
    myResume: "My Resume",
    education: "Education",
    experience: "Experience",
    
    // Contact
    getInTouch: "Get In Touch",
    contactTitle: "Have a Project in Mind? Let’s Talk.",
    contactFormTitle: "GET IN TOUCH Let’s Discuss Your Project",
    fullNamePlaceholder: "Full Name",
    phonePlaceholder: "Phone Number",
    emailPlaceholder: "Email Address",
    subjectPlaceholder: "Project Type / Subject",
    messagePlaceholder: "Your Message (Describe your project…)",
    sendingMessage: "Sending Message",
    startConversation: "Start a Conversation",
    formSuccess: "Success!",
    formSuccessDesc: "Your message has been safely delivered.",
    formError: "Error",
    formErrorDesc: "Something went wrong. Please try again.",
    sendAnother: "Send Another",
    tryAgain: "Try Again",
    location: "Location",
    locationVal: "Komarapalayam",
    contactLabel: "Contact",
    emailLabel: "E-mail",
    
    // Resume
    workExperience: "Work Experience",
    techExpertise: "Technical Expertise",
    expSubtitle: "Architecting scalable business solutions through full-stack lifecycle mastery",
    resumePreview: "Live Resume Preview",
    downloadResume: "Download Full Resume",
    
    // Portfolio
    featuredProjects: "Featured Projects",
    projectSubtitle: "Explore some of the real-world applications and systems I’ve built.",
    allProjects: "All Projects",
    erpSystems: "ERP Systems",
    websites: "Websites",
    customCRM: "Custom CRM",
    livePreview: "Live Preview",
    comingSoon: "Coming Soon",
    saasProject: "Custom SaaS Project",
    secureConnection: "Establishing Secure Connection...",
    iframeSafety: "Previewing live environment securely. Some sites may restrict iframe loading; use the top-right arrow to open in new tab if needed.",
    
    // Project Data
    proj1_title: "GYM Management ERP",
    proj1_desc: "A complete system to manage memberships, billing, and daily operations.",
    proj1_label: "ERP System",
    
    proj2_title: "Themistor ERP System",
    proj2_label: "Enterprise ERP",
    
    proj3_title: "UPVC Fabricators ERP",
    proj3_label: "Manufacturing ERP",
    
    proj4_title: "IAS Academy Portal",
    proj4_label: "Educational Website",
    
    proj5_title: "SMSF Global Website",
    proj5_label: "Financial Website",
    
    proj6_title: "AI Conference 2026",
    proj6_label: "Event Tech Website",
    
    proj7_title: "Abroad Studies CRM",
    proj7_label: "Enterprise CRM",
    
    exp1_date: "August 2025 - Present",
    exp1_company: "Ahattrickz Info Tech Pvt. Ltd.",
    exp1_role: "Full Stack Developer",
    exp1_desc: "Full Stack Developer specializing in scalable ERP systems and high-performance web applications.",
    exp1_resp1: "Developed scalable ERP systems using Laravel, CodeIgniter, React, and Python.",
    exp1_resp2: "Designed high-performance, responsive user interfaces to enhance user experience and engagement.",
    exp1_resp3: "Integrated frontend and backend systems with RESTful APIs and automated business workflows.",
    exp1_resp4: "Improved application performance and maintainability through clean code practices and optimization techniques.",
    
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps",
    
    // Sidebar
    hello_sidebar: "Hello",
    lets_talk: "Let's Talk",
    craft: "Let's Craft"
  },
  ta: {
    // Nav
    home: "முகப்பு",
    about: "என்னை பற்றி",
    resume: "அனுபவம்",
    skills: "திறன்கள்",
    projects: "திட்டங்கள்",
    contact: "தொடர்பு",
    settings: "அமைப்புகள்",
    loadingExp: "பாயு மொளி நீ யெனக்கு, பார்க்கும் விழி நானுனக்கு, தோயும் மது நீ யெனக்கு, தும்பியடி நானுனக்கு. வாயுரைக்க வருகுதில்லை, வாழி நின்றன் மேன்மையெல்லாம்; தூயசுடர் வானொளியே!",
    initializing: "சூறையமுதே! கண்ணம்மா!",
      
    // Hero
    hello: "வணக்கம், என் பெயர்",
    name: "சந்தோஷ் குமார்",
    role: "ஒரு முழு அடுக்கு டெவலப்பர் (Full Stack Developer)",
    im: "நான்",
    workTogether: "ஒன்றாகச் செயல்படுவோம்",
    viewProjects: "திட்டங்களைப் பார்க்கவும்",
    
    // About
    aboutMe: "என்னை பற்றி",
    aboutTitle: "என்னை அறிமுகப்படுத்திக் கொள்கிறேன்.",
    aboutDesc: "நான் ஒரு முழு அடுக்கு டெவலப்பர். ERP அமைப்புகள் மற்றும் அளவிடக்கூடிய இணையப் பயன்பாடுகளை உருவாக்குவதில் எனக்கு அனுபவம் உள்ளது. React, Laravel, CodeIgniter மற்றும் Python போன்ற நவீன தொழில்நுட்பங்களைப் பயன்படுத்தி வணிகத் தீர்வுகளை உருவாக்குவதில் நான் நிபுணத்துவம் பெற்றுள்ளேன். சுத்தமான குறியீடு, செயல்திறன் மேம்பாடு மற்றும் நம்பகமான மென்பொருள் தீர்வுகளை வழங்குவதில் நான் ஆர்வமாக உள்ளேன்.",
    birthDate: "பிறந்த தேதி",
    address: "முகவரி",
    addressVal: "தமிழ்நாடு, இந்தியா",
    email: "மின்னஞ்சல்",
    fullName: "முழு பெயர்",
    yearsExp: "ஆண்டுகள் அனுபவம்",
    projectsDone: "முடிக்கப்பட்ட திட்டங்கள்",
    clients: "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
    
    // Resume
    myResume: "எனது சுயவிவரம்",
    education: "கல்வி",
    experience: "பணி அனுபவம்",
    
    // Contact
    getInTouch: "தொடர்பு கொள்ள",
    contactTitle: "மனதில் ஏதேனும் திட்டம் உள்ளதா? பேசுவோம்.",
    contactFormTitle: "எங்களைத் தொடர்பு கொள்ளுங்கள் - உங்கள் திட்டத்தைப் பற்றி விவாதிப்போம்",
    fullNamePlaceholder: "முழு பெயர்",
    phonePlaceholder: "தொலைபேசி எண்",
    emailPlaceholder: "மின்னஞ்சல் முகவரி",
    subjectPlaceholder: "திட்ட வகை / தலைப்பு",
    messagePlaceholder: "உங்கள் செய்தி (உங்கள் திட்டத்தை விளக்கவும்...)",
    sendingMessage: "செய்தி அனுப்பப்படுகிறது",
    startConversation: "உரையாடலைத் தொடங்குங்கள்",
    formSuccess: "வெற்றி!",
    formSuccessDesc: "உங்கள் செய்தி பாதுகாப்பாக வழங்கப்பட்டது.",
    formError: "பிழை",
    formErrorDesc: "ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.",
    sendAnother: "மற்றொன்றை அனுப்பவும்",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
    location: "இடம்",
    locationVal: "குமாரபாளையம்",
    contactLabel: "தொடர்பு",
    emailLabel: "மின்னஞ்சல்",
    
    // Resume
    workExperience: "பணி அனுபவம்",
    techExpertise: "தொழில்நுட்ப நிபுணத்துவம்",
    expSubtitle: "முழு-அடுக்கு வாழ்க்கைச் சுழற்சி தேர்ச்சி மூலம் அளவிடக்கூடிய வணிகத் தீர்வுகளை உருவாக்குதல்",
    resumePreview: "சுயவிவரத்தின் நேரடி முன்னோட்டம்",
    downloadResume: "முழு சுயவிவரத்தைப் பதிவிறக்கவும்",
    
    // Portfolio
    featuredProjects: "சிறப்பு திட்டங்கள்",
    projectSubtitle: "நான் உருவாக்கிய சில நிஜ உலகப் பயன்பாடுகள் மற்றும் அமைப்புகளை ஆராயுங்கள்.",
    allProjects: "அனைத்து திட்டங்கள்",
    erpSystems: "ERP அமைப்புகள்",
    websites: "இணையதளங்கள்",
    customCRM: "தனிப்பயன் CRM",
    livePreview: "நேரடி முன்னோட்டம்",
    comingSoon: "விரைவில்",
    saasProject: "தனிப்பயன் SaaS திட்டம்",
    secureConnection: "பாதுகாப்பான இணைப்பை நிறுவுகிறது...",
    iframeSafety: "நேரடி சூழலைப் பாதுகாப்பாக முன்னோட்டமிடுகிறது. சில தளங்கள் iframe ஏற்றத்தை கட்டுப்படுத்தலாம்; தேவைப்பட்டால் புதிய தாவலில் திறக்க மேல்-வலது அம்புக்குறியைப் பயன்படுத்தவும்.",

    // Project Data
    proj1_title: "ஜிம் மேலாண்மை ERP",
    proj1_desc: "உறுப்பினர் சேர்க்கை, பில்லிங் மற்றும் தினசரி செயல்பாடுகளை நிர்வகிப்பதற்கான முழுமையான அமைப்பு.",
    proj1_label: "ERP அமைப்பு",
    
    proj2_title: "Themistor ERP அமைப்பு",
    proj2_label: "நிறுவன ERP",
    
    proj3_title: "UPVC ஃபேப்ரிகேட்டர்ஸ் ERP",
    proj3_label: "உற்பத்தி ERP",
    
    proj4_title: "IAS அகாடமி போர்டல்",
    proj4_label: "கல்வி இணையதளம்",
    
    proj5_title: "SMSF குளோபல் இணையதளம்",
    proj5_label: "நிதி இணையதளம்",
    
    proj6_title: "AI மாநாடு 2026",
    proj6_label: "நிகழ்வு தொழில்நுட்ப இணையதளம்",
    
    proj7_title: "வெளிநாட்டு படிப்புகள் CRM",
    proj7_label: "நிறுவன CRM",

    exp1_date: "ஆகஸ்ட் 2025 - தற்போது வரை",
    exp1_company: "Ahattrickz Info Tech Pvt. Ltd.",
    exp1_role: "முழு அடுக்கு டெவலப்பர்",
    exp1_desc: "அளவிடக்கூடிய ERP அமைப்புகள் மற்றும் உயர் செயல்திறன் கொண்ட இணையப் பயன்பாடுகளில் நிபுணத்துவம் பெற்ற முழு அடுக்கு டெவலப்பர்.",
    exp1_resp1: "Laravel, CodeIgniter, React மற்றும் Python ஆகியவற்றைப் பயன்படுத்தி அளவிடக்கூடிய ERP அமைப்புகளை உருவாக்கியது.",
    exp1_resp2: "பயனர் அனுபவத்தை மேம்படுத்த உயர் செயல்திறன் கொண்ட, பதிலளிக்கக்கூடிய இடைமுகங்களை வடிவமைத்தது.",
    exp1_resp3: "RESTful APIகள் மற்றும் தானியங்கி வணிக பணிப்பாய்வுகளுடன் முன்பக்கம் மற்றும் பின்பக்க அமைப்புகளை ஒருங்கிணைத்தது.",
    exp1_resp4: "சுத்தமான குறியீடு நடைமுறைகள் மூலம் பயன்பாட்டின் செயல்திறனை மேம்படுத்தியது.",
    
    frontend: "முன்பக்கம் (Frontend)",
    backend: "பின்பக்கம் (Backend)",
    database: "தரவுத்தளம் (Database)",
    devops: "வரிசைப்படுத்தல் (DevOps)",
    
    // Sidebar
    hello_sidebar: "வணக்கம்",
    lets_talk: "பேசுவோம்",
    craft: "உருவாக்குவோம்"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem('hasVisited');
  });

  // Only persist language to localStorage when it's explicitly set or changed
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isFirstVisit }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
