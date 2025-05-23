import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView} from "framer-motion";
import dnaImage from "../assets/dna.png";
import maayanImage from "../assets/maayan.png";
import phoneImage from "../assets/phone.png";
import seasonPassImage from "../assets/season-pass.png";
import tabletImage from "../assets/tablet.png";
import ContactModal from "./ContactModal";

const BrightifyLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to scroll to CTA section
  const scrollToCTA = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to open contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const fadeInRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const imageScaleVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const scaleUpVariant = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  // Custom hook for section animations
  const useAnimateOnScroll = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    
    return [ref, isInView];
  };

  // Helper components defined inside main component to access animation variants
  const ServiceImage = ({ src, alt }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    
    return (
      <motion.div 
        ref={ref}
        className="w-full h-64 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }}
      >
        <motion.div className="w-full h-full relative">
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-cyan-500/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
      </motion.div>
    );
  };

  const ServiceContent = ({ label, title, description, buttonText, animationVariant, onButtonClick }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    
    return (
      <motion.div 
        ref={ref}
        className="lg:w-1/2"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariant || fadeInRightVariant}
      >
        <motion.div 
          className="text-fuchsia-400 text-sm font-semibold mb-3"
          variants={fadeInUpVariant}
        >
          {label}
        </motion.div>
        <motion.h2 
          className="text-4xl font-bold text-white mb-6"
          variants={fadeInUpVariant}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-gray-300 mb-8 leading-relaxed"
          variants={fadeInUpVariant}
        >
          {description}
        </motion.p>
        {buttonText && (
          <motion.button 
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md shadow-fuchsia-500/20"
            variants={scaleUpVariant}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 20px -4px rgba(192, 38, 211, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onButtonClick}
          >
            {buttonText}
          </motion.button>
        )}
      </motion.div>
    );
  };

  const StatCard = ({ number, label, description }) => (
    <motion.div 
      className="text-center"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
    >
      <motion.div 
        className="text-5xl md:text-6xl font-bold text-white mb-3"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200,
          duration: 0.8,
          delay: 0.2
        }}
      >
        {number}
      </motion.div>
      <div className="text-xl font-semibold text-purple-300 mb-4">{label}</div>
      <div className="text-gray-400 leading-relaxed max-w-xs mx-auto">
        {description}
      </div>
    </motion.div>
  );

  const ProcessStep = ({ icon, title, description, delay = 0 }) => {
    const [ref, isInView] = useAnimateOnScroll();
    
    return (
      <motion.div 
        ref={ref}
        className="flex flex-col items-center text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariant}
        transition={{ delay }}
      >
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center mb-4 text-white text-2xl shadow-md shadow-fuchsia-500/20"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 8px 20px -4px rgba(192, 38, 211, 0.3)", 
            transition: { duration: 0.3 } 
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </motion.div>
    );
  };

  // Parallax effect for hero image
  const phoneImageY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const phoneImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  return (
    <>
      <div className="min-h-screen bg-[#06051a] bg-gradient-to-br from-[#06051a] via-[#150f35] to-[#291544]">
        {/* Hero Section */}
        <section id="hero" className="py-8 md:py-16 pt-20 md:pt-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: 0.3
                }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    See Through
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500"
                  >
                    Players'
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    Eyes
                  </motion.span>
                </h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  On-demand research that reveals what drives your players—from
                  first click to long-term retention
                </motion.p>
                <motion.button 
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25 w-full md:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.2), 0 10px 10px -5px rgba(139, 92, 246, 0.1)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openContactModal}
                >
                  Let's Talk Player Insights
                </motion.button>
              </motion.div>

              <motion.div 
                className="relative order-1 lg:order-2"
                style={{ y: phoneImageY, scale: phoneImageScale }}
              >
                {/* Background decorative elements for mobile */}
                <div className="absolute inset-0 lg:hidden">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-8 left-4 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-lg"></div>
                  <div className="absolute top-1/2 right-8 w-8 h-8 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-md"></div>
                </div>
                
                <motion.div
                  className="relative mx-auto w-full max-w-[280px] h-[435px] md:max-w-[434px] md:h-[673px]" // Smaller on mobile
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <img
                    src={phoneImage}
                    alt="Gaming interface on phone"
                    className="w-full h-full object-contain rounded-3xl"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/20 to-cyan-500/20 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  ></motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-20">
              {/* Pre-Production */}
              <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
                <div className="w-full lg:w-1/2">
                  <ServiceImage src={dnaImage} alt="DNA helix with gaming elements" />
                </div>
                <ServiceContent 
                  label="Pre-Production"
                  title={<>Define Your Game's<br />Identity</>}
                  description="Build captivating names, stories, and characters through targeted surveys and psychographic analysis. Create emotional resonance from day one."
                  buttonText="Shape Your Game's Foundation"
                  animationVariant={fadeInRightVariant}
                  onButtonClick={scrollToCTA}
                />
              </div>

              {/* Prototyping */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-6 md:gap-8">
                <div className="w-full lg:w-1/2">
                  <ServiceImage src={tabletImage} alt="Game character on tablet" />
                </div>
                <ServiceContent 
                  label="Prototyping & Pre-Launch"
                  title={<>Fewer Iterations.<br />Stronger Launch.</>}
                  description="Refine visuals, mechanics, and narratives with real-time player feedback. Identify what stands out—and what falls flat—before it costs you."
                  animationVariant={fadeInLeftVariant}
                />
              </div>
            </div>

            {/* Post-Launch */}
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
              <div className="w-full lg:w-1/2">
                <ServiceImage src={seasonPassImage} alt="Season pass interface" />
              </div>
              <ServiceContent 
                label="Post-Launch & Liveops"
                title="Win the Live Game"
                description="Keep players coming back with competitive analysis and loyalty-driven insights. Fuel retention, revenue, and roadmap confidence."
                animationVariant={fadeInRightVariant}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-12 md:py-20 bg-[#0a071f] bg-opacity-60 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                By the Numbers – Real Impact, Real Players
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1,
                  }
                }
              }}
            >
              <StatCard
                number="200K"
                label="Players Surveyd"
                description="Deeply understanding what drives gaming audiences."
              />
              <StatCard
                number="20+"
                label="Games Enhanced"
                description="Sharpening all game elements"
              />
              <StatCard
                number="100,000+"
                label="Insights Uncovered"
                description="Turning player behaviors into strategies that win"
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full max-w-md mx-auto h-64 md:h-96 rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={maayanImage}
                      alt="Maayan portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold text-white mb-8">About</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Hi, I'm{" "}
                    <span className="text-fuchsia-400 font-semibold">Maayan</span>.
                    A behavioral psychologist who understands games—and the people
                    who play them. My research is systematic, objective, and built
                    to move fast without sacrificing rigor.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    I work with product, UX, and marketing teams to generate
                    clarity, drive successful launches, and fuel confident
                    decisions.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    My work has shaped games generating over{" "}
                    <span className="text-fuchsia-400 font-bold">
                      $1B in revenue
                    </span>
                    .
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-12 md:py-20 bg-[#0a071f] bg-opacity-60 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-8 md:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Simple, Transparent Process
              </h2>
            </motion.div>

            <motion.div 
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={staggerContainer}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <ProcessStep
                  icon="📋"
                  title="Briefing"
                  description="You share your goals."
                  delay={0.1}
                />
                <ProcessStep
                  icon="🔬"
                  title="Research Design"
                  description="I tailor the method."
                  delay={0.3}
                />
                <ProcessStep
                  icon="⚡"
                  title="Execution"
                  description="I handle data collection."
                  delay={0.5}
                />
                <ProcessStep
                  icon="📊"
                  title="Results"
                  description="Actionable insights delivered."
                  delay={0.7}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-white mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUpVariant}
            >
              Ready to Learn What Drives Your Players?
            </motion.h2>
            <motion.button 
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-fuchsia-500/25 w-full md:w-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={scaleUpVariant}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(192, 38, 211, 0.25)" 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={openContactModal}
            >
              Let's Talk
            </motion.button>
          </div>
        </section>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default BrightifyLanding;