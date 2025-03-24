
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with simple colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-50">
        {/* Simple decorative shapes */}
        <div className="absolute top-20 left-20 w-48 h-48 rounded-full bg-sky-200/40 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="bg-sky-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
            Easy Flight Booking
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Find Your Perfect <span className="text-gradient">Flight</span>
          </h1>
          <p className="text-md md:text-lg text-gray-600 mb-6 max-w-xl">
            Search and book flights to destinations all across India at the best prices.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#search"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full transition-colors text-md font-medium"
            >
              Search Flights
            </a>
            <a
              href="#learn-more"
              className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-2 rounded-full transition-colors text-md font-medium border border-gray-200"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">Scroll down</span>
        <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-gray-500 rounded-full"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
