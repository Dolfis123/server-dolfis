import React, { useState } from "react";
import logo from "../../assets/img/logo.jpg";

function Navbar({ onToggleSidebar }) {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center">
          <i
            className="bx bx-menu text-2xl cursor-pointer"
            onClick={onToggleSidebar}
          ></i>
          <a href="#" className="ml-4 text-lg font-semibold">
            Categories
          </a>
        </div>
        <form action="#" className="flex items-center">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="border rounded-lg py-2 px-4"
            />
            <button type="submit" className="absolute top-0 right-0 mt-2 mr-2">
              <i className="bx bx-search text-lg"></i>
            </button>
          </div>
        </form>
        <div className="flex items-center">
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode ml-4"></label>
          <a href="#" className="ml-4 relative">
            <i className="bx bxs-bell text-2xl"></i>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              8
            </span>
          </a>
          <a href="#" className="ml-4">
            <img src={logo} className="w-8 h-8 rounded-full" alt="Profile" />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
