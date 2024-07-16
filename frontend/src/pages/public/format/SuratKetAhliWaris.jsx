import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../../../css/public/latters/SuratTidakMampu.css";
import Navbar from "../../../components/public/Navbar";

function SuratKetAhliWaris() {
  const [namaPemberi, setNamaPemberi] = useState("");
  const [jenisKelaminPemberi, setJenisKelaminPemberi] = useState("");
  const [tempatLahirPemberi, setTempatLahirPemberi] = useState("");
  const [tanggalLahirPemberi, setTanggalLahirPemberi] = useState("");
  const [pekerjaanPemberi, setPekerjaanPemberi] = useState("");
  const [agamaPemberi, setAgamaPemberi] = useState("");
  const [alamatPemberi, setAlamatPemberi] = useState("");

  const [namaPenerima, setNamaPenerima] = useState("");
  const [jenisKelaminPenerima, setJenisKelaminPenerima] = useState("");
  const [tempatLahirPenerima, setTempatLahirPenerima] = useState("");
  const [tanggalLahirPenerima, setTanggalLahirPenerima] = useState("");
  const [pekerjaanPenerima, setPekerjaanPenerima] = useState("");
  const [agamaPenerima, setAgamaPenerima] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");

  const [ktpImage, setKtpImage] = useState("");
  const [ktpImagePreview, setKtpImagePreview] = useState("");
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
        !namaPemberi ||
        !jenisKelaminPemberi ||
        !tempatLahirPemberi ||
        !tanggalLahirPemberi ||
        !pekerjaanPemberi ||
        !agamaPemberi ||
        !alamatPemberi ||
        !namaPenerima ||
        !jenisKelaminPenerima ||
        !tempatLahirPenerima ||
        !tanggalLahirPenerima ||
        !pekerjaanPenerima ||
        !agamaPenerima ||
        !alamatPenerima ||
        !ktpImage
      ) {
        alert("Data tidak boleh kosong");
        return;
      }

      const formData = new FormData();
      formData.append("nama_pemberi", namaPemberi);
      formData.append("jenis_kelamin_pemberi", jenisKelaminPemberi);
      formData.append("tempat_lahir_pemberi", tempatLahirPemberi);
      formData.append("tanggal_lahir_pemberi", tanggalLahirPemberi);
      formData.append("pekerjaan_pemberi", pekerjaanPemberi);
      formData.append("agama_pemberi", agamaPemberi);
      formData.append("alamat_pemberi", alamatPemberi);
      formData.append("nama_penerima", namaPenerima);
      formData.append("jenis_kelamin_penerima", jenisKelaminPenerima);
      formData.append("tempat_lahir_penerima", tempatLahirPenerima);
      formData.append("tanggal_lahir_penerima", tanggalLahirPenerima);
      formData.append("pekerjaan_penerima", pekerjaanPenerima);
      formData.append("agama_penerima", agamaPenerima);
      formData.append("alamat_penerima", alamatPenerima);
      formData.append("ktp_image", ktpImage);

      const response = await axios.post(
        "https://website.fahri.life/api/buat-surat-ahli-waris",
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
          "Surat keterangan ahli waris berhasil dibuat. Menunggu persetujuan admin."
        );
        handleShowNotification();

        setNamaPemberi("");
        setJenisKelaminPemberi("");
        setTempatLahirPemberi("");
        setTanggalLahirPemberi("");
        setPekerjaanPemberi("");
        setAgamaPemberi("");
        setAlamatPemberi("");
        setNamaPenerima("");
        setJenisKelaminPenerima("");
        setTempatLahirPenerima("");
        setTanggalLahirPenerima("");
        setPekerjaanPenerima("");
        setAgamaPenerima("");
        setAlamatPenerima("");

        setKtpImage("");
        setKtpImagePreview("");

        navigate(`/persyaratan-surat-ahli-waris/${newId}`);
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
                FORM SURAT KETERANGAN AHLI WARIS
              </h5>
            </div>
            <div className="mb-4">
              <label
                htmlFor="nama_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Pemberi</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama_pemberi"
                value={namaPemberi}
                onChange={(e) => setNamaPemberi(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="jenis_kelamin_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Kelamin Pemberi</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="jenis_kelamin_pemberi"
                value={jenisKelaminPemberi}
                onChange={(e) => setJenisKelaminPemberi(e.target.value)}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="tempat_lahir_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tempat Lahir Pemberi</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tempat_lahir_pemberi"
                value={tempatLahirPemberi}
                onChange={(e) => setTempatLahirPemberi(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tanggal_lahir_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tanggal Lahir Pemberi</b>
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tanggal_lahir_pemberi"
                value={tanggalLahirPemberi}
                onChange={(e) => setTanggalLahirPemberi(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pekerjaan_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Pekerjaan Pemberi</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="pekerjaan_pemberi"
                value={pekerjaanPemberi}
                onChange={(e) => setPekerjaanPemberi(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="agama_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Agama Pemberi</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="agama_pemberi"
                value={agamaPemberi}
                onChange={(e) => setAgamaPemberi(e.target.value)}
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat_pemberi"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Pemberi</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat_pemberi"
                rows="3"
                value={alamatPemberi}
                onChange={(e) => setAlamatPemberi(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="nama_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Nama Penerima</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="nama_penerima"
                value={namaPenerima}
                onChange={(e) => setNamaPenerima(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="jenis_kelamin_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Jenis Kelamin Penerima</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="jenis_kelamin_penerima"
                value={jenisKelaminPenerima}
                onChange={(e) => setJenisKelaminPenerima(e.target.value)}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="tempat_lahir_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tempat Lahir Penerima</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tempat_lahir_penerima"
                value={tempatLahirPenerima}
                onChange={(e) => setTempatLahirPenerima(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tanggal_lahir_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Tanggal Lahir Penerima</b>
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="tanggal_lahir_penerima"
                value={tanggalLahirPenerima}
                onChange={(e) => setTanggalLahirPenerima(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pekerjaan_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Pekerjaan Penerima</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="pekerjaan_penerima"
                value={pekerjaanPenerima}
                onChange={(e) => setPekerjaanPenerima(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="agama_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Agama Penerima</b>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="agama_penerima"
                value={agamaPenerima}
                onChange={(e) => setAgamaPenerima(e.target.value)}
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="alamat_penerima"
                className="block text-sm font-medium text-gray-700"
              >
                <b>Alamat Penerima</b>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                id="alamat_penerima"
                rows="3"
                value={alamatPenerima}
                onChange={(e) => setAlamatPenerima(e.target.value)}
              ></textarea>
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
              {ktpImagePreview && (
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
              Surat keterangan ahli waris berhasil dibuat. Menunggu persetujuan
              admin.
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

export default SuratKetAhliWaris;
