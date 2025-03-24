
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FlightList from "../components/flights/FlightList";
import { Flight } from "../components/flights/FlightCard";
import BlurContainer from "../components/ui/BlurContainer";
import { Plane, Calendar, Users } from "lucide-react";

const Flights = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  
  useEffect(() => {
    // Simulate API call to get flights
    const fetchFlights = async () => {
      setIsLoading(true);
      
      // Wait for 1.5 seconds to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock data
      const mockFlights: Flight[] = [
        {
          id: "FL001",
          airline: "SkyJourney Airways",
          airlineCode: "SJ",
          flightNumber: "SJ101",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "08:30",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "11:45",
          duration: "5h 15m",
          stops: 0,
          price: 349,
          aircraft: "Boeing 787",
        },
        {
          id: "FL002",
          airline: "Global Air",
          airlineCode: "GA",
          flightNumber: "GA205",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "10:15",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "13:50",
          duration: "5h 35m",
          stops: 0,
          price: 320,
          aircraft: "Airbus A320",
        },
        {
          id: "FL003",
          airline: "TransAtlantic",
          airlineCode: "TA",
          flightNumber: "TA310",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "12:45",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "18:30",
          duration: "5h 45m",
          stops: 1,
          price: 285,
          aircraft: "Boeing 737",
        },
        {
          id: "FL004",
          airline: "Pacific Connect",
          airlineCode: "PC",
          flightNumber: "PC422",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "15:00",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "19:55",
          duration: "4h 55m",
          stops: 0,
          price: 390,
          aircraft: "Airbus A350",
        },
        {
          id: "FL005",
          airline: "SkyJourney Airways",
          airlineCode: "SJ",
          flightNumber: "SJ550",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "18:30",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "22:15",
          duration: "5h 45m",
          stops: 0,
          price: 315,
          aircraft: "Boeing 777",
        },
        {
          id: "FL006",
          airline: "Coastal Express",
          airlineCode: "CE",
          flightNumber: "CE635",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "20:15",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "01:30",
          duration: "5h 15m",
          stops: 0,
          price: 280,
          aircraft: "Airbus A321",
        },
        {
          id: "FL007",
          airline: "Mountain Air",
          airlineCode: "MA",
          flightNumber: "MA772",
          departureAirport: "JFK",
          departureCity: "New York",
          departureTime: "06:15",
          arrivalAirport: "LAX",
          arrivalCity: "Los Angeles",
          arrivalTime: "13:30",
          duration: "7h 15m",
          stops: 1,
          price: 260,
          aircraft: "Boeing 737",
        },
      ];
      
      setFlights(mockFlights);
      setIsLoading(false);
    };
    
    fetchFlights();
  }, []);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <BlurContainer className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Flight Search Results</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Plane className="w-4 h-4" />
                    <span>
                      {searchParams.fromCity || "New York"} to {searchParams.toCity || "Los Angeles"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(searchParams.departDate) || "Aug 15, 2023"}
                      {searchParams.returnDate && ` - ${formatDate(searchParams.returnDate)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {searchParams.passengers || "1"} {Number(searchParams.passengers || 1) === 1 ? "Passenger" : "Passengers"}, {searchParams.cabinClass || "Economy"}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm">
                Modify Search
              </button>
            </div>
          </BlurContainer>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Searching for the best flights...</p>
            </div>
          ) : (
            <FlightList flights={flights} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Flights;
