import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MessageSquare } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    gameType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // Replace this with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-pink-950/95 rounded-2xl shadow-2xl border border-fuchsia-900/20 mx-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 backdrop-blur-md border-b border-fuchsia-900/20 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                  Let's Talk Player Insights
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Tell us about your project and we'll get back to you within 24
                  hours
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setSubmitStatus(null);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    gameType: "",
                    message: "",
                  });
                }}
                className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
              >
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {submitStatus === "success" ? (
              <motion.div
                className="text-center py-8 sm:py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors text-sm sm:text-base"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                      Game Type
                    </label>
                    <select
                      name="gameType"
                      value={formData.gameType}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors text-sm sm:text-base"
                    >
                      <option value="" className="bg-gray-800">
                        Select game type
                      </option>
                      <option value="mobile" className="bg-gray-800">
                        Mobile Game
                      </option>
                      <option value="pc" className="bg-gray-800">
                        PC Game
                      </option>
                      <option value="console" className="bg-gray-800">
                        Console Game
                      </option>
                      <option value="web" className="bg-gray-800">
                        Web Game
                      </option>
                      <option value="other" className="bg-gray-800">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5 sm:mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell us about your game, what stage you're in, and what insights you're looking for..."
                  />
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-lg p-3 sm:p-4 border border-fuchsia-900/20">
                  <h4 className="text-sm font-semibold text-white mb-2 sm:mb-3">
                    Prefer to reach out directly?
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-xs sm:text-sm">
                    <a
                      href="mailto:contact@brightify.com"
                      className="flex items-center gap-2 text-gray-300 hover:text-fuchsia-400 transition-colors"
                    >
                      <Mail size={14} className="sm:w-4 sm:h-4" />
                      contact@brightify.com
                    </a>
                    <a
                      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2h-p96Bu2TGVh-qph3btwH5J0odPpEeWzBx6Rw34yFwVlJaX_gGJc_nG2PelDhtMTZEoOKDvJj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-fuchsia-400 transition-colors"
                    >
                      <Phone size={14} className="sm:w-4 sm:h-4" />
                      Schedule a call
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg font-semibold transition-colors focus:outline-none text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.email ||
                      !formData.message
                    }
                    className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 focus:outline-none text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
