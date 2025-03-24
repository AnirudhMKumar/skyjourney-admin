
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Plane, Calendar, Luggage, Coffee, Wifi, ChevronRight } from "lucide-react";
import BlurContainer from "../ui/BlurContainer";
import { Flight } from "./FlightCard";

interface FlightDetailsProps {
  flight: Flight;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${flight.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BlurContainer>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {flight.airlineCode}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{flight.airline}</h3>
                  <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{flight.duration}</span>
              </div>
            </div>

            <div className="relative py-8">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>

              <div className="flex gap-6 mb-10 relative">
                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center z-10">
                  <Plane className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">{flight.departureTime}</div>
                      <div className="text-gray-600">{flight.departureCity} ({flight.departureAirport})</div>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="text-sm bg-gray-100 px-3 py-1 rounded-full inline-block">
                        <Calendar className="w-4 h-4 inline-block mr-1" />
                        <span>Departure Date</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 relative">
                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center z-10">
                  <Plane className="w-4 h-4 transform rotate-90" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">{flight.arrivalTime}</div>
                      <div className="text-gray-600">{flight.arrivalCity} ({flight.arrivalAirport})</div>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="text-sm bg-gray-100 px-3 py-1 rounded-full inline-block">
                        <Calendar className="w-4 h-4 inline-block mr-1" />
                        <span>Arrival Date</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-lg mb-4">Flight Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm text-gray-500 mb-2">Aircraft</h5>
                  <p>{flight.aircraft || "Boeing 787 Dreamliner"}</p>
                </div>
                <div>
                  <h5 className="text-sm text-gray-500 mb-2">Flight Number</h5>
                  <p>{flight.flightNumber}</p>
                </div>
                <div>
                  <h5 className="text-sm text-gray-500 mb-2">Duration</h5>
                  <p>{flight.duration}</p>
                </div>
                <div>
                  <h5 className="text-sm text-gray-500 mb-2">Distance</h5>
                  <p>1,243 miles</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <h4 className="font-medium text-lg mb-4">Amenities</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Wifi className="w-6 h-6 mx-auto mb-2 text-sky-500" />
                  <span className="text-sm">Wi-Fi</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Luggage className="w-6 h-6 mx-auto mb-2 text-sky-500" />
                  <span className="text-sm">Baggage</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Coffee className="w-6 h-6 mx-auto mb-2 text-sky-500" />
                  <span className="text-sm">Meals</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-6 h-6 mx-auto mb-2 text-sky-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor">
                      <rect width="20" height="14" x="2" y="3" rx="2" />
                      <line x1="8" x2="16" y1="21" y2="21" />
                      <line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                  </div>
                  <span className="text-sm">Entertainment</span>
                </div>
              </div>
            </div>
          </BlurContainer>

          <BlurContainer className="mt-8">
            <h4 className="font-medium text-lg mb-4">Baggage Information</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Luggage className="w-5 h-5 text-gray-500" />
                  <div>
                    <h5 className="font-medium">Carry-on Baggage</h5>
                    <p className="text-sm text-gray-600">1 personal item + 1 carry-on bag</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Included</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Luggage className="w-5 h-5 text-gray-500" />
                  <div>
                    <h5 className="font-medium">Checked Baggage</h5>
                    <p className="text-sm text-gray-600">1 bag up to 23kg</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Included</span>
                </div>
              </div>
            </div>
          </BlurContainer>
        </div>

        <div>
          <BlurContainer className="sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Base fare</span>
                <span>₹{(flight.price * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & fees</span>
                <span>₹{(flight.price * 0.2).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-xl">₹{flight.price.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={handleBookNow}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg transition-colors font-medium"
            >
              Book Now
            </button>
            
            <div className="mt-6 text-sm text-gray-600">
              <p>Price includes all taxes and fees. No hidden charges.</p>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="font-medium mb-3">Need Help?</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors">
                  <span>Fare Rules</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors">
                  <span>Baggage Policy</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors">
                  <span>Flight Cancellation</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </BlurContainer>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
