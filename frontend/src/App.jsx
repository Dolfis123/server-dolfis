import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Beranda from "./pages/public/Beranda";
import Login from "./pages/public/Login";
import Dashboard from "./pages/admin/Dashboard";
import BerandaAdmin from "./pages/admin/BerandaAdmin";
import BeritaAdmin from "./pages/admin/BeritaAdmin";
import Pegawai from "./pages/admin/Pegawai";
import PersyaSuratDomUsaha from "./pages/public/persyaratan/PersyaSuratDomUsaha";
import ConfirmasiDataSDUsaha from "./pages/public/confirmasiSurat/ConfirmasiDataSDUsaha";
import EditSDUsaha from "./pages/public/editSurat/EditSDUsaha";
import BuktiSDUsaha from "./pages/public/bukti/BuktiSDUsaha";
import SDUsaha from "./pages/public/format/SDUsaha";
import SDUsahaAdmin from "./pages/admin/permintaan/SDUsahaAdmin";
import Surat from "./pages/admin/Surat";
import SDUsahaDiterima from "./pages/admin/arsip/SDUsahaDiterima";
import LatterSDUsaha from "./pages/admin/latters/LatterSDUsaha";
import NewsDetail from "./pages/public/NewsDetail";
import PersyaratanPelayanan from "./pages/admin/PersyaratanPelayanan";
import Pelayanan from "./pages/public/Pelayanan";
import Wilayah from "./pages/public/Wilayah";
import MarkerRw from "./pages/admin/MarkerRW";

const isAuthenticated = () => {
  return !!sessionStorage.getItem("token");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/pelayanan" element={<Pelayanan />} />
          <Route path="/wilayah" element={<Wilayah />} />
          <Route path="/marker-rw" element={<MarkerRw />} />

          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          {/* Dashboard start */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beranda-admin"
            element={
              <ProtectedRoute>
                <BerandaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/berita-admin"
            element={
              <ProtectedRoute>
                <BeritaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pegawai-admin"
            element={
              <ProtectedRoute>
                <Pegawai />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permintaan-domisili-usaha"
            element={
              <ProtectedRoute>
                <SDUsahaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/persyaratan-layanan"
            element={
              <ProtectedRoute>
                <PersyaratanPelayanan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/surat"
            element={
              <ProtectedRoute>
                <Surat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diterima-arsip"
            element={
              <ProtectedRoute>
                <SDUsahaDiterima />
              </ProtectedRoute>
            }
          />
          {/* Dashboard end */}
          {/* Format surat Start */}
          <Route path="/surat-ket-domisili-usaha" element={<SDUsaha />} />
          <Route
            path="/persyaratan-surat-ket-domisili/:hashed_id"
            element={<PersyaSuratDomUsaha />}
          />
          <Route
            path="/confir-data-domisili-usaha/:hashed_id"
            element={<ConfirmasiDataSDUsaha />}
          />
          <Route
            path="/edit-domisili-usaha/:hashed_id"
            element={<EditSDUsaha />}
          />
          <Route
            path="/format-surat-domisili/:id"
            element={<LatterSDUsaha />}
          />
          <Route
            path="/bukti-surat-domisili-usaha/:hashed_id"
            element={<BuktiSDUsaha />}
          />
          {/* Format surat End */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
