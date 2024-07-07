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
import SuratKetDomisili from "./pages/public/format/SuratKetDomisili";
import SuratTidakMampu from "./pages/public/format/SuratTidakMampu";

import PersyaratanSuratKetDomisili from "./pages/public/persyaratan/PersyaratanSuratKetDomisili";
import BuktiSuratDomisili from "./pages/public/bukti/BuktiSuratDomisili";
import PersyaratanSuratTidakMampuPendidikan from "./pages/public/persyaratan/PersyaratanSuratTidakMampuPendidikan";
import BuktiSuratTidakMampuPendidikan from "./pages/public/bukti/BuktiSuratTidakMampuPendidikan";
import SuratDomisiliUmum from "./pages/admin/permintaan/SuratDomisiliUmum";
import SuratTidakMampuPendidikan from "./pages/admin/permintaan/SuratTidakMampuPendidikan";
import PersyaratanKetKtp from "./pages/public/persyaratan/PersyaratanKetKtp";
import SuratKetKtp from "./pages/public/format/SuratKetKtp";
import BuktiSuratKetKTP from "./pages/public/bukti/BuktiSuratKetKTP";
import PerSuratKetKTP from "./pages/admin/permintaan/PerSuratKetKTP";
import ArsipKetKtp from "./pages/admin/arsip/ArsipKetKtp";
import ArsipKetDomisiliUmum from "./pages/admin/arsip/ArsipKetDomisiliUmum";
import ArsipKetTidakMampuPendidikan from "./pages/admin/arsip/ArsipKetTidakMampuPendidikan";
import SuratKetKk from "./pages/public/format/SuratKetKk";
import PersyaratanKetKk from "./pages/public/persyaratan/PersyaratanKetKk";
import BuktiKetKk from "./pages/public/bukti/BuktiKetKk";
import SuratKetAhliWaris from "./pages/public/format/SuratKetAhliWaris";
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
            path=" /permintaan-tidak-mampu"
            element={
              <ProtectedRoute>
                <SDUsahaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permintaan-surat-domisili-umum"
            element={
              <ProtectedRoute>
                <SuratDomisiliUmum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permintaan-surat-tidak-mampu-pendidikan"
            element={
              <ProtectedRoute>
                <SuratTidakMampuPendidikan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permintaan-surat-ket-ktp"
            element={
              <ProtectedRoute>
                <PerSuratKetKTP />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arsip-ket-ktp"
            element={
              <ProtectedRoute>
                <ArsipKetKtp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arsip-ket-tidak-mampu-pendidikan"
            element={
              <ProtectedRoute>
                <ArsipKetTidakMampuPendidikan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arsip-ket-domisili-umum"
            element={
              <ProtectedRoute>
                <ArsipKetDomisiliUmum />
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
          {/* Format surat kete domisili */}
          <Route
            path="/surat-ket-domisili-umum"
            element={<SuratKetDomisili />}
          />
          <Route
            path="/persyaratan-surat-ket-domisili-umum/:hashed_id"
            element={<PersyaratanSuratKetDomisili />}
          />
          <Route
            path="/confir-data-domisili-umum/:hashed_id"
            element={<ConfirmasiDataSDUsaha />}
          />
          <Route
            path="/edit-domisili-umum/:hashed_id"
            element={<EditSDUsaha />}
          />
          <Route
            path="/format-surat-domisili-umum/:id"
            element={<LatterSDUsaha />}
          />
          <Route
            path="/bukti-surat-domisili-umum/:hashed_id"
            element={<BuktiSuratDomisili />}
          />
          {/* End Format surat kete domisili */}
          {/* Surat Tidak Mampu Strat*/}
          <Route
            path="/persyaratan-surat-tidak-mampu/:hashed_id"
            element={<PersyaratanSuratTidakMampuPendidikan />}
          />
          <Route
            path="/bukti-surat-tidak-mampu/:hashed_id"
            element={<BuktiSuratTidakMampuPendidikan />}
          />
          {/* <Route
            path="/confir-data-tidak-mampu/:hashed_id"
            element={<ConfirmasiDataTidakMampu />}
          /> */}
          {/* <Route
            path="/detail-surat-tidak-mampu/:id"
            element={<DesailSuratTidakMampu />}
          /> */}
          {/* <Route
            path="/surat-tidak-mampu-arsip"
            element={<SuratTidakMampuArsip />}
          /> */}
          {/* <Route
            path="/format-surat-tidak-mampu/:id"
            element={<FormatSuratTidakMampu />}
          />
          <Route path="/surat-tidak-mampu-pendidikan" />
          <Route
            path="/permintaan-surat-tidak-mampu"
            element={<SuratTidakMampuPermintaan />}
          /> */}
          <Route path="/tidak-mampu-pendidikan" element={<SuratTidakMampu />} />
          {/* Surat Tidak Mampu end*/}
          {/* Surat Ket Ktp start */}
          <Route path="/surat-ket-ktp" element={<SuratKetKtp />} />
          <Route
            path="/persyaratan-surat-ket-ktp/:hashed_id"
            element={<PersyaratanKetKtp />}
          />
          <Route
            path="/bukti-ket-ktp/:hashed_id"
            element={<BuktiSuratKetKTP />}
          />
          {/* <Route
            path="/confir-data-tidak-mampu/:hashed_id"
            element={<ConfirmasiDataTidakMampu />}
          /> */}
          {/* <Route
            path="/detail-surat-tidak-mampu/:id"
            element={<DesailSuratTidakMampu />}
          /> */}
          {/* <Route
            path="/surat-tidak-mampu-arsip"
            element={<SuratTidakMampuArsip />}
          /> */}
          {/* <Route
            path="/format-surat-tidak-mampu/:id"
            element={<FormatSuratTidakMampu />}
          />
          <Route path="/surat-tidak-mampu-pendidikan" />
          <Route
            path="/permintaan-surat-tidak-mampu"
            element={<SuratTidakMampuPermintaan />}
          /> */}
          {/* Surat Ket Ktp end */}
          {/* Surat ket kk start */}
          <Route path="/surat-ket-kk" element={<SuratKetKk />} />
          <Route
            path="/persyaratan-surat-ket-kk/:hashed_id"
            element={<PersyaratanKetKk />}
          />
          <Route path="/bukti-ket-kk/:hashed_id" element={<BuktiKetKk />} />
          {/* <Route
            path="/confir-data-tidak-mampu/:hashed_id"
            element={<ConfirmasiDataTidakMampu />}
          /> */}
          {/* <Route
            path="/detail-surat-tidak-mampu/:id"
            element={<DesailSuratTidakMampu />}
          /> */}
          {/* <Route
            path="/surat-tidak-mampu-arsip"
            element={<SuratTidakMampuArsip />}
          /> */}
          {/* <Route
            path="/format-surat-tidak-mampu/:id"
            element={<FormatSuratTidakMampu />}
          />
          <Route path="/surat-tidak-mampu-pendidikan" />
          <Route
            path="/permintaan-surat-tidak-mampu"
            element={<SuratTidakMampuPermintaan />}
          /> */}
          {/* Surat ket kk end */}
          {/* Surat Ket Ahli Waris */}
          <Route path="/surat-ket-ahli-waris" element={<SuratKetAhliWaris />} />
          <Route
            path="/persyaratan-surat-ket-kk/:hashed_id"
            element={<PersyaratanKetKk />}
          />
          <Route path="/bukti-ket-kk/:hashed_id" element={<BuktiKetKk />} />
          {/* <Route
            path="/confir-data-tidak-mampu/:hashed_id"
            element={<ConfirmasiDataTidakMampu />}
            /> */}
          {/* <Route
            path="/detail-surat-tidak-mampu/:id"
            element={<DesailSuratTidakMampu />}
            /> */}
          {/* <Route
            path="/surat-tidak-mampu-arsip"
            element={<SuratTidakMampuArsip />}
            /> */}
          {/* <Route
            path="/format-surat-tidak-mampu/:id"
            element={<FormatSuratTidakMampu />}
            />
            <Route path="/surat-tidak-mampu-pendidikan" />
            <Route
            path="/permintaan-surat-tidak-mampu"
            element={<SuratTidakMampuPermintaan />}
            /> */}
          {/* Surat ket kk end */}

          {/* Surat Ket Ahli End */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
