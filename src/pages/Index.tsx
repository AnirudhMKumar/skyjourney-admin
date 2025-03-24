
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import SearchForm from "../components/home/SearchForm";
import { Plane, Globe, CreditCard, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero section with main headline */}
        <Hero />
        
        {/* Flight search form */}
        <SearchForm />
        
        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-4"
              >
                Why Choose SkyJourney
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Our simple flight booking platform makes travel planning easy
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-4"
              >
                <div className="bg-sky-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Many Destinations</h3>
                <p className="text-gray-600">
                  Find flights to over 100 cities across India
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-4"
              >
                <div className="bg-sky-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-7 h-7 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">
                  Get the lowest flight prices with no hidden fees
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-4"
              >
                <div className="bg-sky-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600">
                  Book your tickets in just a few simple steps
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-4"
              >
                Popular Destinations
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Explore these amazing places across India
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-lg overflow-hidden group hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Delhi" 
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                  <h3 className="text-xl font-bold text-white mb-1">Delhi</h3>
                  <p className="text-white/90 mb-3">Visit India's capital city</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Flights from ₹2499</span>
                    <a href="#" className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                      Explore
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-lg overflow-hidden group hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Mumbai" 
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                  <h3 className="text-xl font-bold text-white mb-1">Mumbai</h3>
                  <p className="text-white/90 mb-3">Explore the city of dreams</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Flights from ₹3499</span>
                    <a href="#" className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                      Explore
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative rounded-lg overflow-hidden group hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Goa" 
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                  <h3 className="text-xl font-bold text-white mb-1">Goa</h3>
                  <p className="text-white/90 mb-3">Relax on beautiful beaches</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Flights from ₹4999</span>
                    <a href="#" className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                      Explore
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="text-center mt-10">
              <a href="#" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
                View all destinations
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              Ready to Book Your Trip?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/90 max-w-2xl mx-auto mb-6"
            >
              Find and book flights to your favorite destinations today!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="#search"
                className="bg-white text-sky-700 px-6 py-2 rounded-full text-lg font-medium inline-block hover:bg-gray-100 transition-colors"
              >
                Book Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
