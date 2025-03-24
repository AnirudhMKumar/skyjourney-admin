
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plane,
  BookOpen,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import BlurContainer from "../components/ui/BlurContainer";
import Dashboard from "../components/admin/Dashboard";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    navigate("/login");
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin",
    },
    {
      name: "Flights",
      icon: <Plane className="w-5 h-5" />,
      path: "/admin/flights",
    },
    {
      name: "Bookings",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/admin/bookings",
    },
    {
      name: "Users",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:block`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                  <div className="absolute w-4 h-4 bg-white rounded-full animate-pulse-soft"></div>
                  <div className="relative z-10 text-white font-bold text-xs">SJ</div>
                </div>
                <span className="text-lg font-semibold">SkyJourney</span>
              </div>
            ) : (
              <div className="w-8 h-8 mx-auto bg-sky-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">SJ</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-sky-50 text-sky-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full`}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileSidebar}
      ></div>
      
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white w-64 transition-transform duration-300 ease-in-out transform md:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-white rounded-full animate-pulse-soft"></div>
                <div className="relative z-10 text-white font-bold text-xs">SJ</div>
              </div>
              <span className="text-lg font-semibold">SkyJourney</span>
            </div>
            <button onClick={toggleMobileSidebar} className="text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-sky-50 text-sky-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={toggleMobileSidebar}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
          <div className="flex-1 flex items-center">
            <button
              onClick={toggleMobileSidebar}
              className="md:hidden text-gray-500 mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={toggleSidebar}
              className="hidden md:block text-gray-500"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <User className="w-full h-full p-1 text-gray-500" />
                </div>
                <span className="hidden md:block">Admin User</span>
                <ChevronDown className="hidden md:block w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main>
          {location.pathname === "/admin" ? <Dashboard /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Admin;
