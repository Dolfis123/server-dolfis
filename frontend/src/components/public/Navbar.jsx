import React, { useState } from "react";
import logo from "../../public/img/logo.jpg";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white fixed w-full shadow-lg z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10" />
            <h2 className="text-primary">Kelurahan Sowi</h2>
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
            className={`lg:flex lg:items-center lg:justify-between w-full ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbarCollapse"
          >
            <div className="navbar-nav flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <Link
                to="/"
                className="nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300"
              >
                Beranda
              </Link>
              <Link
                to="/pelayanan"
                className="nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300"
              >
                Layanan
              </Link>
              {/* <ScrollLink
                to="layanan"
                smooth={true}
                duration={500}
                className="nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300"
              >
                Layanan
              </ScrollLink>
              <ScrollLink
                to="Kontak"
                smooth={true}
                duration={500}
                className="nav-item nav-link cursor-pointer py-2 px-4 hover:text-primary transition-colors duration-300"
              >
                Kontak
              </ScrollLink> */}
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
    </div>
  );
}

export default Navbar;
