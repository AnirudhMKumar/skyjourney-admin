
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
      
      // Mock data with Indian airlines and routes
      const mockFlights: Flight[] = [
        {
          id: "FL001",
          airline: "Air India",
          airlineCode: "AI",
          flightNumber: "AI101",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "08:30",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "10:45",
          duration: "2h 15m",
          stops: 0,
          price: 4999,
          aircraft: "Boeing 787 Dreamliner",
        },
        {
          id: "FL002",
          airline: "IndiGo",
          airlineCode: "6E",
          flightNumber: "6E205",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "10:15",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "12:30",
          duration: "2h 15m",
          stops: 0,
          price: 4550,
          aircraft: "Airbus A320neo",
        },
        {
          id: "FL003",
          airline: "Vistara",
          airlineCode: "UK",
          flightNumber: "UK310",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "12:45",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "15:30",
          duration: "2h 45m",
          stops: 1,
          price: 5285,
          aircraft: "Boeing 737",
        },
        {
          id: "FL004",
          airline: "SpiceJet",
          airlineCode: "SG",
          flightNumber: "SG422",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "15:00",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "17:25",
          duration: "2h 25m",
          stops: 0,
          price: 3990,
          aircraft: "Boeing 737-800",
        },
        {
          id: "FL005",
          airline: "Air India",
          airlineCode: "AI",
          flightNumber: "AI550",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "18:30",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "20:45",
          duration: "2h 15m",
          stops: 0,
          price: 5315,
          aircraft: "Airbus A321",
        },
        {
          id: "FL006",
          airline: "GoAir",
          airlineCode: "G8",
          flightNumber: "G8635",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "20:15",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "22:30",
          duration: "2h 15m",
          stops: 0,
          price: 4280,
          aircraft: "Airbus A320",
        },
        {
          id: "FL007",
          airline: "Alliance Air",
          airlineCode: "9I",
          flightNumber: "9I772",
          departureAirport: "DEL",
          departureCity: "Delhi",
          departureTime: "06:15",
          arrivalAirport: "BOM",
          arrivalCity: "Mumbai",
          arrivalTime: "09:30",
          duration: "3h 15m",
          stops: 1,
          price: 4260,
          aircraft: "ATR 72-600",
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
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
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
                      {searchParams.fromCity || "Delhi (DEL)"} to {searchParams.toCity || "Mumbai (BOM)"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(searchParams.departDate) || "15 Aug, 2023"}
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
