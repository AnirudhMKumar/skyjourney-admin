import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUp, ArrowDown, DollarSign, Users } from "lucide-react";
import BlurContainer from "../ui/BlurContainer";

const Dashboard = () => {
  // Sample data for the charts
  const bookingData = [
    { name: "Jan", bookings: 350 },
    { name: "Feb", bookings: 300 },
    { name: "Mar", bookings: 450 },
    { name: "Apr", bookings: 400 },
    { name: "May", bookings: 500 },
    { name: "Jun", bookings: 550 },
    { name: "Jul", bookings: 600 },
  ];

  const flightData = [
    { name: 'Domestic', value: 65 },
    { name: 'International', value: 35 },
  ];

  const COLORS = ["#0EA5E9", "#E2E8F0"];

  const stats = [
    {
      title: "Total Bookings",
      value: "14,324",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Revenue",
      value: "₹1.2M",
      change: "+8.2%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Cancellations",
      value: "234",
      change: "-3.1%",
      trend: "down",
      icon: <ArrowDown className="w-5 h-5" />,
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Avg. Ticket Price",
      value: "₹28,412",
      change: "+5.3%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  const recentBookings = [
    {
      id: "B-12345",
      passenger: "John Doe",
      from: "New York",
      to: "Los Angeles",
      date: "2023-08-15",
      amount: "₹28,420",
    },
    {
      id: "B-12346",
      passenger: "Sarah Smith",
      from: "London",
      to: "Paris",
      date: "2023-08-14",
      amount: "₹22,320",
    },
    {
      id: "B-12347",
      passenger: "Michael Brown",
      from: "Tokyo",
      to: "Sydney",
      date: "2023-08-13",
      amount: "₹60,870",
    },
    {
      id: "B-12348",
      passenger: "Emily Wilson",
      from: "Chicago",
      to: "Miami",
      date: "2023-08-12",
      amount: "₹26,380",
    },
    {
      id: "B-12349",
      passenger: "David Lee",
      from: "San Francisco",
      to: "Seattle",
      date: "2023-08-11",
      amount: "₹20,290",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <BlurContainer key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold my-1">{stat.value}</p>
                <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                  stat.trend === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </BlurContainer>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <BlurContainer className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Booking Trends</h2>
            <div className="flex gap-2">
              <select className="text-sm p-1 border border-gray-300 rounded">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={bookingData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="#0EA5E9" fill="#BAE6FD" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BlurContainer>

        <BlurContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Flight Distribution</h2>
          </div>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={flightData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {flightData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {flightData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </BlurContainer>
      </div>

      <BlurContainer>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Bookings</h2>
          <a href="#" className="text-sky-600 text-sm">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passenger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.passenger}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.from} → {booking.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BlurContainer>
    </div>
  );
};

export default Dashboard;
