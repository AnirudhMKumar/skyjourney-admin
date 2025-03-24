
import React from "react";
import { ArrowRight, Clock, Plane, Calendar, Users, CreditCard } from "lucide-react";
import { Flight } from "./FlightCard";
import BlurContainer from "../ui/BlurContainer";

// Interface defining the props for the FlightDetails component
interface FlightDetailsProps {
  flight: Flight;
}

// FlightDetails component that displays detailed information about a flight
const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Flight header section */}
      <BlurContainer className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold">
              {flight.airlineCode}
            </div>
            <div>
              <h3 className="text-xl font-medium">{flight.airline}</h3>
              <p className="text-sm text-gray-500">Flight {flight.flightNumber}</p>
            </div>
          </div>
          
          <div className="bg-sky-50 py-2 px-4 rounded-full flex items-center gap-2 text-sky-700">
            <Clock className="w-4 h-4" />
            <span>{flight.duration}</span>
          </div>
        </div>
        
        {/* Flight route visualization */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-8">
          <div className="text-center mb-4 md:mb-0 md:text-left">
            <p className="text-sm text-gray-500">Departure</p>
            <h3 className="text-3xl font-bold">{flight.departureTime}</h3>
            <p className="text-gray-700">{flight.departureCity} ({flight.departureAirport})</p>
          </div>
          
          <div className="flex-1 flex items-center justify-center my-4 md:my-0">
            <div className="w-24 md:w-48 lg:w-64 h-px bg-gray-300 relative">
              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-gray-400"></div>
              <Plane className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-5 h-5 text-sky-500" />
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500">Arrival</p>
            <h3 className="text-3xl font-bold">{flight.arrivalTime}</h3>
            <p className="text-gray-700">{flight.arrivalCity} ({flight.arrivalAirport})</p>
          </div>
        </div>
        
        {/* Flight stops information */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 py-1 px-4 rounded-full text-sm text-gray-700">
            {flight.stops === 0 ? "Direct Flight" : flight.stops === 1 ? "1 Stop" : `${flight.stops} Stops`}
          </div>
        </div>
      </BlurContainer>
      
      {/* Flight details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <BlurContainer>
          <h3 className="text-lg font-medium mb-4">Flight Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Airline</span>
              <span className="font-medium">{flight.airline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Flight Number</span>
              <span className="font-medium">{flight.flightNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Aircraft</span>
              <span className="font-medium">{flight.aircraft || "Information not available"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">{flight.duration}</span>
            </div>
          </div>
        </BlurContainer>
        
        <BlurContainer>
          <h3 className="text-lg font-medium mb-4">Price Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">₹{flight.price - 450}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees</span>
              <span className="font-medium">₹450</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-gray-700 font-medium">Total Price</span>
              <span className="text-xl font-bold text-sky-600">₹{flight.price}</span>
            </div>
          </div>
        </BlurContainer>
      </div>
      
      {/* Booking button section */}
      <div className="text-center">
        <a
          href={`/booking/${flight.id}`}
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
        >
          Book This Flight <ArrowRight className="w-4 h-4" />
        </a>
        <p className="mt-2 text-sm text-gray-500">No hidden charges • Free cancellation within 24 hours</p>
      </div>
    </div>
  );
};

export default FlightDetails;
