import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/Logo.jpeg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);
  const [showNav, setShowNav] = useState(true);

  // Add scroll detection for enhanced navbar background and scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
        setShowNav(true);
      } else {
        setIsScrollingUp(false);
        if (currentScrollY > 100) {
          setShowNav(false);
        }
      }
      
      // Update scroll position
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setShowNav(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "stats", label: "Stats" },
    { id: "about", label: "About" },
    { id: "process", label: "Process" },
  ];

  return (
    <header
      className={`py-6 fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-sm
        ${
          scrolled
            ? "bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-pink-950/95 shadow-md shadow-fuchsia-900/10"
            : "bg-gradient-to-br from-indigo-950/90 via-purple-950/90 to-pink-950/90"
        }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/20">
              <img
                src={logoImage}
                className="rounded-md w-full h-full object-cover"
                alt="Brightify Logo"
              />
            </div>
            <span className="text-white text-xl font-bold">Brightify</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links - Show when not scrolled or when scrolling up */}
            <AnimatePresence mode="wait">
              {showNav && (
                <motion.div
                  className="flex items-center space-x-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-link relative text-gray-200 hover:text-white font-semibold uppercase text-sm tracking-wide transition-colors duration-400 focus:outline-none
                        ${activeSection === item.id ? "text-fuchsia-400" : ""}`}
                    >
                      {item.label}
                      <div className="absolute bottom-[-2px] left-1/2 w-0 h-0.5 bg-fuchsia-500 pointer-events-none transition-all duration-400 ease-in-out group-hover:w-full group-hover:left-0 shadow-sm shadow-fuchsia-500/50"></div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Book a Call Button - Always visible */}
            <button
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none shadow-md shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40"
              onClick={() =>
                window.open(
                  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2h-p96Bu2TGVh-qph3btwH5J0odPpEeWzBx6Rw34yFwVlJaX_gGJc_nG2PelDhtMTZEoOKDvJj",
                  "_blank"
                )
              }
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Navigation - Burger Menu Only */}
          <div className="md:hidden flex items-center">
            {/* Mobile Burger Menu Button */}
            <button
              className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={
                    isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={
                    isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-pink-950/95 rounded-xl backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col py-6 px-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 text-lg focus:outline-none transition-all duration-300
                      ${
                        activeSection === item.id
                          ? "text-fuchsia-400 pl-2"
                          : "text-gray-200 hover:text-fuchsia-300 hover:pl-2"
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                {/* Book a Call Button in Mobile Menu */}
                <motion.button
                  onClick={() =>
                    window.open(
                      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2h-p96Bu2TGVh-qph3btwH5J0odPpEeWzBx6Rw34yFwVlJaX_gGJc_nG2PelDhtMTZEoOKDvJj",
                      "_blank"
                    )
                  }
                  className="mt-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none shadow-md shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                >
                  Book a Call
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
