import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../../../css/public/latters/SuratTidakMampu.css";
import Navbar from "../../../components/public/Navbar";

function SuratKetKk() {
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [status_perkawinan, setStatausPerkawinan] = useState("");
  const [ttl, setTtl] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rtRw, setRtRw] = useState("");

  const [ktpImage, setKtpImage] = useState("");
  const [ktpImagePreview, setKtpImagePreview] = useState(""); // State untuk preview gambar
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:3040", {
      transports: ["websocket", "polling"],
    });

    socket.on("newFormNotification", (formData) => {
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setKtpImage(imageFile);

    // Membuat URL object untuk gambar preview
    if (imageFile) {
      const imagePreviewUrl = URL.createObjectURL(imageFile);
      setKtpImagePreview(imagePreviewUrl);
    }
  };

  const handleShowNotification = () => setShowNotification(true);

  const handleCloseNotification = () => setShowNotification(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !nama ||
        !jenisKelamin ||
        !status_perkawinan ||
        !ttl ||
        !pekerjaan ||
        !agama ||
        !alamat ||
        !rtRw ||
        !ktpImage
      ) {
        alert("Data tidak boleh kosong");
        return;
      }

      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("jenis_kelamin", jenisKelamin);
      formData.append("status_perkawinan", status_perkawinan);
      formData.append("ttl", ttl);
      formData.append("pekerjaan", pekerjaan);
      formData.append("agama", agama);
      formData.append("alamat", alamat);
      formData.append("rt_rw", rtRw);

      formData.append("ktp_image", ktpImage);

      const response = await axios.post(
        "https://website.fahri.life/api/buat-surat-ket-kk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data added successfully:", response.data);

      if (response.data.newId) {
        const newId = response.data.newId;
        alert(
          "Surat keterangan KTP berhasil dibuat. Menunggu persetujuan admin."
        );
        handleShowNotification();

        setNama("");
        setJenisKelamin("");
        setStatausPerkawinan("");
        setTtl("");
        setPekerjaan("");
        setAgama("");
        setAlamat("");
        setRtRw("");

        setKtpImage("");
        setKtpImagePreview(""); // Reset gambar preview

        navigate(`/persyaratan-surat-ket-kk/${newId}`);
      } else {
        alert("Terjadi kesalahan dalam mendapatkan ID dari server.");
      }
    } catch (error) {
      console.error("Error adding data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 w-full">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="block">
            <div className="text-center mb-6 mt-16">
              <h5 className="text-blue-600 text-2xl font-bold">
                FORM SURAT KETERANGAN KK
              </h5>
            </div>
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="ttl"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tempat Tanggal Lahir</b>
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="ttl"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="jenis_kelamin"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Kelamin</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="jenis_kelamin"
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="agama"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Agama</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="agama"
                value={agama}
                onChange={(e) => setAgama(e.target.value)}
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="status_perkawinan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Status Perkawinan</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="status_perkawinan"
                value={status_perkawinan}
                onChange={(e) => setStatausPerkawinan(e.target.value)}
              >
                <option value="">Pilih Status Perkawinan</option>
                <option value="kawin">Kawin</option>
                <option value="belum kawin">Belum Kawin</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="pekerjaan"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Pekerjaan</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="pekerjaan"
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat"
                rows="3"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="rt_rw"
                className="block text-sm font-medium text-gray-700"
              >
                <b>RT/RW</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="rt_rw"
                value={rtRw}
                onChange={(e) => setRtRw(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="ktpImage"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Upload KTP</b>
              </label>
              <input
                type="file"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="ktpImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              {ktpImagePreview && ( // Tampilkan gambar preview jika ada
                <img
                  src={ktpImagePreview}
                  alt="Preview KTP"
                  className="mt-2 rounded-md"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-bold">Notifikasi</h5>
              <button
                onClick={handleCloseNotification}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="fa fa-times"></span>
              </button>
            </div>
            <div>
              Surat keterangan KTP berhasil dibuat. Menunggu persetujuan admin.
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseNotification}
                className="bg-gray-500 text-white rounded-md py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuratKetKk;
