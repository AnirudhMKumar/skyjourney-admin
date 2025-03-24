
import React from "react";
import { motion } from "framer-motion";
import BlurContainer from "../ui/BlurContainer";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-50">
        {/* Abstract shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-sky-200/40 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="bg-sky-500 text-white text-sm font-medium px-4 py-1 rounded-full inline-block mb-6">
            Simplified Flight Booking
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Elevate Your <span className="text-gradient">Travel Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            Discover seamless flight booking with SkyJourney. Find the perfect flights, 
            unbeatable prices, and an experience designed around you.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#search"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full transition-colors text-lg font-medium"
            >
              Book Now
            </a>
            <a
              href="#learn-more"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full transition-colors text-lg font-medium border border-gray-200"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">Scroll down</span>
        <div className="w-5 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-gray-500 rounded-full"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
