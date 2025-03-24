
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, Search, Plane } from "lucide-react";
import BlurContainer from "../ui/BlurContainer";
import { motion } from "framer-motion";

const SearchForm = () => {
  const [flightType, setFlightType] = useState<"roundtrip" | "oneway" | "multicity">("roundtrip");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [cabinClass, setCabinClass] = useState("economy");
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/flights", { 
      state: { 
        fromCity, 
        toCity, 
        departDate, 
        returnDate, 
        passengers, 
        cabinClass, 
        flightType 
      } 
    });
  };

  return (
    <section id="search" className="py-16 px-6 -mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BlurContainer className="p-8">
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  flightType === "roundtrip"
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFlightType("roundtrip")}
              >
                <Plane className="w-4 h-4" />
                Round Trip
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  flightType === "oneway"
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFlightType("oneway")}
              >
                <ArrowRight className="w-4 h-4" />
                One Way
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  flightType === "multicity"
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFlightType("multicity")}
              >
                <Plane className="w-4 h-4 transform rotate-45" />
                Multi-city
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="fromCity" className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fromCity"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      placeholder="City or Airport"
                      className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="toCity" className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="toCity"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      placeholder="City or Airport"
                      className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <label htmlFor="departDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="departDate"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  </div>
                </div>

                {flightType === "roundtrip" && (
                  <div className="relative">
                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Return Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="returnDate"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                        required={flightType === "roundtrip"}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    </div>
                  </div>
                )}

                <div className="relative">
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <select
                      id="passengers"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="cabinClass" className="block text-sm font-medium text-gray-700 mb-1">
                    Cabin Class
                  </label>
                  <div className="relative">
                    <select
                      id="cabinClass"
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors appearance-none"
                    >
                      <option value="economy">Economy</option>
                      <option value="premium">Premium Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                    </select>
                    <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full transition-colors text-lg font-medium flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search Flights
                </button>
              </div>
            </form>
          </BlurContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchForm;
