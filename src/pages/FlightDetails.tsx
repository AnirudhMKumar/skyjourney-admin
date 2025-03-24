
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FlightDetailsComponent from "../components/flights/FlightDetails";
import { Flight } from "../components/flights/FlightCard";

// This component handles the flight details page
const FlightDetails = () => {
  // Get the flight ID from URL parameters
  const { id } = useParams<{ id: string }>();
  
  // Define states for loading status and flight data
  const [isLoading, setIsLoading] = useState(true);
  const [flight, setFlight] = useState<Flight | null>(null);
  
  useEffect(() => {
    // Function to fetch flight details from API
    const fetchFlightDetails = async () => {
      // Set loading state to true when starting data fetch
      setIsLoading(true);
      
      // Simulate API call with a timeout (for demo purposes)
      // In a real application, this would be a fetch request to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock flight data for demonstration
      // This is placeholder data that would normally come from an API
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
      
      // Update state with the flight data
      setFlight(mockFlight);
      // End loading state
      setIsLoading(false);
    };
    
    // Call the function to fetch flight details
    fetchFlightDetails();
  }, [id]); // Dependency array - re-run if ID changes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <Header />
      
      {/* Main content */}
      <main className="pt-24 pb-16">
        {isLoading ? (
          // Loading spinner shown while data is being fetched
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading flight details...</p>
          </div>
        ) : flight ? (
          // Display flight details once data is loaded
          <FlightDetailsComponent flight={flight} />
        ) : (
          // Error message if flight is not found
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Flight Not Found</h2>
            <p className="text-gray-600">
              The flight you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
      </main>
      
      {/* Page footer */}
      <Footer />
    </div>
  );
};

export default FlightDetails;
