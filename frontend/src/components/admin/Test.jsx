import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/admin/sidebar.css"; // Import your CSS file

function Sidebar({ activeComponent }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    permintaan: false,
    arsip: false,
  });

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowModal(false);
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
          <li className={`${activeComponent === "Pegawai" ? "active" : ""}`}>
            <Link to="/pegawai-admin">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Pegawai</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <Link href="#" className="logout" onClick={handleLogout}>
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </section>
      {/* <!-- SIDEBAR --> */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full slide-down">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Konfirmasi Logout
              </h3>
              <button
                type="button"
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
                onClick={cancelLogout}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p>Apakah Anda yakin ingin logout?</p>
            </div>
            <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={confirmLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={cancelLogout}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
