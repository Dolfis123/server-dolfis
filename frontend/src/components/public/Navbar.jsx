import React, { useState } from "react";
import logo from "../../public/img/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import "../../css/public/navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600 font-bold"
      : "text-gray-700";
  };

  return (
    <nav className="bg-white fixed w-full shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10" />
          <h2 className="text-primary whitespace-nowrap lg:whitespace-normal">
            Kelurahan Sowi
          </h2>
        </Link>
        <div className="lg:hidden">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="fa fa-bars"></span>
          </button>
        </div>
        <div
          className={`lg:flex lg:items-center lg:space-x-4 w-full lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbarCollapse"
        >
          <div className="navbar-nav flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            <Link
              to="/"
              className={`nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300 ${isActive(
                "/"
              )}`}
            >
              Beranda
            </Link>
            <Link
              to="/pelayanan"
              className={`nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300 ${isActive(
                "/pelayanan"
              )}`}
            >
              Layanan
            </Link>
            <Link
              to="/wilayah"
              className={`nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300 ${isActive(
                "/wilayah"
              )}`}
            >
              Peta Wilayah
            </Link>
          </div>
          <Link
            to="/login"
            className="btn bg-primary text-white rounded-full py-2 px-4 lg:ml-4 mt-3 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
