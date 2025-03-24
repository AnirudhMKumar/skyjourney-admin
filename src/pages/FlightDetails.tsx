
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FlightDetailsComponent from "../components/flights/FlightDetails";
import { Flight } from "../components/flights/FlightCard";

// This component shows the details of a specific flight
const FlightDetails = () => {
  // Get the flight ID from the URL
  const { id } = useParams<{ id: string }>();
  
  // Create state variables to track loading and store flight data
  const [isLoading, setIsLoading] = useState(true);
  const [flight, setFlight] = useState<Flight | null>(null);
  
  // This runs when the component loads or when the ID changes
  useEffect(() => {
    // Function to get flight details
    const fetchFlightDetails = async () => {
      // Show loading spinner while we get the data
      setIsLoading(true);
      
      // Wait 1 second to simulate getting data from a server
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create example flight data (this would normally come from a server)
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
      
      // Save the flight data and stop the loading spinner
      setFlight(mockFlight);
      setIsLoading(false);
    };
    
    // Call the function to get flight details
    fetchFlightDetails();
  }, [id]); // Run this effect when the ID changes

  // The component's visual structure
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header with navigation */}
      <Header />
      
      {/* Main content area */}
      <main className="pt-24 pb-16">
        {isLoading ? (
          // Show a loading spinner while data is being fetched
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading flight details...</p>
          </div>
        ) : flight ? (
          // Show flight details when data is available
          <FlightDetailsComponent flight={flight} />
        ) : (
          // Show error message if flight is not found
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Flight Not Found</h2>
            <p className="text-gray-600">
              We couldn't find the flight you're looking for.
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
