
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlurContainer from "../components/ui/BlurContainer";
import { Check, Printer, Download, Mail, Calendar, Plane } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers, totalPrice } = location.state || {};
  
  const bookingNumber = `SJ${Math.floor(100000 + Math.random() * 900000)}`;
  
  // If there's no flight in the state, redirect to home
  if (!flight) {
    React.useEffect(() => {
      navigate("/");
    }, []);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Your booking has been confirmed and your tickets are ready.
              Check your email for more details.
            </p>
          </div>
          
          <BlurContainer className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium">
                Confirmed
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
                <p className="font-semibold">{bookingNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Booking Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Amount Paid</p>
                <p className="font-semibold">${totalPrice || (flight.price * (passengers?.length || 1)).toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium">Credit Card (ending in 1234)</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-medium mb-4">Flight Information</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{flight.flightNumber} • {flight.airline}</span>
                  <span className="text-sm text-gray-500">
                    <Plane className="w-4 h-4 inline mr-1" />
                    {flight.aircraft}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold">{flight.departureTime}</p>
                    <p className="text-sm">{flight.departureCity} ({flight.departureAirport})</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500">{flight.duration}</p>
                    <div className="relative w-24 h-px bg-gray-300 my-2">
                      <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-sky-500"></div>
                      <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-sky-500"></div>
                    </div>
                    <p className="text-xs text-gray-500">Direct</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-semibold">{flight.arrivalTime}</p>
                    <p className="text-sm">{flight.arrivalCity} ({flight.arrivalAirport})</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-medium mb-4">Passenger Details</h3>
              
              {passengers ? (
                <div className="space-y-3">
                  {passengers.map((passenger: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">
                        {passenger.title} {passenger.firstName} {passenger.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Passport: {passenger.passportNumber} • Seat: To be assigned
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Passenger information</p>
                  <p className="text-sm text-gray-500">
                    You'll receive your boarding passes 24 hours before departure
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-5 h-5" />
                <span>Print</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>
          </BlurContainer>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-3 w-10 h-10 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-sky-600" />
                </div>
                <h4 className="font-medium mb-2">Confirmation Email</h4>
                <p className="text-sm text-gray-600">
                  Check your inbox for your booking confirmation email with all details.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-3 w-10 h-10 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-sky-600" />
                </div>
                <h4 className="font-medium mb-2">Check-in</h4>
                <p className="text-sm text-gray-600">
                  Online check-in opens 24 hours before your flight departure.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-3 w-10 h-10 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-sky-600" />
                </div>
                <h4 className="font-medium mb-2">Travel Information</h4>
                <p className="text-sm text-gray-600">
                  Visit our travel guide for information about baggage and airport procedures.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/")}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
