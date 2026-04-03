import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <Loader className="size-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-300 font-medium">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Navbar />
        <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Layout;