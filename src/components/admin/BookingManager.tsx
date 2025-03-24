
import React, { useState } from "react";
import { Search, Filter, ArrowUpDown, Eye, XCircle, CheckCircle } from "lucide-react";
import BlurContainer from "../ui/BlurContainer";

interface Booking {
  id: string;
  passenger: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  amount: number;
}

const BookingManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Booking>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample booking data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "B-12345",
      passenger: "John Doe",
      flightNumber: "SJ101",
      from: "New York (JFK)",
      to: "Los Angeles (LAX)",
      date: "2023-08-15",
      status: "confirmed",
      amount: 420,
    },
    {
      id: "B-12346",
      passenger: "Sarah Smith",
      flightNumber: "SJ205",
      from: "London (LHR)",
      to: "Paris (CDG)",
      date: "2023-08-14",
      status: "pending",
      amount: 320,
    },
    {
      id: "B-12347",
      passenger: "Michael Brown",
      flightNumber: "SJ310",
      from: "Tokyo (HND)",
      to: "Sydney (SYD)",
      date: "2023-08-13",
      status: "completed",
      amount: 870,
    },
    {
      id: "B-12348",
      passenger: "Emily Wilson",
      flightNumber: "SJ422",
      from: "Chicago (ORD)",
      to: "Miami (MIA)",
      date: "2023-08-12",
      status: "cancelled",
      amount: 380,
    },
    {
      id: "B-12349",
      passenger: "David Lee",
      flightNumber: "SJ550",
      from: "San Francisco (SFO)",
      to: "Seattle (SEA)",
      date: "2023-08-11",
      status: "confirmed",
      amount: 290,
    },
    {
      id: "B-12350",
      passenger: "Maria Garcia",
      flightNumber: "SJ635",
      from: "Madrid (MAD)",
      to: "Barcelona (BCN)",
      date: "2023-08-16",
      status: "confirmed",
      amount: 210,
    },
    {
      id: "B-12351",
      passenger: "Robert Johnson",
      flightNumber: "SJ772",
      from: "Sydney (SYD)",
      to: "Melbourne (MEL)",
      date: "2023-08-17",
      status: "pending",
      amount: 180,
    },
  ]);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSort = (field: keyof Booking) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleUpdateStatus = (id: string, status: Booking["status"]) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status });
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBookings = [...filteredBookings].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>

      <BlurContainer className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Booking ID
                    {sortField === "id" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("passenger")}
                >
                  <div className="flex items-center">
                    Passenger
                    {sortField === "passenger" && (
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "date" && (
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
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center">
                    Amount
                    {sortField === "amount" && (
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
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.passenger}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{booking.flightNumber}</div>
                    <div className="text-xs text-gray-400">
                      {booking.from} → {booking.to}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="text-sky-600 hover:text-sky-900"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {booking.status !== "confirmed" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                          className="text-green-600 hover:text-green-900"
                          title="Confirm Booking"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {booking.status !== "cancelled" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel Booking"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BlurContainer>

      {/* Booking Details Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <BlurContainer className="w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Booking Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Booking ID:</span>{" "}
                    <span className="font-medium">{selectedBooking.id}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Date:</span>{" "}
                    <span className="font-medium">{selectedBooking.date}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Amount:</span>{" "}
                    <span className="font-medium">${selectedBooking.amount}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Passenger Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Name:</span>{" "}
                    <span className="font-medium">{selectedBooking.passenger}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Email:</span>{" "}
                    <span className="font-medium">
                      {selectedBooking.passenger.toLowerCase().replace(" ", ".") + "@example.com"}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Phone:</span>{" "}
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Flight Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Flight Number</p>
                    <p className="font-medium">{selectedBooking.flightNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="font-medium">{selectedBooking.from.split(" ")[0]}</p>
                    <p className="text-sm text-gray-500">
                      {selectedBooking.from.match(/\(([^)]+)\)/)?.[1]}
                    </p>
                  </div>

                  <div className="flex-1 mx-4 relative">
                    <div className="border-t-2 border-gray-300 border-dashed"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-medium">{selectedBooking.to.split(" ")[0]}</p>
                    <p className="text-sm text-gray-500">
                      {selectedBooking.to.match(/\(([^)]+)\)/)?.[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedBooking.id, "confirmed");
                    closeModal();
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mr-2"
                  disabled={selectedBooking.status === "confirmed"}
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedBooking.id, "cancelled");
                    closeModal();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  disabled={selectedBooking.status === "cancelled"}
                >
                  Cancel Booking
                </button>
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </BlurContainer>
        </div>
      )}
    </div>
  );
};

export default BookingManager;
