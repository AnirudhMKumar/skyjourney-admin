
import React from "react";
import FlightManager from "../components/admin/FlightManager";

const AdminFlights = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Indian Flights</h1>
      <p className="text-gray-600 mb-6">Add, edit, or remove flights from major Indian airlines serving domestic and international routes.</p>
      <FlightManager />
    </div>
  );
};

export default AdminFlights;
