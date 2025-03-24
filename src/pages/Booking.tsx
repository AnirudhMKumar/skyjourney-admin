
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BookingForm from "../components/booking/BookingForm";
import { Flight } from "../components/flights/FlightCard";

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState(1);
  
  useEffect(() => {
    // Get passengers from query params if available
    const searchParams = new URLSearchParams(location.search);
    const passengersParam = searchParams.get("passengers");
    if (passengersParam) {
      setPassengers(Number(passengersParam));
    }
    
    // Simulate API call to get flight details
    const fetchFlightDetails = async () => {
      setIsLoading(true);
      
      // Wait for 1 second to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data - in a real app, this would be fetched from an API
      const mockFlight: Flight = {
        id: id || "FL001",
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
      };
      
      setFlight(mockFlight);
      setIsLoading(false);
    };
    
    fetchFlightDetails();
  }, [id, location.search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 px-6">Complete Your Booking</h1>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading booking details...</p>
            </div>
          ) : flight ? (
            <BookingForm flight={flight} passengers={passengers} />
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Flight Not Found</h2>
              <p className="text-gray-600">
                The flight you're trying to book doesn't exist or has been removed.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
