import React, { useState } from "react";
import FlightCard, { Flight } from "./FlightCard";
import { Filter, ArrowUpDown } from "lucide-react";

interface FlightListProps {
  flights: Flight[];
}

type SortOption = "price" | "duration" | "departure" | "arrival";

const FlightList: React.FC<FlightListProps> = ({ flights: initialFlights }) => {
  const [flights, setFlights] = useState(initialFlights);
  const [sortBy, setSortBy] = useState<SortOption>("price");
  const [filterStops, setFilterStops] = useState<number | null>(null);
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    
    let sortedFlights = [...flights];
    
    switch (option) {
      case "price":
        sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case "duration":
        sortedFlights.sort((a, b) => {
          const getDurationInMinutes = (duration: string) => {
            const [hours, minutes] = duration.split("h ").map(part => parseInt(part));
            return hours * 60 + (minutes || 0);
          };
          return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
        });
        break;
      case "departure":
        sortedFlights.sort((a, b) => {
          const timeA = a.departureTime.split(":").map(Number);
          const timeB = b.departureTime.split(":").map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
        break;
      case "arrival":
        sortedFlights.sort((a, b) => {
          const timeA = a.arrivalTime.split(":").map(Number);
          const timeB = b.arrivalTime.split(":").map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
        break;
    }
    
    setFlights(sortedFlights);
  };

  const handleFilterChange = () => {
    let filteredFlights = [...initialFlights];
    
    if (filterStops !== null) {
      filteredFlights = filteredFlights.filter(flight => flight.stops === filterStops);
    }
    
    filteredFlights = filteredFlights.filter(
      flight => flight.price >= filterPrice[0] && flight.price <= filterPrice[1]
    );
    
    setFlights(filteredFlights);
  };

  const clearFilters = () => {
    setFilterStops(null);
    setFilterPrice([0, 2000]);
    setFlights(initialFlights);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
          {flights.length} Flights Available
        </h2>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </button>
            
            <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-10">
              <div className="glass rounded-lg p-2 shadow-lg">
                <button
                  onClick={() => handleSort("price")}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    sortBy === "price" ? "bg-sky-50 text-sky-600" : "hover:bg-gray-50"
                  }`}
                >
                  Price
                </button>
                <button
                  onClick={() => handleSort("duration")}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    sortBy === "duration" ? "bg-sky-50 text-sky-600" : "hover:bg-gray-50"
                  }`}
                >
                  Duration
                </button>
                <button
                  onClick={() => handleSort("departure")}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    sortBy === "departure" ? "bg-sky-50 text-sky-600" : "hover:bg-gray-50"
                  }`}
                >
                  Departure Time
                </button>
                <button
                  onClick={() => handleSort("arrival")}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    sortBy === "arrival" ? "bg-sky-50 text-sky-600" : "hover:bg-gray-50"
                  }`}
                >
                  Arrival Time
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-8 glass-card">
          <h3 className="text-lg font-medium mb-4">Filter Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-3">Stops</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={filterStops === null}
                    onChange={() => setFilterStops(null)}
                    className="text-sky-500 focus:ring-sky-500"
                  />
                  <span>Any number of stops</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={filterStops === 0}
                    onChange={() => setFilterStops(0)}
                    className="text-sky-500 focus:ring-sky-500"
                  />
                  <span>Direct flights only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    checked={filterStops === 1}
                    onChange={() => setFilterStops(1)}
                    className="text-sky-500 focus:ring-sky-500"
                  />
                  <span>1 stop</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>₹{filterPrice[0]}</span>
                  <span>₹{filterPrice[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={filterPrice[1]}
                  onChange={(e) => setFilterPrice([filterPrice[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleFilterChange}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-600">Try adjusting your filters or search for different dates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightList;
