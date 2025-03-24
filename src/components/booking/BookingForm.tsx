
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, Shield, User } from "lucide-react";
import BlurContainer from "../ui/BlurContainer";
import { Flight } from "../flights/FlightCard";

interface BookingFormProps {
  flight: Flight;
  passengers: number;
}

interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ flight, passengers }) => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<"passenger" | "payment" | "review">("passenger");
  const [passengerInfo, setPassengerInfo] = useState<Passenger[]>(
    Array(passengers).fill({
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      passportNumber: "",
      passportExpiry: "",
    })
  );
  const [paymentInfo, setPaymentInfo] = useState<PaymentDetails>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });
  
  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengerInfo];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengerInfo(updatedPassengers);
  };
  
  const handlePaymentChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentInfo({ ...paymentInfo, [field]: value });
  };
  
  const handleNext = () => {
    if (step === "passenger") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("review");
    }
  };
  
  const handleBack = () => {
    if (step === "payment") {
      setStep("passenger");
    } else if (step === "review") {
      setStep("payment");
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/booking-confirmation", { 
      state: { 
        flight, 
        passengers: passengerInfo,
        totalPrice: flight.price * passengers,
      } 
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === "passenger" || step === "payment" || step === "review" 
                ? "bg-sky-500 text-white" 
                : "bg-gray-200 text-gray-500"
            }`}>
              <User className="w-5 h-5" />
            </div>
            <span className={`text-sm mt-2 ${
              step === "passenger" ? "text-sky-500 font-medium" : "text-gray-600"
            }`}>Passenger</span>
          </div>
          
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === "payment" || step === "review" 
                ? "bg-sky-500 text-white" 
                : "bg-gray-200 text-gray-500"
            }`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <span className={`text-sm mt-2 ${
              step === "payment" ? "text-sky-500 font-medium" : "text-gray-600"
            }`}>Payment</span>
          </div>
          
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === "review" 
                ? "bg-sky-500 text-white" 
                : "bg-gray-200 text-gray-500"
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <span className={`text-sm mt-2 ${
              step === "review" ? "text-sky-500 font-medium" : "text-gray-600"
            }`}>Review</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {step === "passenger" && (
              <BlurContainer>
                <h2 className="text-2xl font-semibold mb-6">Passenger Information</h2>
                
                {Array.from({ length: passengers }).map((_, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-lg font-medium mb-4">
                      Passenger {index + 1}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <select
                          value={passengerInfo[index].title}
                          onChange={(e) => handlePassengerChange(index, "title", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        >
                          <option value="">Select</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={passengerInfo[index].firstName}
                          onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={passengerInfo[index].lastName}
                          onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={passengerInfo[index].email}
                          onChange={(e) => handlePassengerChange(index, "email", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={passengerInfo[index].phone}
                          onChange={(e) => handlePassengerChange(index, "phone", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={passengerInfo[index].dateOfBirth}
                          onChange={(e) => handlePassengerChange(index, "dateOfBirth", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={passengerInfo[index].passportNumber}
                          onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Expiry
                        </label>
                        <input
                          type="date"
                          value={passengerInfo[index].passportExpiry}
                          onChange={(e) => handlePassengerChange(index, "passportExpiry", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </BlurContainer>
            )}
            
            {step === "payment" && (
              <BlurContainer>
                <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Card Details</h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => handlePaymentChange("cardholderName", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                        placeholder="123"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.billingAddress}
                        onChange={(e) => handlePaymentChange("billingAddress", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.city}
                        onChange={(e) => handlePaymentChange("city", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.zipCode}
                        onChange={(e) => handlePaymentChange("zipCode", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.country}
                        onChange={(e) => handlePaymentChange("country", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Review Booking <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </BlurContainer>
            )}
            
            {step === "review" && (
              <BlurContainer>
                <h2 className="text-2xl font-semibold mb-6">Review Booking</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Flight Details</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Airline</p>
                        <p className="font-medium">{flight.airline} ({flight.flightNumber})</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{flight.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-medium">{flight.departureCity} ({flight.departureAirport}) at {flight.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-medium">{flight.arrivalCity} ({flight.arrivalAirport}) at {flight.arrivalTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Passenger Summary</h3>
                  
                  {passengerInfo.map((passenger, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{passenger.title} {passenger.firstName} {passenger.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{passenger.email} | {passenger.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Passport</p>
                          <p className="font-medium">{passenger.passportNumber}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Payment Summary</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Card</p>
                        <p className="font-medium">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cardholder</p>
                        <p className="font-medium">{paymentInfo.cardholderName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Billing Address</p>
                        <p className="font-medium">{paymentInfo.billingAddress}, {paymentInfo.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium text-sky-600">${(flight.price * passengers).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Confirm Booking <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </BlurContainer>
            )}
          </form>
        </div>
        
        <div>
          <BlurContainer className="sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Flight</p>
                <p className="font-medium">{flight.departureCity} → {flight.arrivalCity}</p>
              </div>
              <span>${flight.price.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Passengers</p>
                <p className="font-medium">{passengers} {passengers === 1 ? "Adult" : "Adults"}</p>
              </div>
              <span>x {passengers}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Base Fare</span>
                <span>${(flight.price * passengers * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Taxes & Fees</span>
                <span>${(flight.price * passengers * 0.2).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center font-semibold">
              <span>Total</span>
              <span className="text-xl">${(flight.price * passengers).toFixed(2)}</span>
            </div>
            
            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2">Booking a flight means you accept our:</p>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-sky-600 hover:underline">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-sky-600 hover:underline">Fare Rules</a>
                </li>
                <li>
                  <a href="#" className="text-sky-600 hover:underline">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </BlurContainer>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
