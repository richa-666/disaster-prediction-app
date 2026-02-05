import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
                    <ShieldAlert className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight">DisasterGuard</span>
                </Link>
                <div className="flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm uppercase tracking-wide">Home</Link>
                    <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition text-sm uppercase tracking-wide">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
