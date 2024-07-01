import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/admin/sidebar.css"; // Import your CSS file

function Sidebar({ activeComponent }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    permintaan: false,
    arsip: false,
    wilayah: false,
  });

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handleLogout = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmed) {
      try {
        await axios.get("https://website.fahri.life/api/logout");
        sessionStorage.removeItem("token");
        navigate("/");
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
  };

  return (
    <div>
      {/* <!-- SIDEBAR --> */}
      <section id="sidebar">
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">Admin</span>
        </a>
        <ul className="side-menu top">
          <li className={`${activeComponent === "Dashboard" ? "active" : ""}`}>
            <Link to="/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className={`${activeComponent === "Beranda" ? "active" : ""}`}>
            <Link to="/beranda-admin">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Beranda</span>
            </Link>
          </li>
          <li
            className={`${activeComponent === "Persyaratan" ? "active" : ""}`}
          >
            <Link to="/persyaratan-layanan">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Persyaratan</span>
            </Link>
          </li>
          <li className={`${activeComponent === "Berita" ? "active" : ""}`}>
            <Link to="/berita-admin">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Berita</span>
            </Link>
          </li>
          <ul>
            <li
              className={`${activeComponent === "Permintaan" ? "active" : ""}`}
            >
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleDropdown("permintaan")}
              >
                <div className="flex items-center">
                  <i className="bx bxs-doughnut-chart"></i>
                  <span className="text ml-2">Permintaan</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen.permintaan ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isDropdownOpen.permintaan && (
                <ul className="pl-8 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/permintaan-domisili-usaha"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Permintaan Domisili Usaha
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/permintaan-domisili-usaha"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Permintaan Domisili Usaha
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/permintaan/ditolak"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Permintaan Ditolak
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`${activeComponent === "Arsip" ? "active" : ""}`}>
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleDropdown("arsip")}
              >
                <div className="flex items-center">
                  <i className="bx bxs-group"></i>
                  <span className="text ml-2">Arsip</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen.arsip ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isDropdownOpen.arsip && (
                <ul className="pl-8 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/diterima-arsip"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Arsip Surat Masuk
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/arsip/surat-keluar"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Surat Keluar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/arsip/laporan"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Laporan
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul className="side-menu">
            <li className={`${activeComponent === "Surat" ? "active" : ""}`}>
              <Link to="/surat">
                <i className="bx bxs-message-dots"></i>
                <span className="text">Surat</span>
              </Link>
            </li>
          </ul>
          <li
            className={`${activeComponent === "Peta Wilayah" ? "active" : ""}`}
          >
            <button
              className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none"
              onClick={() => toggleDropdown("wilayah")}
            >
              <div className="flex items-center">
                <i className="bx bxs-group"></i>
                <span className="text ml-2">Peta Wilayah</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isDropdownOpen.arsip ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isDropdownOpen.wilayah && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/marker-rw"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Marker RW
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className={`${activeComponent === "Pegawai" ? "active" : ""}`}>
            <Link to="/pegawai-admin">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Pegawai</span>
            </Link>
          </li>
          {/* <li>
            <Link href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Peta Wilayah</span>
            </Link>
          </li> */}
          <li>
            <Link to="#" className="logout" onClick={handleLogout}>
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Keluar</span>
            </Link>
          </li>
          <li>
            <a href="#" className="logout" onClick={handleLogout}>
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Keluar</span>
            </a>
          </li>
        </ul>
      </section>
      {/* <!-- SIDEBAR --> */}
    </div>
  );
}

export default Sidebar;
