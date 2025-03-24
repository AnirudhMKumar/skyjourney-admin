
import React from "react";
import { ChevronRight, Clock, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define what a Flight object looks like
export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  aircraft?: string;
}

// Define what props the FlightCard component needs
interface FlightCardProps {
  flight: Flight;
}

// FlightCard component shows a summary of a flight
const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  // This helps us navigate to different pages
  const navigate = useNavigate();

  // Function that runs when "View Details" is clicked
  const handleViewDetails = () => {
    navigate(`/flight/${flight.id}`);
  };

  return (
    <div className="glass-card hover-lift">
      {/* Top section with airline and price */}
      <div className="flex justify-between items-center mb-4">
        {/* Left side - Airline info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            {flight.airlineCode}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{flight.airline}</h3>
            <p className="text-sm text-gray-500">{flight.flightNumber}</p>
          </div>
        </div>
        
        {/* Right side - Price */}
        <div className="text-right">
          <span className="text-2xl font-semibold text-gray-900">₹{flight.price}</span>
          <p className="text-sm text-gray-500">per person</p>
        </div>
      </div>

      {/* Middle section with flight route details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        {/* Departure details */}
        <div className="flex flex-col items-start mb-4 md:mb-0">
          <span className="text-2xl font-semibold text-gray-900">{flight.departureTime}</span>
          <span className="text-gray-600">{flight.departureCity} ({flight.departureAirport})</span>
        </div>

        {/* Flight path visualization */}
        <div className="flex flex-col items-center">
          <div className="text-gray-500 text-sm">{flight.duration}</div>
          <div className="relative w-20 md:w-32 lg:w-48 h-px bg-gray-300 my-2">
            <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-sky-500"></div>
            <Plane className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-4 h-4 text-sky-500" />
            <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-sky-500"></div>
          </div>
          <div className="text-gray-500 text-sm">
            {flight.stops === 0
              ? "Direct"
              : flight.stops === 1
              ? "1 Stop"
              : `${flight.stops} Stops`}
          </div>
        </div>

        {/* Arrival details */}
        <div className="flex flex-col items-end">
          <span className="text-2xl font-semibold text-gray-900">{flight.arrivalTime}</span>
          <span className="text-gray-600">{flight.arrivalCity} ({flight.arrivalAirport})</span>
        </div>
      </div>

      {/* Bottom section with duration and view details button */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{flight.duration}</span>
        </div>
        <button
          onClick={handleViewDetails}
          className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium"
        >
          View Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
