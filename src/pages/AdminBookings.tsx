
import React from "react";
import BookingManager from "../components/admin/BookingManager";

const AdminBookings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <p className="text-gray-600 mb-6">View and manage all bookings across Indian domestic and international flights.</p>
      <BookingManager />
    </div>
  );
};

export default AdminBookings;
