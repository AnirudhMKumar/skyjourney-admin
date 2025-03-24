
import React, { useState } from "react";
import { Edit, Trash2, Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import BlurContainer from "../ui/BlurContainer";

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  status: "scheduled" | "in-air" | "arrived" | "delayed" | "cancelled";
  price: number;
}

const FlightManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Flight>("departureTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentFlight, setCurrentFlight] = useState<Flight | null>(null);

  // Sample flight data
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "FL001",
      flightNumber: "SJ101",
      airline: "SkyJourney Airways",
      departure: "New York (JFK)",
      departureTime: "2023-08-15 08:30",
      arrival: "Los Angeles (LAX)",
      arrivalTime: "2023-08-15 11:45",
      status: "scheduled",
      price: 349,
    },
    {
      id: "FL002",
      flightNumber: "SJ205",
      airline: "SkyJourney Airways",
      departure: "London (LHR)",
      departureTime: "2023-08-16 13:15",
      arrival: "Paris (CDG)",
      arrivalTime: "2023-08-16 15:30",
      status: "scheduled",
      price: 220,
    },
    {
      id: "FL003",
      flightNumber: "SJ310",
      airline: "SkyJourney Airways",
      departure: "Tokyo (HND)",
      departureTime: "2023-08-15 23:45",
      arrival: "Sydney (SYD)",
      arrivalTime: "2023-08-16 10:20",
      status: "in-air",
      price: 890,
    },
    {
      id: "FL004",
      flightNumber: "SJ422",
      airline: "SkyJourney Airways",
      departure: "Chicago (ORD)",
      departureTime: "2023-08-17 11:00",
      arrival: "Miami (MIA)",
      arrivalTime: "2023-08-17 14:30",
      status: "scheduled",
      price: 320,
    },
    {
      id: "FL005",
      flightNumber: "SJ550",
      airline: "SkyJourney Airways",
      departure: "Dubai (DXB)",
      departureTime: "2023-08-16 01:30",
      arrival: "Singapore (SIN)",
      arrivalTime: "2023-08-16 13:45",
      status: "delayed",
      price: 750,
    },
  ]);

  const getStatusColor = (status: Flight["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-air":
        return "bg-green-100 text-green-800";
      case "arrived":
        return "bg-purple-100 text-purple-800";
      case "delayed":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openModal = (flight?: Flight) => {
    setCurrentFlight(flight || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFlight(null);
  };

  const handleSort = (field: keyof Flight) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSaveFlight = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real application, you would send this data to a server
    if (currentFlight) {
      if (currentFlight.id) {
        // Update existing flight
        setFlights(
          flights.map((flight) =>
            flight.id === currentFlight.id ? currentFlight : flight
          )
        );
      } else {
        // Add new flight
        const newFlight = {
          ...currentFlight,
          id: `FL${Math.floor(Math.random() * 1000)}`,
        };
        setFlights([...flights, newFlight]);
      }
    }
    closeModal();
  };

  const handleDeleteFlight = (id: string) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      setFlights(flights.filter((flight) => flight.id !== id));
    }
  };

  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Flight Management</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Flight
        </button>
      </div>

      <BlurContainer className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("flightNumber")}
                >
                  <div className="flex items-center">
                    Flight No.
                    {sortField === "flightNumber" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Airline
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("departure")}
                >
                  <div className="flex items-center">
                    Departure
                    {sortField === "departure" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("arrival")}
                >
                  <div className="flex items-center">
                    Arrival
                    {sortField === "arrival" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "status" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    Price
                    {sortField === "price" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedFlights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {flight.flightNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {flight.airline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{flight.departure}</div>
                    <div className="text-xs text-gray-400">{flight.departureTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{flight.arrival}</div>
                    <div className="text-xs text-gray-400">{flight.arrivalTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                        flight.status
                      )}`}
                    >
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${flight.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal(flight)}
                        className="text-sky-600 hover:text-sky-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFlight(flight.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BlurContainer>

      {/* Flight Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <BlurContainer className="w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {currentFlight && currentFlight.id ? "Edit Flight" : "Add New Flight"}
            </h2>
            <form onSubmit={handleSaveFlight}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    value={currentFlight?.flightNumber || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        flightNumber: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Airline
                  </label>
                  <input
                    type="text"
                    value={currentFlight?.airline || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        airline: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure
                  </label>
                  <input
                    type="text"
                    value={currentFlight?.departure || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        departure: e.target.value,
                      })
                    }
                    placeholder="City (Code)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Time
                  </label>
                  <input
                    type="text"
                    value={currentFlight?.departureTime || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        departureTime: e.target.value,
                      })
                    }
                    placeholder="YYYY-MM-DD HH:MM"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival
                  </label>
                  <input
                    type="text"
                    value={currentFlight?.arrival || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        arrival: e.target.value,
                      })
                    }
                    placeholder="City (Code)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Time
                  </label>
                  <input
                    type="text"
                    value={currentFlight?.arrivalTime || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        arrivalTime: e.target.value,
                      })
                    }
                    placeholder="YYYY-MM-DD HH:MM"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={currentFlight?.status || "scheduled"}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        status: e.target.value as Flight["status"],
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="in-air">In Air</option>
                    <option value="arrived">Arrived</option>
                    <option value="delayed">Delayed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={currentFlight?.price || ""}
                    onChange={(e) =>
                      setCurrentFlight({
                        ...currentFlight!,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Save Flight
                </button>
              </div>
            </form>
          </BlurContainer>
        </div>
      )}
    </div>
  );
};

export default FlightManager;
