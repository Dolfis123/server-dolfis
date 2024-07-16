import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { Link } from "react-router-dom";

function Pelayanan() {
  const [services, setServices] = useState([]);
  const [showServices, setShowServices] = useState(false);

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://website.fahri.life/api/pelayanan"
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div>
      <div className="container-fluid position-relative p-0">
        <Navbar />
      </div>
      <div className="container py-5">
        <br />
        <br />

        <div className="carousel-caption-content p-3">
          <br />
          <br />
          <div className="flex justify-center">
            <button
              className="btn bg-primary text-white mb-4 py-2 px-2"
              onClick={toggleServices}
            >
              <span className="me-1" style={{ fontSize: "15px" }}>
                🚀
              </span>
              {showServices
                ? "Sembunyikan Layanan"
                : "layanan Online Yang Tersedia, Klik Disini."}
              <span className="ms-2">{showServices ? "▲" : "▼"}</span>
            </button>
          </div>
          {showServices && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <Link
                to="/surat-ket-domisili-usaha"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket Domisili Usaha
              </Link>
              <Link
                to="/surat-ket-domisili-umum"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket Domisili
              </Link>
              <Link
                to="/surat-ket-tidak-berdomisili"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket Tidak Berdomisli
              </Link>
              <Link
                to="/tidak-mampu-pendidikan"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket Tidak Mampu Untuk Pendidikan
              </Link>
              <Link
                to="/surat-ket-beasiswa-unipa"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket Beasiswa Untuk Unipa
              </Link>
              <Link
                to="/surat-ket-ktp"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket KTP
              </Link>
              <Link
                to="/surat-ket-kk"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket KK
              </Link>

              <Link
                to="/surat-ket-ahli-waris"
                className="btn bg-primary text-white py-2 px-4 rounded"
              >
                Surat Ket Ahli Waris
              </Link>
            </div>
          )}
        </div>
        <br />
        <br />

        <h2 className="text-xl font-bold text-blue-600 mb-4">Layanan</h2>
        <h3 className="text-2xl font-bold mb-4">
          Persyaratan Pelayanan Publik di Kelurahan Amban
        </h3>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div key={index} className="mb-6">
                <h4
                  className="text-lg font-semibold mb-4"
                  dangerouslySetInnerHTML={createMarkup(service.pelayanan)}
                ></h4>
                <ul className="list-disc list-inside mb-4">
                  {Array.isArray(service.persyaratan) ? (
                    service.persyaratan.map((requirement, reqIndex) => (
                      <li
                        key={reqIndex}
                        dangerouslySetInnerHTML={createMarkup(requirement)}
                      ></li>
                    ))
                  ) : (
                    <li>Tidak ada persyaratan</li>
                  )}
                </ul>
                <p className="text-lg mb-4">Waktu: {service.waktu}</p>
                <p className="text-lg mb-4">Biaya: {service.biaya}</p>
              </div>
            ))
          ) : (
            <p className="text-lg mb-4">Tidak ada layanan yang tersedia.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pelayanan;
